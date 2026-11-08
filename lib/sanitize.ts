export function sanitizeText(input: unknown, maxLength: number = 2000): string {
  if (typeof input !== "string") return "";
  
  // Remove control characters (except newline and tab)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Strip HTML tags
  clean = clean.replace(/<[^>]*>?/gm, "");

  // Escape dangerous quote sequences
  clean = clean.replace(/--/g, "—"); // avoid SQL comment sequence in raw contexts

  // Trim and cap length
  clean = clean.trim().slice(0, maxLength);

  return clean;
}

export function sanitizePlainTextOnly(input: string, maxLength: number = 1000): string {
  let text = sanitizeText(input, maxLength);
  // Strip URLs from anonymous chat to protect anonymity and safety before unlocks
  text = text.replace(/https?:\/\/[^\s]+/gi, "[link hidden]");
  return text;
}


const BLOCKED_WORDS = ['spam', 'scam', 'malware', 'exploit', 'phishing', 'wire transfer'];

export function containsBlockedContent(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((word) => lower.includes(word));
}
