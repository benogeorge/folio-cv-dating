import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, Globe, Users, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guides & Advice: Dating, Friendship & Language Exchange | CV Dating',
  description: 'Expert guides on online dating without swiping, meeting people as an adult, language exchange tips, conversation starters, and safer online chat.',
  alternates: { canonical: 'https://cvdating.app/guides' },
  openGraph: {
    title: 'CV Dating Guides — Dating, Friendship & Language Exchange',
    description: 'Expert guides on no-swipe dating, conversation openers, language practice, and adult friendships.',
    url: 'https://cvdating.app/guides',
    type: 'website',
  },
}

const guidesList = [
  { slug: 'how-to-start-a-conversation-online', title: 'How to Start a Conversation Online (That Actually Gets a Reply)', category: 'Chat & Openers', readTime: '4 min' },
  { slug: 'online-dating-without-swiping', title: 'Online Dating Without Swiping: Why It Works Better', category: 'Dating Advice', readTime: '5 min' },
  { slug: 'hellotalk-vs-cv-dating', title: 'HelloTalk vs CV Dating: Which Is Right For You?', category: 'Comparisons', readTime: '5 min' },
  { slug: 'make-friends-in-a-new-city', title: 'How to Make Friends in a New City as an Adult', category: 'Friendship', readTime: '6 min' },
  { slug: 'safe-private-online-chat', title: 'Private Online Chat Safety: Essential Guide', category: 'Safety', readTime: '4 min' },
  { slug: 'best-apps-to-meet-people-online', title: 'Best Apps to Meet People Online in 2025', category: 'Roundups', readTime: '7 min' },
  { slug: 'why-swiping-doesnt-work', title: 'Why Swiping Doesn\'t Work (And What Does)', category: 'Dating Advice', readTime: '6 min' },
  { slug: 'language-exchange-tips', title: 'Language Exchange Tips That Actually Work', category: 'Language Practice', readTime: '5 min' },
  { slug: 'best-language-exchange-apps-2025', title: 'Best Language Exchange Apps in 2025: A Comparison', category: 'Roundups', readTime: '6 min' },
  { slug: 'alternative-dating-apps-to-tinder', title: 'Best Tinder Alternatives in 2025', category: 'Comparisons', readTime: '6 min' },
  { slug: 'free-chat-apps-for-making-friends', title: 'Best Free Chat Apps for Making Friends Online', category: 'Friendship', readTime: '5 min' },
  { slug: 'how-cv-dating-works', title: 'How CV Dating Works: Everything You Need to Know', category: 'Product Guide', readTime: '4 min' },
  { slug: 'anime-dating-tips', title: 'Anime Dating Tips: Meet Anime Fans for Real Connection', category: 'Niche Dating', readTime: '5 min' },
  { slug: 'kpop-fan-community-online', title: 'K-pop Fan Community Online: Meet, Chat & Connect', category: 'Niche Dating', readTime: '5 min' },
  { slug: 'how-to-make-online-friends-as-an-adult', title: 'How to Make Online Friends as an Adult (That Stick)', category: 'Friendship', readTime: '5 min' },
  { slug: 'conversation-starters-for-dating-apps', title: 'Conversation Starters for Dating Apps That Actually Get Replies', category: 'Chat & Openers', readTime: '4 min' },
  { slug: 'online-dating-safety-tips', title: 'Online Dating Safety Tips: Protect Yourself in 2025', category: 'Safety', readTime: '5 min' },
  { slug: 'long-distance-relationship-tips', title: 'Long-Distance Relationship Tips That Actually Work', category: 'Relationships', readTime: '6 min' },
  { slug: 'how-to-meet-people-in-a-new-country', title: 'How to Meet People in a New Country (Expats & Travelers)', category: 'Travel & Relocation', readTime: '6 min' },
  { slug: 'how-to-write-a-dating-profile', title: 'How to Write a Dating Profile That Gets Real Responses', category: 'Profile Tips', readTime: '5 min' },
]

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">
          CV Dating<span className="text-[#53745c]">.</span>
        </Link>
        <Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium transition hover:border-[#53745c]">
          Join free
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-10 pb-16 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#53745c]">Knowledge & Advice</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-[#1f231d]">
          Guides for real connection.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#64685f]">
          Practical advice on dating without swiping, meeting people as an adult, language exchange, and safer online conversation.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guidesList.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-[#e5e3dc] bg-white p-6 shadow-sm transition hover:border-[#53745c] hover:shadow-md"
            >
              <div>
                <span className="inline-block rounded-full bg-[#e8ede5] px-3 py-1 text-xs font-medium text-[#42634b]">
                  {guide.category}
                </span>
                <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-[#252923] group-hover:text-[#345b40] transition">
                  {guide.title}
                </h2>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-[#777b72] pt-4 border-t border-[#f0eee9]">
                <span>{guide.readTime} read</span>
                <span className="flex items-center gap-1 font-medium text-[#42634b] group-hover:translate-x-1 transition">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-3xl bg-[#345b40] p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Ready to meet through conversation?</h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-[#d8e5d9]">
            CV Dating introduces up to four adults to you each day for dating, friendship, or language exchange. No endless swipe feed.
          </p>
          <Link
            href="/auth"
            className="mt-6 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]"
          >
            Create your free profile →
          </Link>
        </section>
      </section>
    </main>
  )
}
