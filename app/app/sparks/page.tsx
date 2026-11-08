import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Zap, Bell, CheckCircle2, Flame, Sparkles } from 'lucide-react'

export default async function SparksPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: any) => cs.forEach(({ name, value, options }: any) => cookieStore.set(name, value, options)),
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  // Fetch signals and recent match actions
  const { data: signals } = await supabase
    .from('algo_signals')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-2 mb-1">
        <Zap size={22} className="text-gold" />
        <h1 className="text-2xl font-bold">Sparks & Activity</h1>
      </div>
      <p className="text-text-muted text-sm mb-6">Real-time alerts, feedback, and milestones</p>

      <div className="flex flex-col gap-3">
        {/* System Notice */}
        <div className="folio-card p-4 border-l-4 border-l-primary flex items-start gap-3">
          <Sparkles className="text-primary shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-bold text-text-main">AI & Heuristic Engine Active</h4>
            <p className="text-xs text-text-muted mt-0.5">
              Every decision you make adjusts your personalized weights (language, location, skills, goals).
            </p>
          </div>
        </div>

        {/* Signals Feed */}
        {signals && signals.length > 0 ? (
          signals.map((s) => (
            <div key={s.id} className="folio-card p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {s.outcome === 'spark' ? <Flame size={16} className="text-coral" /> : <Bell size={16} />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-main capitalize">
                    {s.outcome === 'spark' ? 'Mutual Match Occurred' : `Match Status: ${s.outcome || 'Evaluated'}`}
                  </p>
                  <span className="text-[10px] text-text-muted">
                    Compatibility Index: {Math.round(s.match_score || 50)}%
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-text-muted">
                {new Date(s.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))
        ) : (
          <div className="folio-card p-8 text-center text-text-muted text-sm">
            <CheckCircle2 size={32} className="mx-auto mb-2 text-primary/40" />
            <p>No recent activity. Check your daily matches at 9:00 AM.</p>
          </div>
        )}
      </div>
    </div>
  )
}

