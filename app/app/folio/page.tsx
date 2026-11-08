import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { GeometricAvatar } from '@/lib/avatar'
import { Edit3, ShieldCheck, Award } from 'lucide-react'

export default async function FolioProfilePage() {
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

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
  if (!profile) return null

  return (
    <div className="px-5 py-6 flex flex-col gap-5">
      {/* Profile Header */}
      <div className="folio-card p-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="avatar-ring mb-3">
          <div className="avatar-inner w-20 h-20">
            <GeometricAvatar codename={profile.codename} size={74} />
          </div>
        </div>
        <h2 className="text-xl font-bold">{profile.codename}</h2>
        <p className="text-text-muted text-xs mt-0.5">
          {profile.first_name ? `${profile.first_name} · ` : ''}{profile.city || 'Location unset'}, {profile.country}
        </p>

        {/* Folio Score */}
        <div className="w-full mt-4 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-text-muted flex items-center gap-1">
              <Award size={14} className="text-gold" /> Folio Strength
            </span>
            <span className="font-bold text-primary">{profile.folio_score}%</span>
          </div>
          <div className="thread-bar">
            <div className="thread-bar-fill" style={{ width: `${profile.folio_score}%` }} />
          </div>
        </div>
      </div>

      {/* Intents */}
      <div className="folio-card p-4">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">Connection Goals</div>
        <div className="flex flex-wrap gap-1.5">
          {profile.intent?.map((i: string) => (
            <span key={i} className="chip font-medium capitalize">
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="folio-card p-4">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-2 font-semibold">CV Highlights & Skills</div>
        <div className="flex flex-wrap gap-1.5">
          {profile.skill_tags?.map((s: string) => (
            <span key={s} className="chip bg-primary/10 text-primary border border-primary/20">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Chapter Prompts */}
      <div className="folio-card p-4 flex flex-col gap-3">
        <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Prompts</div>
        {profile.prompts?.map((pr: any, idx: number) => (
          <div key={idx} className="bg-app/50 p-3 rounded-xl border border-border/40">
            <p className="text-xs text-text-muted mb-1">{pr.question}</p>
            <p className="text-sm font-medium italic">&ldquo;{pr.answer}&rdquo;</p>
          </div>
        ))}
      </div>

      {/* Safety & Premium quick links */}
      <div className="flex flex-col gap-2">
        <Link href="/app/subscription" className="btn-primary flex items-center justify-center gap-2 py-3 text-sm">
          <span>⚡ Unlock FOLIO+ (Double Drops & Insights)</span>
        </Link>
        <div className="text-center">
          <span className="text-[11px] text-text-muted flex items-center justify-center gap-1">
            <ShieldCheck size={12} className="text-success" /> Fully encrypted profile & verified CV data
          </span>
        </div>
      </div>
    </div>
  )
}

