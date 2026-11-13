import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import ThreadChatClient from './ThreadChatClient'

export default async function ThreadDetailPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params
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

  const { data: thread } = await supabase
    .from('threads')
    .select('*')
    .eq('id', threadId)
    .or(`user_a.eq.${session.user.id},user_b.eq.${session.user.id}`)
    .single()

  if (!thread) return notFound()

  const partnerId = thread.user_a === session.user.id ? thread.user_b : thread.user_a
  const { data: partner } = await supabase.from('public_profiles').select('id,codename,first_name,city,country,age,intent,skill_tags,languages,interests,prompts').eq('id', partnerId).single()
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })

  // Check today's sent count by current user for rate limit calculation
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const { count: todayMsgCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('thread_id', threadId)
    .eq('sender_id', session.user.id)
    .gte('created_at', todayStart.toISOString())

  return (
    <ThreadChatClient
      thread={thread}
      partner={partner}
      initialMessages={messages ?? []}
      currentUserId={session.user.id}
      initialTodayCount={todayMsgCount ?? 0}
    />
  )
}
