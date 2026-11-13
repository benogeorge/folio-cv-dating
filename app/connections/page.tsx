import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Users, MessageSquare, Globe, Sparkles, Shield, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Connection Hub: Online Chat, Dating & Language Communities | CV Dating',
  description: 'Explore niche communities, language exchanges, and relationship paths on CV Dating. Meet adults for dating, friendship, language practice, and meaningful connections.',
  alternates: { canonical: 'https://cvdating.app/connections' },
  openGraph: {
    title: 'Connection Communities & Guides — CV Dating',
    description: 'Find your niche: language exchange, no-swipe dating, anime & K-pop communities, international chat, and adult friendship.',
    url: 'https://cvdating.app/connections',
    type: 'website',
  },
}

const categories = [
  {
    name: 'High-Demand Chat & Dating',
    description: 'Goal-based introductions without the swipe fatigue.',
    links: [
      { slug: 'dating-without-swiping', label: 'Dating Without Swiping' },
      { slug: 'cv-based-dating', label: 'CV-Based Dating' },
      { slug: 'hellotalk-alternative', label: 'HelloTalk Alternative' },
      { slug: 'meet-girls-online', label: 'Meet Girls Online' },
      { slug: 'meet-women-online', label: 'Meet Women Online' },
      { slug: 'online-chat-for-adults', label: 'Online Chat for Adults' },
      { slug: 'slow-dating-app', label: 'Slow Dating App' },
      { slug: 'serious-dating-app', label: 'Serious Dating App' },
      { slug: 'dating-for-professionals', label: 'Dating for Professionals' },
      { slug: 'free-online-chat', label: 'Free Online Chat' },
      { slug: 'meet-people-online-free', label: 'Meet People Online Free' },
      { slug: 'chat-with-strangers', label: 'Chat With Strangers (Safely)' },
    ],
  },
  {
    name: 'Friendship & Communities',
    description: 'Find your tribe through shared passions and subcultures.',
    links: [
      { slug: 'make-friends-online', label: 'Make Friends Online' },
      { slug: 'kpop-fans-online', label: 'Meet K-pop Fans Online' },
      { slug: 'anime-manga-fans-online', label: 'Meet Anime & Manga Fans' },
      { slug: 'goth-alternative-community', label: 'Goth & Alternative Community' },
      { slug: 'gaming-friends-online', label: 'Gaming Friends Online' },
      { slug: 'long-term-relationships', label: 'Long-Term Relationships' },
      { slug: 'career-connections', label: 'Career Connections & Mentorship' },
      { slug: 'anonymous-online-chat', label: 'Private Coded Online Chat' },
      { slug: 'safe-online-dating', label: 'Safer Online Dating' },
      { slug: 'international-dating', label: 'International Dating' },
      { slug: 'dating-app-uk', label: 'Dating App UK' },
      { slug: 'dating-app-usa', label: 'Dating App USA' },
    ],
  },
  {
    name: 'Language Exchange Partners',
    description: 'Practise languages 1-on-1 with native speakers and passionate learners.',
    links: [
      { slug: 'language-exchange', label: 'Language Exchange Hub' },
      { slug: 'english-language-exchange', label: 'English Language Exchange' },
      { slug: 'spanish-language-exchange', label: 'Spanish Language Exchange' },
      { slug: 'french-language-exchange', label: 'French Language Exchange' },
      { slug: 'german-language-exchange', label: 'German Language Exchange' },
      { slug: 'italian-language-exchange', label: 'Italian Language Exchange' },
      { slug: 'japanese-language-exchange', label: 'Japanese Language Exchange' },
      { slug: 'korean-language-exchange', label: 'Korean Language Exchange' },
      { slug: 'mandarin-chinese-language-exchange', label: 'Mandarin Chinese Exchange' },
      { slug: 'portuguese-language-exchange', label: 'Portuguese Language Exchange' },
      { slug: 'arabic-language-exchange', label: 'Arabic Language Exchange' },
      { slug: 'hindi-language-exchange', label: 'Hindi Language Exchange' },
      { slug: 'turkish-language-exchange', label: 'Turkish Language Exchange' },
      { slug: 'dutch-language-exchange', label: 'Dutch Language Exchange' },
      { slug: 'polish-language-exchange', label: 'Polish Language Exchange' },
      { slug: 'russian-language-exchange', label: 'Russian Language Exchange' },
      { slug: 'swedish-language-exchange', label: 'Swedish Language Exchange' },
    ],
  },
]

export default function ConnectionsIndexPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">
          CV Dating<span className="text-[#53745c]">.</span>
        </Link>
        <Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium transition hover:border-[#53745c]">
          Join free
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#53745c]">Connection Hub</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#1f231d]">
          Find people who share your world.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#64685f]">
          Whether you want language exchange, no-swipe dating, fan communities, or adult friendship — start with an introduction built around what you care about.
        </p>

        <div className="mt-14 space-y-14">
          {categories.map((cat) => (
            <div key={cat.name} className="rounded-3xl border border-[#e5e3dc] bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-[#252923]">{cat.name}</h2>
              <p className="mt-2 text-sm text-[#777b72]">{cat.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {cat.links.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/connections/${link.slug}`}
                    className="flex items-center justify-between rounded-xl bg-[#f7f5f1] px-4 py-3 text-sm font-medium text-[#345b40] transition hover:bg-[#e8ede5] hover:text-[#1f231d]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-3xl bg-[#345b40] p-8 sm:p-12 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Join CV Dating Free</h2>
            <p className="mt-2 text-sm text-[#d8e5d9]">Up to four daily introductions. A full 24-hour conversation.</p>
          </div>
          <Link
            href="/auth"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]"
          >
            Get started now →
          </Link>
        </section>
      </section>
    </main>
  )
}
