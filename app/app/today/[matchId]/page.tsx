import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import MatchDetailClient from './MatchDetailClient'

export default async function MatchDetailPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params
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

  const { data: match } = await supabase
    .from('daily_matches').select('*').eq('id', matchId)
    .or(`user_id.eq.${session.user.id},matched_user_id.eq.${session.user.id}`)
    .single()

  if (!match) return notFound()

  const targetId = match.user_id === session.user.id ? match.matched_user_id : match.user_id
  const { data: profile } = await supabase.from('public_profiles').select('id,codename,city,age,intent,skill_tags,prompts,interests,industry,education_level').eq('id', targetId).single()
  const { data: thread } = await supabase.from('threads').select('id')
    .or(`and(user_a.eq.${session.user.id},user_b.eq.${targetId}),and(user_a.eq.${targetId},user_b.eq.${session.user.id})`)
    .maybeSingle()

  return <MatchDetailClient match={match} profile={profile} threadId={thread?.id ?? null} />
}
