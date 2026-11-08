import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sanitizeText, containsBlockedContent } from '@/lib/sanitize'

export async function POST(req: NextRequest) {
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
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { threadId, content } = await req.json()
  if (!threadId || !content) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })

  const sanitized = sanitizeText(content, 1000)
  if (containsBlockedContent(sanitized)) {
    return NextResponse.json({ error: 'Inappropriate or blocked content' }, { status: 400 })
  }

  // 1. Verify thread membership
  const { data: thread } = await supabase
    .from('threads')
    .select('*')
    .eq('id', threadId)
    .or(`user_a.eq.${session.user.id},user_b.eq.${session.user.id}`)
    .single()

  if (!thread || thread.status !== 'active') {
    return NextResponse.json({ error: 'Thread not active or not authorized' }, { status: 403 })
  }

  // 2. Check 5-message daily limit if Day < 7
  if (thread.day_count < 7) {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('thread_id', threadId)
      .eq('sender_id', session.user.id)
      .gte('created_at', todayStart.toISOString())

    if ((count ?? 0) >= 5) {
      return NextResponse.json(
        { error: 'Daily limit reached: 5 messages max per day before Day 7' },
        { status: 429 }
      )
    }
  }

  // 3. Insert message
  const { data: message, error: insErr } = await supabase
    .from('messages')
    .insert({
      thread_id: threadId,
      sender_id: session.user.id,
      content: sanitized,
    })
    .select('*')
    .single()

  if (insErr) {
    return NextResponse.json({ error: insErr.message }, { status: 500 })
  }

  return NextResponse.json({ message })
}
