import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock3, FileText, HeartHandshake, Languages, UsersRound } from 'lucide-react'
import AdSlot from './AdSlot'

export const metadata: Metadata = {
  title: 'MeetByStory: Online Chat, Dating, Friends & Language Exchange',
  description: 'Meet people through your story, not a swipe. MeetByStory offers up to four automatic introductions for dating, friendship, and language exchange, with a 24-hour conversation.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Online chat and dating without swiping — MeetByStory',
    description: 'A thoughtful way to meet people for dating, friendship, and language exchange. Up to four introductions, with a 24-hour conversation.',
    url: '/',
    siteName: 'MeetByStory',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Online chat and dating without swiping — MeetByStory',
    description: 'Meet people for dating, friendship, and language exchange through thoughtful introductions, not a swipe stack.',
  },
}

const steps = [
  { number: '01', title: 'Share your story', description: 'Upload a CV and tell us what kind of connection you want. Your work is one part of your profile, not the whole story.' },
  { number: '02', title: 'Get automatic introductions', description: 'Each day, MeetByStory selects up to four people for you from available members. No browsing a stack of faces and no choosing who makes the list.' },
  { number: '03', title: 'Talk for 24 hours', description: 'Your introduction opens a conversation. Get to know each other during the full 24-hour period before moving into the longer connection path.' },
]

const connectionTypes = [
  { icon: HeartHandshake, label: 'Dating & lasting relationships' },
  { icon: UsersRound, label: 'Friendship & community' },
  { icon: Languages, label: 'Language exchange across borders' },
]

const connectionGuides = [
  { label: 'HelloTalk alternative (chat & date)', href: '/connections/hellotalk-alternative' },
  { label: 'Meet girls online', href: '/connections/meet-girls-online' },
  { label: 'Meet women online', href: '/connections/meet-women-online' },
  { label: 'Dating without swiping', href: '/connections/dating-without-swiping' },
  { label: 'CV-based dating', href: '/connections/cv-based-dating' },
  { label: 'Slow dating app', href: '/connections/slow-dating-app' },
  { label: 'Chat with strangers (safely)', href: '/connections/chat-with-strangers' },
  { label: 'Make friends online', href: '/connections/make-friends-online' },
  { label: 'Language exchange hub', href: '/connections/language-exchange' },
  { label: 'Long-term relationships', href: '/connections/long-term-relationships' },
  { label: 'Private online chat', href: '/connections/anonymous-online-chat' },
  { label: 'Meet K-pop fans', href: '/connections/kpop-fans-online' },
  { label: 'Meet anime and manga fans', href: '/connections/anime-manga-fans-online' },
  { label: 'Meet Goth & alternative adults', href: '/connections/goth-alternative-community' },
  { label: 'Meet gaming friends', href: '/connections/gaming-friends-online' },
  { label: 'All 40+ Connection Hubs →', href: '/connections' },
  { label: 'All 20+ Expert Guides & Advice →', href: '/guides' },
  { label: 'Daily conversation prompt', href: '/daily-conversation-prompt' },
]

export default function HomePage() {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cvdating.app' : process.env.NEXT_PUBLIC_APP_URL || 'https://cvdating.app'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MeetByStory',
    url: baseUrl,
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Web',
    description: 'A CV-informed introduction app for dating, friendship, language exchange, and meaningful connection without swiping.',
  }

  return (
      <main className="min-h-screen bg-[#f7f5f1] text-[#252923] selection:bg-[#d9e7d9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" aria-label="MeetByStory home" className="text-lg font-semibold tracking-[-0.04em]">MeetByStory<span className="text-[#45634b]">.</span></Link>
        <Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium transition hover:border-[#45634b] hover:text-[#42634b]">Sign in</Link>
      </header>

      <section className="relative isolate overflow-hidden bg-[#13231a] text-[#f7f5f1]">
        <div aria-hidden="true" className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#345b40] opacity-40 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-14 sm:px-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-28 md:pt-20">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c6dbc8]"><FileText size={14} /> A more human way to meet</p>
            <h1 className="max-w-2xl text-5xl font-medium leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">Less swiping.<br /><span className="text-[#b8d1b7]">More to talk about.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#d5ded5]">Tell us about your life and who you hope to meet. We choose up to four people for you—automatically—and open a chat for a full 24 hours. No photo queue. No choosing who gets through.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/auth" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d5e6d1] px-7 py-4 text-sm font-semibold text-[#193421] transition hover:bg-white">Create your profile <ArrowRight size={16} /></Link>
              <span className="text-sm text-[#d5ded5]">For dating, friendship, or language exchange.</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#d5ded5]">
              <span className="inline-flex items-center gap-2"><UsersRound size={16} className="text-[#b8d1b7]" /> Meet across genders and borders</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-[#b8d1b7]" /> A full day to talk</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b8d1b7]">Your day, made simpler</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">Four introductions.<br />One good conversation at a time.</h2></div><span className="rounded-full bg-[#b8d1b7] px-3 py-1.5 text-xs font-bold text-[#193421]">24h</span></div>
            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[#f7f5f1] p-4 text-[#252923]"><p className="text-xs font-semibold uppercase tracking-wider text-[#45634b]">You share</p><p className="mt-1 text-sm">Your story, interests, and the connection you want.</p></div>
              <div className="flex justify-center text-[#b8d1b7]" aria-hidden="true"><ArrowRight className="rotate-90" size={18} /></div>
              <div className="rounded-2xl border border-white/10 bg-[#e8ede5] p-4 text-[#252923]"><p className="text-xs font-semibold uppercase tracking-wider text-[#45634b]">We introduce</p><p className="mt-1 text-sm">Up to four people who may be a thoughtful fit.</p></div>
              <div className="flex justify-center text-[#b8d1b7]" aria-hidden="true"><ArrowRight className="rotate-90" size={18} /></div>
              <div className="rounded-2xl bg-[#345b40] p-4 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-[#d5e6d1]">You talk</p><p className="mt-1 text-sm">The chat opens. Take the day to get to know each other.</p></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#d5ded5]">Introductions depend on who is available. You never need to swipe through a stack first.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4e2dc] bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">How MeetByStory works</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">A small number of introductions, chosen with intention.</h2>
          </div>
          <div className="mt-12 grid gap-9 md:grid-cols-3 md:gap-12">
            {steps.map((step) => <article key={step.number} className="border-t border-[#d8d8d0] pt-5"><span className="text-xs font-semibold tracking-[0.12em] text-[#45634b]">{step.number}</span><h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#6c7068]">{step.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">Dating and beyond</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">For the connection you are actually hoping to find.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#6c7068]">Some people want to date. Some want a friend in a new city or a language partner on the other side of the world. Some hope to meet a life partner. Choose your intention and meet people looking for the same kind of connection.</p>
        <div className="mt-8 flex flex-wrap gap-3">{connectionTypes.map(({ icon: Icon, label }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-[#d8d8d0] bg-[#fbfaf8] px-4 py-2.5 text-sm text-[#4e554d]"><Icon size={16} className="text-[#45634b]" />{label}</span>)}</div>
      </section>

      <AdSlot />

      <section className="border-t border-[#e4e2dc] bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">Choose your kind of connection</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em]">Explore how MeetByStory works for different goals.</h2>
          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {connectionGuides.map((guide) => <Link key={guide.href} href={guide.href} className="text-sm text-[#42634b] underline underline-offset-4 hover:text-[#284a33]">{guide.label} →</Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#345b40] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between md:py-16">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c6dbc8]">Start with a better introduction</p><h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.04em]">Bring your whole story. Let the right people find you.</h2></div>
          <Link href="/auth" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]">Join MeetByStory <ArrowRight size={16} /></Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-[#5d645a] sm:flex-row sm:items-center sm:justify-between sm:px-10"><span>MeetByStory · Meet beyond the swipe.</span><span>Dating · Friendship · Language exchange · Lasting connection</span></footer>
    </main>
  )
}
