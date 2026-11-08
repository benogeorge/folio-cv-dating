'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GeometricAvatar } from '@/lib/avatar'
import { ChevronLeft, Play } from 'lucide-react'

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

export default function MatchDetailClient({ match, profile, userId }: {
  match: { id: string; user_decision: string | null; status: string }
  profile: { codename: string; city?: string; age?: number; intent: string[]; skill_tags: string[]; prompts: { question: string; answer: string }[]; interests: string[]; industry?: string; education_level?: string } | null
  userId: string
}) {
  const router = useRouter()
  const [decision, setDecision] = useState<string | null>(match.user_decision)
  const [loading, setLoading] = useState(false)
  const [spark, setSpark] = useState(false)

  if (!profile) return <div className="p-6 text-text-muted">Profile not found</div>

  const decide = async (dec: 'continue' | 'pass') => {
    setLoading(true)
    const res = await fetch('/api/matches/decide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId: match.id, decision: dec }),
    })
    const data = await res.json()
    setDecision(dec)
    setLoading(false)
    if (data.spark) setSpark(true)
  }

  if (spark) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl mb-6">🔥</div>
      <h2 className="text-3xl font-bold text-primary mb-2">It&apos;s a Spark!</h2>
      <p className="text-text-muted mb-8">You both said yes. 30 days begins now.</p>
      <button onClick={() => router.push('/app/threads')} className="btn-primary max-w-xs">View my Threads →</button>
    </div>
  )

  return (
    <div className="px-5 py-6">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-text-muted text-sm mb-6">
        <ChevronLeft size={16} /> Back to Today
      </button>

      {/* Avatar hero */}
      <div className="flex flex-col items-center mb-6">
        <div className="avatar-ring p-1 mb-3"><div className="avatar-inner w-24 h-24"><GeometricAvatar codename={profile.codename} size={88} /></div></div>
        <h2 className="text-2xl font-bold">{profile.codename}</h2>
        <p className="text-text-muted text-sm">{profile.city ?? 'Unknown'}{profile.age ? ` · Age ${profile.age}` : ''}</p>
        {profile.industry && <p className="text-primary text-xs mt-1 font-medium">{profile.industry}</p>}
      </div>

      {/* Intent badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {profile.intent.map(i => <IntentBadge key={i} intent={i} />)}
      </div>

      {/* Skills */}
      {profile.skill_tags?.length > 0 && (
        <div className="folio-card p-4 mb-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skill_tags.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      )}

      {/* Prompts */}
      {profile.prompts?.length > 0 && (
        <div className="folio-card p-4 mb-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Chapters</p>
          <div className="flex flex-col gap-4">
            {profile.prompts.map((pr, i) => (
              <div key={i}>
                <p className="text-text-muted text-xs mb-1">{pr.question}</p>
                <p className="text-text-main text-sm italic">&ldquo;{pr.answer}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {profile.interests?.length > 0 && (
        <div className="folio-card p-4 mb-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Interests</p>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map(i => <span key={i} className="chip">{i}</span>)}
          </div>
        </div>
      )}

      {/* Voice note placeholder */}
      <div className="folio-card p-4 mb-6">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Voice Note</p>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
            <Play size={16} className="text-gold" />
          </button>
          <div className="flex-1 flex items-center gap-0.5 h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="bg-gold/30 rounded-full w-1" style={{ height: `${20 + Math.sin(i * 0.8) * 12}px` }} />
            ))}
          </div>
          <span className="text-text-muted text-xs">0:28</span>
        </div>
        <p className="text-text-muted text-xs mt-2">🔒 Voice note — unlock after first message</p>
      </div>

      {/* Decision */}
      {decision ? (
        <div className={`text-center text-sm font-semibold py-3 rounded-full ${decision === 'continue' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}>
          {decision === 'continue' ? '✓ Continued — waiting for them to decide' : '✗ Passed'}
        </div>
      ) : (
        <div className="flex gap-3 sticky bottom-20">
          <button onClick={() => decide('pass')} disabled={loading} className="btn-ghost flex-1">✗ Pass</button>
          <button onClick={() => decide('continue')} disabled={loading} className="btn-primary flex-1">
            {loading ? '...' : '✓ Continue'}
          </button>
        </div>
      )}
    </div>
  )
}
