'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GeometricAvatar } from '@/lib/avatar'
import { Clock } from 'lucide-react'

function IntentBadge({ intent }: { intent: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    dating:  { cls: 'badge-dating',  label: '🔴 Dating' },
    friends: { cls: 'badge-friends', label: '🔵 Friends' },
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
  profile: { id: string; codename: string; city?: string; intent: string[]; skill_tags: string[]; prompts: { question: string; answer: string }[]; folio_score: number; age?: number; industry?: string } | null
  expires_at: string
  user_decision: string | null
  status: string
  match_reasons: string[]
}

export default function TodayClient({ matches, userId }: { matches: Match[]; userId: string }) {
  const [decisions, setDecisions] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [spark, setSpark] = useState<string | null>(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const decide = async (matchId: string, decision: 'continue' | 'pass') => {
    setLoading(l => ({ ...l, [matchId]: true }))
    const res = await fetch('/api/matches/decide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, decision }),
    })
    const data = await res.json()
    setDecisions(d => ({ ...d, [matchId]: decision }))
    setLoading(l => ({ ...l, [matchId]: false }))
    if (data.spark) setSpark(data.threadId)
  }

  const pending = matches.filter(m => !decisions[m.id] && m.user_decision === null)
  const decided = matches.filter(m => decisions[m.id] || m.user_decision)

  if (spark) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div className="text-7xl mb-6 animate-pulse-slow">🔥</div>
      <h2 className="text-3xl font-bold text-primary mb-2">It&apos;s a Spark!</h2>
      <p className="text-text-muted mb-8">You both said yes. Your Thread has begun.<br />30 days starts now.</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href={`/app/threads/${spark}`} className="btn-primary">Open Thread →</Link>
        <button onClick={() => setSpark(null)} className="btn-ghost">Back to Today</button>
      </div>
    </div>
  )

  return (
    <div className="px-5 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{greeting} ✨</h1>
        <p className="text-text-muted text-sm mt-0.5">
          {pending.length > 0 ? `${pending.length} Folio${pending.length > 1 ? 's' : ''} waiting for you` : 'All Folios decided for today'}
        </p>
        {pending.some(m => { const h = Math.floor((new Date(m.expires_at).getTime() - Date.now()) / 3600000); return h < 3 }) && (
          <div className="mt-2 text-xs text-coral font-medium">⏰ Some Folios expire soon — make a call</div>
        )}
      </div>

      {/* Match cards */}
      {matches.length === 0 ? (
        <div className="folio-card p-8 text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h3 className="font-bold text-lg mb-2">Next drop: 9AM tomorrow</h3>
          <p className="text-text-muted text-sm">Complete your Folio to improve your matches.</p>
          <Link href="/app/folio" className="btn-primary mt-4 inline-block">Improve my Folio</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map(match => {
            const p = match.profile
            if (!p) return null
            const dec = decisions[match.id] ?? match.user_decision
            const isLoading = loading[match.id]
            const firstPrompt = Array.isArray(p.prompts) && p.prompts.length > 0 ? p.prompts[0] : null

            return (
              <div key={match.id} className={`folio-card p-5 ${dec ? 'opacity-60' : ''}`}>
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

                {/* Decision buttons */}
                {dec ? (
                  <div className={`text-center text-sm font-semibold py-2 rounded-full ${dec === 'continue' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}>
                    {dec === 'continue' ? '✓ Continued — waiting for them' : '✗ Passed'}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => decide(match.id, 'pass')} disabled={isLoading} className="btn-ghost flex-1 py-3">
                      ✗ Pass
                    </button>
                    <button onClick={() => decide(match.id, 'continue')} disabled={isLoading} className="btn-primary flex-1 py-3">
                      {isLoading ? '...' : '✓ Continue'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {decided.length > 0 && pending.length === 0 && matches.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm">
            {decided.filter(m => (decisions[m.id] ?? m.user_decision) === 'continue').length} Continues · {decided.filter(m => (decisions[m.id] ?? m.user_decision) === 'pass').length} Passes
          </p>
          <p className="text-text-muted text-xs mt-1">Next 4 Folios arrive at <span className="text-primary font-medium">9AM tomorrow</span></p>
        </div>
      )}
    </div>
  )
}
