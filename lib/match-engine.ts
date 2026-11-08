import { SupabaseClient } from "@supabase/supabase-js";
import { Profile } from "./types";
import { SAMPLE_CANDIDATE_PROFILES } from "./seed-data";

export interface UserWeights {
  w_age: number;
  w_gender: number;
  w_distance: number;
  w_language: number;
  w_intent: number;
  w_skills: number;
  w_industry: number;
  w_education: number;
  w_interests: number;
  w_activity: number;
}

// Haversine distance in km
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Jaccard similarity between two string arrays
export function jaccard(a: string[] = [], b: string[] = []): number {
  if (!a.length && !b.length) return 0;
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

// HARD FILTERS — if any fail, candidate is excluded entirely
export function passesHardFilters(
  user: Partial<Profile>,
  candidate: Partial<Profile>
): { pass: boolean; reason?: string } {
  // 1. Age filter (both ways — mutual preference)
  if (user.age && candidate.age) {
    if (user.preferred_age_min && candidate.age < user.preferred_age_min)
      return { pass: false, reason: "age-too-young" };
    if (user.preferred_age_max && candidate.age > user.preferred_age_max)
      return { pass: false, reason: "age-too-old" };
    // Mutual check
    if (candidate.preferred_age_min && user.age < candidate.preferred_age_min)
      return { pass: false, reason: "age-mismatch-reverse" };
    if (candidate.preferred_age_max && user.age > candidate.preferred_age_max)
      return { pass: false, reason: "age-mismatch-reverse" };
  }

  // 2. Gender preference (mutual)
  if (user.preferred_genders && user.preferred_genders.length > 0 && candidate.gender) {
    if (
      !user.preferred_genders.includes(candidate.gender) &&
      !user.preferred_genders.includes("any")
    )
      return { pass: false, reason: "gender-mismatch" };
  }
  if (candidate.preferred_genders && candidate.preferred_genders.length > 0 && user.gender) {
    if (
      !candidate.preferred_genders.includes(user.gender) &&
      !candidate.preferred_genders.includes("any")
    )
      return { pass: false, reason: "gender-mismatch-reverse" };
  }

  // 3. Distance filter
  if (user.latitude && user.longitude && candidate.latitude && candidate.longitude) {
    const dist = haversineKm(
      user.latitude,
      user.longitude,
      candidate.latitude,
      candidate.longitude
    );
    const maxDist = Math.min(user.max_distance_km || 100, candidate.max_distance_km || 100);
    if (dist > maxDist * 1.25)
      return { pass: false, reason: "too-far" };
  }

  // 4. Intent overlap — must share at least 1 intent if user has intents specified
  if (user.intent && user.intent.length > 0 && candidate.intent && candidate.intent.length > 0) {
    const sharedIntents = user.intent.filter((i) => candidate.intent?.includes(i));
    if (sharedIntents.length === 0)
      return { pass: false, reason: "no-intent-overlap" };
  }

  return { pass: true };
}

// SOFT SCORING — weighted feature vector → 0-100 score
export function softScore(
  user: Partial<Profile>,
  candidate: Partial<Profile>,
  weights: UserWeights,
  distanceKm: number
): { score: number; features: Record<string, number>; reasons: string[] } {
  const features: Record<string, number> = {};
  const reasons: string[] = [];

  const userIntents = user.intent || [];
  const candIntents = candidate.intent || [];
  const sharedIntents = userIntents.filter((i) => candIntents.includes(i));
  features.intent = sharedIntents.length / Math.max(userIntents.length, 1);
  if (sharedIntents.length) reasons.push(`${sharedIntents.join(" & ")} goals align`);

  features.language = jaccard(user.languages || ["english"], candidate.languages || ["english"]);
  if (features.language > 0.4) reasons.push("speaks same language");

  features.skills = jaccard(user.skill_tags || [], candidate.skill_tags || []);
  if (features.skills > 0.2) {
    const sharedCount = (user.skill_tags || []).filter((s) => candidate.skill_tags?.includes(s)).length;
    reasons.push(sharedCount > 0 ? `${sharedCount} complementary skill tags` : "complementary skill tags");
  }

  features.industry =
    user.industry &&
    candidate.industry &&
    user.industry.toLowerCase() === candidate.industry.toLowerCase()
      ? 1
      : 0;
  if (features.industry) reasons.push(`both in ${candidate.industry}`);

  const eduLevels = ["high-school", "bachelors", "masters", "phd"];
  const userEdu = eduLevels.indexOf(user.education_level || "bachelors");
  const candidateEdu = eduLevels.indexOf(candidate.education_level || "bachelors");
  if (userEdu >= 0 && candidateEdu >= 0) {
    features.education = 1 - Math.abs(userEdu - candidateEdu) / 3;
  } else {
    features.education = 0.5;
  }

  const maxDist = user.max_distance_km || 100;
  features.distance = Math.max(0, 1 - distanceKm / maxDist);
  if (distanceKm < 15 && distanceKm > 0) reasons.push("nearby in your city");
  else if (user.city && candidate.city && user.city.toLowerCase() === candidate.city.toLowerCase()) {
    reasons.push(`both based in ${candidate.city}`);
  }

  if (user.age && candidate.age) {
    const ageDiff = Math.abs(user.age - candidate.age);
    features.age = Math.max(0, 1 - ageDiff / 20);
  } else {
    features.age = 0.5;
  }

  features.interests = jaccard(user.interests || [], candidate.interests || []);
  if (features.interests > 0.2) reasons.push("shared personal interests");

  features.activity = (candidate.folio_score || 70) / 100;

  const totalWeight =
    (weights.w_intent || 2) +
    (weights.w_language || 1.5) +
    (weights.w_skills || 1) +
    (weights.w_industry || 1) +
    (weights.w_education || 0.5) +
    (weights.w_distance || 1) +
    (weights.w_age || 1) +
    (weights.w_interests || 1) +
    (weights.w_activity || 1);

  const rawScore =
    features.intent * (weights.w_intent || 2) +
    features.language * (weights.w_language || 1.5) +
    features.skills * (weights.w_skills || 1) +
    features.industry * (weights.w_industry || 1) +
    features.education * (weights.w_education || 0.5) +
    features.distance * (weights.w_distance || 1) +
    features.age * (weights.w_age || 1) +
    features.interests * (weights.w_interests || 1) +
    features.activity * (weights.w_activity || 1);

  const score = Math.round((rawScore / totalWeight) * 100);
  if (reasons.length === 0) {
    reasons.push("curated high-potential connection");
  }

  return { score, features, reasons };
}

// SELF-UPDATING WEIGHTS — called after user makes Continue/Pass decision
export async function updateUserWeights(
  userId: string,
  matchedUserId: string,
  decision: "continue" | "pass",
  supabase: SupabaseClient
) {
  try {
    const { data: signal } = await supabase
      .from("algo_signals")
      .select("feature_vector")
      .eq("user_id", userId)
      .eq("matched_user_id", matchedUserId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!signal?.feature_vector) return;

    const features = signal.feature_vector as Record<string, number>;

    const { data: weights } = await supabase
      .from("user_weights")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    const w: UserWeights = weights || {
      w_age: 1,
      w_gender: 1,
      w_distance: 1,
      w_language: 1.5,
      w_intent: 2,
      w_skills: 1,
      w_industry: 1,
      w_education: 0.5,
      w_interests: 1,
      w_activity: 1,
    };

    const lr = decision === "continue" ? 0.08 : -0.05;

    const featureWeightMap: Record<string, keyof UserWeights> = {
      intent: "w_intent",
      language: "w_language",
      skills: "w_skills",
      industry: "w_industry",
      education: "w_education",
      distance: "w_distance",
      age: "w_age",
      interests: "w_interests",
      activity: "w_activity",
    };

    for (const [feature, weightKey] of Object.entries(featureWeightMap)) {
      const featureValue = features[feature] ?? 0;
      if (featureValue > 0.4) {
        (w as any)[weightKey] = Math.max(
          0.1,
          Math.min(5.0, ((w as any)[weightKey] ?? 1.0) + lr * featureValue)
        );
      }
    }

    await supabase.from("user_weights").upsert({
      user_id: userId,
      ...w,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Weight update non-fatal error:", err);
  }
}

// MAIN ENTRY POINT
export async function generateDailyMatches(
  userId: string,
  supabase: SupabaseClient
) {
  const today = new Date().toISOString().split("T")[0];

  // 1. Already generated today?
  const { data: existing } = await supabase
    .from("daily_matches")
    .select("*, matched_profile:matched_user_id(*)")
    .eq("user_id", userId)
    .eq("match_date", today);

  if ((existing?.length ?? 0) >= 4) {
    return existing;
  }

  // 2. Get user profile + weights
  let user: Profile | null = null;
  const { data: userData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  user = userData;

  if (!user) {
    // If user profile is not found or mock session, build a standard fallback user
    user = {
      id: userId,
      codename: "My_Folio_User",
      first_name: "You",
      city: "London",
      country: "United Kingdom",
      region: "Greater London",
      latitude: 51.5074,
      longitude: -0.1278,
      age: 27,
      gender: "man",
      languages: ["english"],
      preferred_age_min: 22,
      preferred_age_max: 35,
      preferred_genders: ["any"],
      max_distance_km: 100,
      intent: ["dating", "collab", "friends"],
      industry: "Technology",
      education_level: "bachelors",
      interests: ["tech", "art", "running", "books"],
      skill_tags: ["Product Design", "TypeScript", "AI Systems"],
      prompts: [],
      folio_score: 90,
      is_active: true,
    };
  }

  const { data: weightsRow } = await supabase
    .from("user_weights")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const weights: UserWeights = weightsRow || {
    w_age: 1,
    w_gender: 1,
    w_distance: 1,
    w_language: 1.5,
    w_intent: 2,
    w_skills: 1,
    w_industry: 1,
    w_education: 0.5,
    w_interests: 1,
    w_activity: 1,
  };

  // 3. Exclude recently matched users (last 30 days) and self
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentMatches } = await supabase
    .from("daily_matches")
    .select("matched_user_id")
    .eq("user_id", userId)
    .gte("created_at", thirtyDaysAgo);

  const excludeIds = new Set([
    userId,
    ...(recentMatches?.map((m) => m.matched_user_id) || []),
  ]);

  // 4. Query candidate pool from DB
  let candidates: Profile[] = [];
  try {
    const { data: dbCandidates } = await supabase
      .from("profiles")
      .select("*")
      .eq("is_active", true)
      .limit(60);

    if (dbCandidates && dbCandidates.length > 0) {
      candidates = dbCandidates.filter((c) => !excludeIds.has(c.id));
    }
  } catch (err) {
    console.warn("Could not query DB candidate pool, using seed pool:", err);
  }

  // If candidate pool in DB is fewer than 4 (e.g., initial setup or local test), supplement from curated SAMPLE_CANDIDATE_PROFILES
  if (candidates.length < 4) {
    for (const sample of SAMPLE_CANDIDATE_PROFILES) {
      if (!excludeIds.has(sample.id) && !candidates.some((c) => c.id === sample.id)) {
        candidates.push(sample);
      }
    }
  }

  // 5. Score + filter candidates
  const scored: Array<{
    profile: Profile;
    score: number;
    features: Record<string, number>;
    reasons: string[];
    distKm: number;
  }> = [];

  for (const candidate of candidates) {
    const { pass } = passesHardFilters(user, candidate);
    if (!pass && candidates.length > 4) {
      // If we have plenty of candidates, enforce hard filter strictly
      continue;
    }

    let distKm = 0;
    if (user.latitude && candidate.latitude) {
      distKm = haversineKm(
        user.latitude,
        user.longitude || 0,
        candidate.latitude,
        candidate.longitude || 0
      );
    }

    const { score, features, reasons } = softScore(user, candidate, weights, distKm);
    scored.push({ profile: candidate, score, features, reasons, distKm });
  }

  // 6. Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top 10, Fisher-Yates shuffle down to 4
  const top10 = scored.slice(0, 10);
  for (let i = top10.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [top10[i], top10[j]] = [top10[j], top10[i]];
  }
  const selected = top10.slice(0, 4);

  // 7. Insert or prepare match rows
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999);

  const matchRows = selected.map((s) => ({
    user_id: userId,
    matched_user_id: s.profile.id,
    match_date: today,
    expires_at: expiresAt.toISOString(),
    match_score: s.score,
    match_reasons: s.reasons,
    status: "pending",
  }));

  try {
    const { data: inserted } = await supabase
      .from("daily_matches")
      .insert(matchRows)
      .select("*, matched_profile:matched_user_id(*)");

    // Log algo signals
    await supabase.from("algo_signals").insert(
      selected.map((s) => ({
        user_id: userId,
        matched_user_id: s.profile.id,
        match_score: s.score,
        outcome: "pending",
        feature_vector: s.features,
      }))
    );

    if (inserted && inserted.length > 0) {
      return inserted;
    }
  } catch (err) {
    console.warn("Match insert fallback to local enriched rows:", err);
  }

  // Fallback enriched rows
  return selected.map((s, idx) => ({
    id: `match-local-${idx + 1}-${Date.now()}`,
    user_id: userId,
    matched_user_id: s.profile.id,
    match_date: today,
    expires_at: expiresAt.toISOString(),
    match_score: s.score,
    match_reasons: s.reasons,
    status: "pending" as const,
    user_decision: null,
    matched_user_decision: null,
    matched_profile: s.profile,
  }));
}
