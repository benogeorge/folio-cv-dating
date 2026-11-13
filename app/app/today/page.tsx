import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { generateDailyMatches } from '@/lib/match-engine'
import { createAdminClient } from '@/lib/supabase/admin'
import TodayClient from './TodayClient'

export default async function TodayPage() {
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

  // Auto-generate today's matches if not done yet
  let matchSetupError = ''
  try {
    await generateDailyMatches(session.user.id, createAdminClient())
  } catch (error) {
    console.error('Daily matching is unavailable:', error)
    matchSetupError = 'Introductions are temporarily paused while private matching is being secured. Please check back soon.'
  }

  // A daily introduction is shared by both people and opens a conversation.
  const today = new Date().toISOString().slice(0, 10)
  const { data: matches, error: matchesError } = await supabase
    .from('daily_matches')
    .select('*')
    .eq('match_date', today)
    .or(`user_id.eq.${session.user.id},matched_user_id.eq.${session.user.id}`)
    .order('created_at', { ascending: true })
    .limit(4)
  if (matchesError) throw matchesError

  const matchedIds = matches?.map((m: { user_id: string; matched_user_id: string }) =>
    m.user_id === session.user.id ? m.matched_user_id : m.user_id
  ) ?? []
  const { data: matchedProfiles } = matchedIds.length > 0
    ? await supabase.from('public_profiles').select('id,codename,city,intent,skill_tags,prompts,folio_score,age,industry,interests').in('id', matchedIds)
    : { data: [] }

  const { data: userThreads } = await supabase
    .from('threads')
    .select('id,user_a,user_b')
    .or(`user_a.eq.${session.user.id},user_b.eq.${session.user.id}`)

  const enrichedMatches = matches?.map((m: any) => ({
    ...m,
    profile: matchedProfiles?.find((p: any) => p.id === (m.user_id === session.user.id ? m.matched_user_id : m.user_id)) ?? null,
    threadId: userThreads?.find((thread: any) =>
      (thread.user_a === m.user_id && thread.user_b === m.matched_user_id) ||
      (thread.user_a === m.matched_user_id && thread.user_b === m.user_id)
    )?.id ?? null,
  })) ?? []

  return <TodayClient matches={enrichedMatches as any} userId={session.user.id} matchSetupError={matchSetupError} />
}

