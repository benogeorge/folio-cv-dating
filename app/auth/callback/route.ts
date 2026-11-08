import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
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
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)
    if (session) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, folio_score')
        .eq('id', session.user.id)
        .single()

      if (!profile || profile.folio_score === 0) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }
      return NextResponse.redirect(`${origin}/app/today`)
    }
  }
  return NextResponse.redirect(`${origin}/auth?error=callback`)
}
