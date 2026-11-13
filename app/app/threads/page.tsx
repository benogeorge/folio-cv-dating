import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { GeometricAvatar } from '@/lib/avatar'

export default async function ThreadsPage() {
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

  const { data: threads } = await supabase
    .from('threads')
    .select('*')
    .or(`user_a.eq.${session.user.id},user_b.eq.${session.user.id}`)
    .order('created_at', { ascending: false })

  const otherIds = threads?.map(t => t.user_a === session.user.id ? t.user_b : t.user_a) ?? []
  const { data: profiles } = otherIds.length > 0
    ? await supabase.from('public_profiles').select('id,codename,city,intent').in('id', otherIds)
    : { data: [] }

  const enriched = threads?.map(t => ({
    ...t,
    partner: profiles?.find(p => p.id === (t.user_a === session.user.id ? t.user_b : t.user_a)),
  })) ?? []

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-bold mb-1">Threads</h1>
      <p className="text-text-muted text-sm mb-6">Your 30-day connections</p>

      {enriched.length === 0 ? (
        <div className="folio-card p-8 text-center">
          <div className="text-5xl mb-4">🔗</div>
          <h3 className="font-bold text-lg mb-2">No threads yet</h3>
          <p className="text-text-muted text-sm mb-4">Your automatically selected introductions open private conversations here.</p>
          <Link href="/app/today" className="btn-primary inline-block max-w-xs">Go to Today →</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {enriched.map(t => {
            const needsConfirm = t.status === 'active' && t.last_confirmed_date !== today
            const isUserA = t.user_a === session.user.id
            const confirmed = isUserA ? t.user_a_confirmed : t.user_b_confirmed
            const pct = Math.round((t.day_count / 30) * 100)

            return (
              <Link key={t.id} href={`/app/threads/${t.id}`}>
                <div className="folio-card p-4 hover:border-primary/40 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar-ring"><div className="avatar-inner w-10 h-10"><GeometricAvatar codename={t.partner?.codename ?? 'unknown'} size={36} /></div></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{t.partner?.codename ?? 'Unknown'}</p>
                        {t.streak > 0 && <span className="text-gold text-sm font-bold">🔥 {t.streak}</span>}
                      </div>
                      <p className="text-text-muted text-xs">Day {t.day_count} / 30 · {t.status === 'permanent' ? '🏆 Permanent' : t.status}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="thread-bar mb-2">
                    <div className="thread-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted mb-2">
                    <span>Day {t.day_count}</span>
                    <span>{t.day_count >= 7 ? '📷 Unlocked' : `📷 Day 7`} · {t.day_count >= 14 ? '📄 CV' : 'Day 14'}</span>
                    <span>Day 30</span>
                  </div>

                  {needsConfirm && !confirmed && (
                    <div className="bg-primary/10 border border-primary/30 rounded-xl px-3 py-2 text-xs text-primary font-medium text-center">
                      👋 Confirm today to keep the streak →
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

