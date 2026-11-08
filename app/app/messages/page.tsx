import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { GeometricAvatar } from '@/lib/avatar'

export default async function MessagesPage() {
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

  // Fetch threads
  const { data: threads } = await supabase
    .from('threads')
    .select('*')
    .or(`user_a.eq.${session.user.id},user_b.eq.${session.user.id}`)
    .order('created_at', { ascending: false })

  const otherIds = threads?.map((t) => (t.user_a === session.user.id ? t.user_b : t.user_a)) ?? []
  const { data: profiles } = otherIds.length > 0
    ? await supabase.from('profiles').select('id,codename,first_name').in('id', otherIds)
    : { data: [] }

  // Fetch last message for each thread
  const threadIds = threads?.map((t) => t.id) ?? []
  const { data: allMessages } = threadIds.length > 0
    ? await supabase
        .from('messages')
        .select('*')
        .in('thread_id', threadIds)
        .order('created_at', { ascending: false })
    : { data: [] }

  const enriched = threads?.map((t) => {
    const partner = profiles?.find((p) => p.id === (t.user_a === session.user.id ? t.user_b : t.user_a))
    const lastMsg = allMessages?.find((m) => m.thread_id === t.id)
    return {
      ...t,
      partner,
      lastMsg,
    }
  }) ?? []

  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-bold mb-1">Messages</h1>
      <p className="text-text-muted text-sm mb-6">Active conversations</p>

      {enriched.length === 0 ? (
        <div className="folio-card p-8 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-bold text-lg mb-1">No chats yet</h3>
          <p className="text-text-muted text-sm">Mutual Continues will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {enriched.map((t) => {
            const displayName =
              t.day_count >= 7 && t.partner?.first_name
                ? `${t.partner.first_name} (${t.partner.codename})`
                : t.partner?.codename ?? 'Unknown'

            return (
              <Link key={t.id} href={`/app/threads/${t.id}`}>
                <div className="folio-card p-3.5 flex items-center gap-3 hover:border-primary/40 cursor-pointer">
                  <div className="avatar-ring">
                    <div className="avatar-inner w-11 h-11">
                      <GeometricAvatar codename={t.partner?.codename || 'user'} size={38} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">{displayName}</span>
                      <span className="text-[10px] text-text-muted">Day {t.day_count}</span>
                    </div>
                    <p className="text-text-muted text-xs truncate mt-0.5">
                      {t.lastMsg ? t.lastMsg.content : 'No messages yet...'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

