export type IntentType = "dating" | "friends" | "collab" | "mentor";

export interface PromptItem {
  question: string;
  answer: string;
}

export interface Profile {
  id: string;
  codename: string;
  first_name?: string | null;
  city?: string | null;
  intent: IntentType[];
  cv_url?: string | null;
  cv_text?: string | null;
  skill_tags: string[];
  prompts: PromptItem[];
  voice_note_url?: string | null;
  folio_score: number;
  is_active: boolean;
  age?: number | null;
  gender?: string | null;
  languages?: string[];
  country?: string | null;
  region?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  preferred_age_min?: number | null;
  preferred_age_max?: number | null;
  preferred_genders?: string[];
  max_distance_km?: number | null;
  industry?: string | null;
  education_level?: string | null;
  interests?: string[];
  created_at?: string;
}

export interface DailyMatch {
  id: string;
  user_id: string;
  matched_user_id: string;
  match_date: string;
  expires_at: string;
  user_decision: "continue" | "pass" | null;
  matched_user_decision: "continue" | "pass" | null;
  status: "pending" | "spark" | "passed" | "expired";
  match_reasons?: string[];
  created_at?: string;
  // Populated relation
  matched_profile?: Profile;
}

export interface Thread {
  id: string;
  user_a: string;
  user_b: string;
  day_count: number;
  streak: number;
  status: "active" | "permanent" | "ended";
  user_a_confirmed: boolean;
  user_b_confirmed: boolean;
  last_confirmed_date: string | null;
  created_at: string;
  // Populated partner
  partner_profile?: Profile;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_codename?: string;
}

export interface Reveal {
  id: string;
  thread_id: string;
  day: number;
  reveal_type: "first_name" | "photo" | "full_cv" | "social_hint" | "full_name";
  unlocked_at: string;
}
