import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock3, FileText, HeartHandshake, Languages, MessageCircle, Shield, Star, UsersRound, Zap } from 'lucide-react'
import AdSlot from './AdSlot'

export const metadata: Metadata = {
  title: 'NoSwipe – Free No Swipe Dating App | Best Tinder Alternative 2025',
  description: 'NoSwipe is the free no-swipe dating app that actually works. Meet real people online for dating, friendship and language exchange. The best Tinder alternative, Bumble alternative and Hinge alternative. USA, UK, Australia, Canada & worldwide.',
  alternates: { canonical: 'https://cvdating.app' },
  openGraph: {
    title: 'NoSwipe – Free No Swipe Dating App | Best Tinder Alternative 2025',
    description: 'Fed up with Tinder? NoSwipe connects you with real people without swiping. Free dating app for dating, friendship and language exchange worldwide.',
    url: 'https://cvdating.app',
    siteName: 'NoSwipe',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What is NoSwipe?',
    a: 'NoSwipe is a free no-swipe dating app and Tinder alternative. Instead of swiping through hundreds of photos, NoSwipe sends you up to 4 curated daily introductions based on your profile and what kind of connection you want — dating, friendship, or language exchange.',
  },
  {
    q: 'Is NoSwipe free?',
    a: 'Yes. NoSwipe is completely free to use. You can receive daily introductions, chat with matches, and explore the community at no cost.',
  },
  {
    q: 'How is NoSwipe different from Tinder?',
    a: 'Tinder is based on rapid photo swiping. NoSwipe removes swiping entirely. You get a small number of thoughtful daily introductions instead of an infinite scroll of faces. It is better for people who want real conversations, not just matches.',
  },
  {
    q: 'Is NoSwipe available in my country?',
    a: 'Yes. NoSwipe works worldwide — USA, UK, Canada, Australia, Europe, Asia, and everywhere else. It also works great for language exchange between countries.',
  },
  {
    q: 'Can I use NoSwipe just to make friends or find a language partner?',
    a: 'Absolutely. NoSwipe supports dating, friendship, and language exchange. Many users use it as a HelloTalk alternative or simply to meet new people online.',
  },
  {
    q: 'How does NoSwipe protect my privacy?',
    a: 'Your profile is only shared with your daily introductions, not with thousands of strangers. Chats are private and time-limited, reducing the pressure of online dating.',
  },
]

const comparisons = [
  { app: 'Tinder', problem: 'Endless swiping, ghosting, superficial matches based on photos only', noswipe: 'Up to 4 curated daily intros. Real profiles. No swipe queue.' },
  { app: 'Bumble', problem: 'Still photo-first, women overwhelmed with matches, same swipe fatigue', noswipe: 'No swiping at all. Introductions sent automatically to both sides.' },
  { app: 'Hinge', problem: 'Still a swipe app at heart, designed to keep you on it', noswipe: 'Designed to get you into real conversation, not keep you scrolling.' },
  { app: 'HelloTalk', problem: 'Language exchange only, no dating, full of spam', noswipe: 'Language exchange AND dating AND friendship. Curated intros, no spam.' },
]

const connectionGuides = [
  { label: 'Tinder alternative', href: '/connections/tinder-alternative' },
  { label: 'Bumble alternative', href: '/connections/bumble-alternative' },
  { label: 'Hinge alternative', href: '/connections/hinge-alternative' },
  { label: 'HelloTalk alternative', href: '/connections/hellotalk-alternative' },
  { label: 'Meet girls online', href: '/connections/meet-girls-online' },
  { label: 'Meet women online', href: '/connections/meet-women-online' },
  { label: 'Dating without swiping', href: '/connections/dating-without-swiping' },
  { label: 'Slow dating app', href: '/connections/slow-dating-app' },
  { label: 'Chat with strangers safely', href: '/connections/chat-with-strangers' },
  { label: 'Make friends online', href: '/connections/make-friends-online' },
  { label: 'Language exchange app', href: '/connections/language-exchange' },
  { label: 'Dating app UK', href: '/connections/dating-app-uk' },
  { label: 'Dating app USA', href: '/connections/dating-app-usa' },
  { label: 'Dating app Australia', href: '/connections/dating-app-australia' },
  { label: 'Dating for professionals', href: '/connections/dating-for-professionals' },
  { label: 'Meet K-pop fans', href: '/connections/kpop-fans-online' },
  { label: 'Meet anime & manga fans', href: '/connections/anime-manga-fans-online' },
  { label: 'Meet gaming friends', href: '/connections/gaming-friends-online' },
  { label: 'All 50+ connection guides →', href: '/connections' },
  { label: 'All dating guides & advice →', href: '/guides' },
]

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'NoSwipe',
    url: 'https://cvdating.app',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free no-swipe dating app. The best Tinder alternative, Bumble alternative and HelloTalk alternative for dating, friendship and language exchange worldwide.',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923] selection:bg-[#d9e7d9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      {/* NAV */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" aria-label="NoSwipe home" className="text-lg font-semibold tracking-[-0.04em]">
          NoSwipe<span className="text-[#45634b]">.</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/connections" className="hidden text-sm text-[#4e554d] hover:text-[#252923] sm:block">Browse</Link>
          <Link href="/guides" className="hidden text-sm text-[#4e554d] hover:text-[#252923] sm:block">Guides</Link>
          <Link href="/connections" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm font-medium transition hover:border-[#45634b] hover:text-[#42634b]">Get Started Free</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#13231a] text-[#f7f5f1]">
        <div aria-hidden="true" className="absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#345b40] opacity-40 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-10 md:pb-28 md:pt-20">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c6dbc8]">
            <Zap size={14} /> The Tinder Alternative That Actually Works
          </p>
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            No Swipe Dating App.<br /><span className="text-[#b8d1b7]">Meet Real People Online.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d5ded5]">
            NoSwipe is the free no-swipe dating app and best Tinder alternative in 2025. We send you up to 4 curated daily introductions for dating, friendship, and language exchange — no swiping, no endless scrolling, no photo queue.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/connections" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d5e6d1] px-7 py-4 text-sm font-semibold text-[#193421] transition hover:bg-white">
              Start for free <ArrowRight size={16} />
            </Link>
            <span className="text-sm text-[#d5ded5]">Free · No swiping · Works worldwide</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#d5ded5]">
            <span className="inline-flex items-center gap-2"><UsersRound size={16} className="text-[#b8d1b7]" /> USA · UK · Canada · Australia · Worldwide</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-[#b8d1b7]" /> 24-hour private chat window</span>
            <span className="inline-flex items-center gap-2"><Shield size={16} className="text-[#b8d1b7]" /> Private & safe</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BADGES */}
      <section className="border-b border-[#e4e2dc] bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#5d645a]">
            <span className="flex items-center gap-2"><Star size={15} className="text-[#45634b]" /><strong>Free to use</strong> — no credit card</span>
            <span className="flex items-center gap-2"><MessageCircle size={15} className="text-[#45634b]" /><strong>Dating, friendship & language exchange</strong></span>
            <span className="flex items-center gap-2"><Shield size={15} className="text-[#45634b]" /><strong>No bots</strong> — real curated profiles</span>
            <span className="flex items-center gap-2"><UsersRound size={15} className="text-[#45634b]" /><strong>Works worldwide</strong> — all countries</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-[#e4e2dc]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">How it works</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Why NoSwipe beats Tinder, Bumble and Hinge</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#6c7068]">Most dating apps are built to keep you swiping. NoSwipe is built to get you into a real conversation with someone compatible — fast.</p>
          <div className="mt-12 grid gap-9 md:grid-cols-3 md:gap-12">
            {[
              { n: '01', title: 'Build your profile', desc: 'Share who you are, what you do, and the kind of person you want to meet. Dating, friendship, or language exchange.' },
              { n: '02', title: 'Get daily intros', desc: 'NoSwipe picks up to 4 people for you every day. No swiping. No choosing who gets through. Just people who match your intentions.' },
              { n: '03', title: 'Chat for 24 hours', desc: 'A private chat opens. You have 24 hours to get to know each other. No pressure, no ghosting, no swiping.' },
            ].map(s => (
              <article key={s.n} className="border-t border-[#d8d8d0] pt-5">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#45634b]">{s.n}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6c7068]">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="border-b border-[#e4e2dc] bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">NoSwipe vs other apps</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">The best Tinder alternative in 2025</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#d8d8d0] text-left">
                  <th className="pb-3 pr-6 font-semibold text-[#252923]">App</th>
                  <th className="pb-3 pr-6 font-semibold text-red-600">Problem</th>
                  <th className="pb-3 font-semibold text-[#45634b]">NoSwipe advantage</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(r => (
                  <tr key={r.app} className="border-b border-[#e4e2dc]">
                    <td className="py-4 pr-6 font-medium text-[#252923]">{r.app}</td>
                    <td className="py-4 pr-6 text-[#6c7068]">{r.problem}</td>
                    <td className="py-4 text-[#45634b]">{r.noswipe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONNECTION TYPES */}
      <section className="border-b border-[#e4e2dc]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">Who is NoSwipe for?</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Dating, friendship and language exchange — your choice</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#6c7068]">NoSwipe works for dating, making friends in a new city, or finding a language exchange partner anywhere in the world. Tell us what you are looking for and we will match you with people who want the same thing.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: HeartHandshake, label: 'Dating & serious relationships' },
              { icon: UsersRound, label: 'Friendship & community' },
              { icon: Languages, label: 'Language exchange worldwide' },
              { icon: MessageCircle, label: 'Free online chat' },
              { icon: FileText, label: 'Dating for professionals' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-[#d8d8d0] bg-[#fbfaf8] px-4 py-2.5 text-sm text-[#4e554d]">
                <Icon size={16} className="text-[#45634b]" />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AdSlot />

      {/* FAQ */}
      <section className="border-b border-[#e4e2dc] bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">FAQ</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6">
            {faqs.map(f => (
              <div key={f.q} className="border-t border-[#d8d8d0] pt-6">
                <dt className="text-base font-semibold text-[#252923]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#6c7068]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CONNECTION LINKS — SEO HUB */}
      <section className="border-b border-[#e4e2dc]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#45634b]">Explore NoSwipe</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em]">Find the right connection for you</h2>
          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {connectionGuides.map(guide => (
              <Link key={guide.href} href={guide.href} className="text-sm text-[#42634b] underline underline-offset-4 hover:text-[#284a33]">
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#345b40] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-14 sm:px-10 md:flex-row md:items-center md:justify-between md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c6dbc8]">Free · No swipe · Worldwide</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.04em]">Done with Tinder? Try NoSwipe. It is free.</h2>
          </div>
          <Link href="/connections" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]">
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-[#5d645a] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span>NoSwipe · The no-swipe dating app. Free for everyone worldwide.</span>
        <span>Dating · Friendship · Language Exchange · Chat</span>
      </footer>
    </main>
  )
}
