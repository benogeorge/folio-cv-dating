import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 86400

const prompts = [
  'What is a small thing that made your week better?',
  'What place would you happily show a visitor in your city?',
  'What are you learning, unlearning, or becoming curious about?',
  'What kind of conversation do you wish happened more often?',
  'What is a tradition from home that you would like to share?',
  'What is one ordinary moment you enjoy more than most people do?',
  'What is something you could talk about for ten minutes with no preparation?'
]

export const metadata: Metadata = {
  title: 'Daily Conversation Prompt | MeetByStory',
  description: 'A fresh, low-pressure prompt for starting a thoughtful online conversation.',
  alternates: { canonical: 'https://cvdating.app/daily-conversation-prompt' }
}

export default function DailyConversationPrompt() {
  const prompt = prompts[Math.floor(Date.now() / 86_400_000) % prompts.length]
  return <main className="min-h-screen bg-[#f7f5f1] px-6 py-8 text-[#252923]"><div className="mx-auto max-w-2xl"><header className="flex items-center justify-between"><Link href="/" className="text-lg font-semibold">MeetByStory<span className="text-[#45634b]">.</span></Link><Link href="/auth" className="rounded-full border border-[#d8d8d0] px-5 py-2.5 text-sm">Join</Link></header><section className="mt-20 rounded-[2rem] bg-[#345b40] p-8 text-white sm:p-12"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c9ddcc]">Today&apos;s conversation prompt</p><h1 className="mt-5 text-4xl font-medium leading-tight tracking-[-.05em] sm:text-5xl">{prompt}</h1><p className="mt-7 max-w-lg leading-7 text-[#d8e5d9]">Use it as a gentle first message. Keep it specific, answer it yourself too, and let the other person set their pace.</p><Link href="/auth" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#345b40]">Start a conversation</Link></section><p className="mt-8 text-sm leading-6 text-[#64685f]">MeetByStory is for adults aged 18+ who want dating, friendship, language exchange, or a meaningful conversation without a swipe feed.</p></div></main>
}
