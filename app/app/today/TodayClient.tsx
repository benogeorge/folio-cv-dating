'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GeometricAvatar } from '@/lib/avatar'
import { Clock } from 'lucide-react'

function IntentBadge({ intent }: { intent: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    dating:  { cls: 'badge-dating',  label: '🔴 Dating' },
    long_term: { cls: 'badge-dating', label: '💍 Long-term' },
    friends: { cls: 'badge-friends', label: '🔵 Friends' },
    language_exchange: { cls: 'badge-friends', label: '🌍 Language exchange' },
    collab:  { cls: 'badge-collab',  label: '🟡 Collab' },
    mentor:  { cls: 'badge-mentor',  label: '🟢 Mentor' },
  }
  const b = map[intent] ?? { cls: 'badge-dating', label: intent }
  return <span className={`badge ${b.cls}`}>{b.label}</span>
}

function CountdownPill({ expiresAt }: { expiresAt: string }) {
  const [text, setText] = useState('')
  const [urgent, setUrgent] = useState(false)
  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) { setText('EXPIRED'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setText(`${h}h ${m}m`)
      setUrgent(h < 2)
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [expiresAt])
  return (
    <span className={`countdown-pill flex items-center gap-1 ${urgent ? 'urgent' : ''}`}>
      <Clock size={10} /> {text}
    </span>
  )
}

interface Match {
  id: string
  threadId: string | null
  profile: { id: string; codename: string; city?: string; intent: string[]; skill_tags: string[]; prompts: { question: string; answer: string }[]; folio_score: number; age?: number; industry?: string } | null
  expires_at: string
  user_decision: string | null
  status: string
  match_reasons: string[]
}

export default function TodayClient({ matches, userId, matchSetupError = '' }: { matches: Match[]; userId: string; matchSetupError?: string }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="px-5 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{greeting} ✨</h1>
        <p className="text-text-muted text-sm mt-0.5">
          {matchSetupError ? 'Introductions are paused' : matches.length > 0 ? `${matches.length} introductions selected for you` : 'We are looking for your first introductions'}
        </p>
      </div>

      {/* Match cards */}
      {matches.length === 0 ? (
        <div className="folio-card p-8 text-center">
          <div className="text-5xl mb-4">{matchSetupError ? '🛠️' : '⏳'}</div>
          <h3 className="font-bold text-lg mb-2">{matchSetupError ? 'Matching setup incomplete' : 'No introductions yet'}</h3>
          <p className="text-text-muted text-sm">{matchSetupError || 'We will only show real, compatible members. There may not be enough active people in your preferences yet.'}</p>
          {!matchSetupError && <Link href="/app/folio" className="btn-primary mt-4 inline-block">Review my profile</Link>}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map(match => {
            const p = match.profile
            if (!p) return null
            const firstPrompt = Array.isArray(p.prompts) && p.prompts.length > 0 ? p.prompts[0] : null

            return (
              <div key={match.id} className="folio-card p-5">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar-ring"><div className="avatar-inner w-12 h-12"><GeometricAvatar codename={p.codename} size={44} /></div></div>
                    <div>
                      <p className="font-bold text-base">{p.codename}</p>
                      <p className="text-text-muted text-xs">{p.city ?? 'Unknown city'}{p.age ? ` · ${p.age}` : ''}</p>
                    </div>
                  </div>
                  <CountdownPill expiresAt={match.expires_at} />
                </div>

                {/* Intent badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(p.intent ?? []).map(i => <IntentBadge key={i} intent={i} />)}
                </div>

                {/* Skills */}
                {p.skill_tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.skill_tags.slice(0, 4).map(s => <span key={s} className="chip">{s}</span>)}
                    {p.skill_tags.length > 4 && <span className="chip text-text-muted">+{p.skill_tags.length - 4}</span>}
                  </div>
                )}

                {/* Chapter prompt preview */}
                {firstPrompt && (
                  <div className="bg-app/60 rounded-xl p-3 mb-4">
                    <p className="text-text-muted text-xs mb-1">{firstPrompt.question}</p>
                    <p className="text-text-main text-sm italic line-clamp-2">&ldquo;{firstPrompt.answer}&rdquo;</p>
                  </div>
                )}

                {/* Match reasons */}
                {match.match_reasons?.length > 0 && (
                  <p className="text-text-muted text-xs mb-4">✨ Matched because: {match.match_reasons.join(' · ')}</p>
                )}

                {/* View full button */}
                <Link href={`/app/today/${match.id}`} className="text-primary text-sm font-medium block mb-4">
                  View full Folio →
                </Link>

                <Link href={match.threadId ? `/app/threads/${match.threadId}` : `/app/today/${match.id}`} className="btn-primary block py-3">
                  Open your 24-hour conversation →
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-text-muted text-xs">Talk for 24 hours before moving into your 30-day connection.</p>
        </div>
      )}
    </div>
  )
}
