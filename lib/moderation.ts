const BLOCKED_WORDS = [
  "nigger", "nigga", "faggot", "kike", "spic", "chink", "cunt",
  "kill yourself", "kys", "die bitch", "whore", "rape"
];

export function checkContentModeration(text: string): { isSafe: boolean; reason?: string } {
  const lower = text.toLowerCase();

  for (const word of BLOCKED_WORDS) {
    if (lower.includes(word)) {
      return {
        isSafe: false,
        reason: "Message contains prohibited or abusive language.",
      };
    }
  }

  return { isSafe: true };
}
