import { MetadataRoute } from 'next'

export const revalidate = 86400

const BASE = 'https://cvdating.app'

const connectionSlugs = [
  'dating-without-swiping',
  'cv-based-dating',
  'make-friends-online',
  'language-exchange',
  'long-term-relationships',
  'anonymous-online-chat',
  'career-connections',
  'online-chat-for-adults',
  'meet-new-people-online',
  'international-dating',
  'safe-online-dating',
  'kpop-fans-online',
  'anime-manga-fans-online',
  'goth-alternative-community',
  'gaming-friends-online',
  'hellotalk-alternative',
  'meet-girls-online',
  'meet-women-online',
  'chat-with-strangers',
  'slow-dating-app',
  'serious-dating-app',
  'dating-app-uk',
  'dating-app-usa',
  'dating-for-professionals',
  'free-online-chat',
  'meet-people-online-free',
  'english-language-exchange',
  'spanish-language-exchange',
  'french-language-exchange',
  'german-language-exchange',
  'italian-language-exchange',
  'portuguese-language-exchange',
  'arabic-language-exchange',
  'hindi-language-exchange',
  'japanese-language-exchange',
  'korean-language-exchange',
  'mandarin-chinese-language-exchange',
  'turkish-language-exchange',
  'dutch-language-exchange',
  'polish-language-exchange',
  'russian-language-exchange',
  'swedish-language-exchange',
]

const guideSlugs = [
  'how-to-start-a-conversation-online',
  'online-dating-without-swiping',
  'make-friends-in-a-new-city',
  'safe-private-online-chat',
  'hellotalk-vs-cv-dating',
  'best-apps-to-meet-people-online',
  'how-to-make-online-friends-as-an-adult',
  'why-swiping-doesnt-work',
  'language-exchange-tips',
  'online-dating-safety-tips',
  'how-to-write-a-dating-profile',
  'conversation-starters-for-dating-apps',
  'long-distance-relationship-tips',
  'how-to-meet-people-in-a-new-country',
  'anime-dating-tips',
  'kpop-fan-community-online',
  'alternative-dating-apps-to-tinder',
  'free-chat-apps-for-making-friends',
  'best-language-exchange-apps-2025',
  'how-cv-dating-works',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/daily-conversation-prompt`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...connectionSlugs.map((slug) => ({
      url: `${BASE}/connections/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...guideSlugs.map((slug) => ({
      url: `${BASE}/guides/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
  ]
}
