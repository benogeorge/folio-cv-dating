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
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', targetId).single()

  return <MatchDetailClient match={match} profile={profile} userId={session.user.id} />
}
