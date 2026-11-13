'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setInfo('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (mode === 'sign-up' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const normalizedEmail = email.trim().toLowerCase()
      if (mode === 'sign-in') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        })
        if (authError) throw authError
        router.replace('/app/today')
        router.refresh()
        return
      }

      // Sign-up flow
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : 'https://cvdating.app/auth/callback'

      const { data, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      })

      if (authError) {
        // If already registered, automatically attempt sign-in
        if (authError.message.toLowerCase().includes('already registered')) {
          const { error: signinErr } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          })
          if (!signinErr) {
            router.replace('/app/today')
            router.refresh()
            return
          }
        }
        throw authError
      }

      if (data.session) {
        router.replace('/onboarding')
        router.refresh()
        return
      }

      // Try logging in directly in case email confirmation is not required
      const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (!signinError && signinData.session) {
        router.replace('/onboarding')
        router.refresh()
        return
      }

      setInfo('Account created! You can now sign in with your email and password.')
      setMode('sign-in')
    } catch (authError: any) {
      setError(authError?.message || 'Authentication failed. Please check your credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0E0A1A] text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <Link href="/" className="mb-8 block text-center text-sm text-gray-400 hover:text-white transition">
          ← Back to CV Dating
        </Link>
        <div className="mb-8 flex flex-col items-center">
          <div aria-hidden="true" className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 font-bold text-white text-lg shadow-lg shadow-purple-500/20">
            CV
          </div>
          <p className="text-base font-semibold tracking-wider text-purple-200">CV DATING</p>
          <p className="text-xs text-gray-400 mt-1">Dating, Friendship, Language Exchange</p>
        </div>

        <div className="bg-[#181326] border border-purple-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="mb-1 text-2xl font-bold tracking-tight">
            {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mb-6 text-sm text-gray-400">
            {mode === 'sign-in' ? 'Sign in with your email and password.' : 'Get started in under 30 seconds.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Email address
              <input
                type="email"
                className="w-full rounded-xl bg-[#0E0A1A] border border-purple-500/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
                placeholder="you@example.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
              Password
              <input
                type="password"
                className="w-full rounded-xl bg-[#0E0A1A] border border-purple-500/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
                placeholder="At least 6 characters"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
              />
            </label>

            {mode === 'sign-up' && (
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-200">
                Confirm password
                <input
                  type="password"
                  className="w-full rounded-xl bg-[#0E0A1A] border border-purple-500/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </label>
            )}

            {info && <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3" role="status">{info}</p>}
            {error && <p className="text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-xl p-3" role="alert">{error}</p>}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition active:scale-[0.98] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {mode === 'sign-in' ? 'New to CV Dating? ' : 'Already have an account? '}
            <button
              type="button"
              className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4"
              onClick={() => {
                setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
                setError('')
                setInfo('')
              }}
            >
              {mode === 'sign-in' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
          <p className="mt-4 text-center text-xs text-gray-500">
            100% Free · Email & Password · No magic link required
          </p>
        </div>
      </div>
    </main>
  )
}
