import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { generateDailyMatches } from '@/lib/match-engine'
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
  const matches = await generateDailyMatches(session.user.id, supabase)

  // Fetch matched profiles
  const matchedIds = matches?.map((m: { matched_user_id: string }) => m.matched_user_id) ?? []
  const { data: matchedProfiles } = matchedIds.length > 0
    ? await supabase.from('profiles').select('id,codename,city,intent,skill_tags,prompts,folio_score,age,industry,interests').in('id', matchedIds)
    : { data: [] }

  const enrichedMatches = matches?.map((m: any) => ({
    ...m,
    profile: matchedProfiles?.find((p: any) => p.id === m.matched_user_id) ?? null,
  })) ?? []

  return <TodayClient matches={enrichedMatches as any} userId={session.user.id} />
}

