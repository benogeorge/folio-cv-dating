import { Profile } from "./types";

export function calculateFolioScore(profile: Partial<Profile>): number {
  let score = 0;
  if (profile.cv_url) score += 30; // CV uploaded
  if (profile.cv_text && profile.cv_text.length > 100) score += 10; // CV parsed
  if (profile.skill_tags && profile.skill_tags.length >= 3) score += 15;
  if (profile.prompts && (profile.prompts as unknown[]).length >= 3) score += 25;
  if (profile.voice_note_url) score += 15; // voice note
  if (profile.city && profile.city.trim().length > 0) score += 5;
  return Math.min(score, 100);
}
