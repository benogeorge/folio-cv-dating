'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-app flex flex-col items-center justify-center px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <svg width="40" height="40" viewBox="0 0 52 52" fill="none" className="mb-3">
            <defs><linearGradient id="lg" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#818CF8"/></linearGradient></defs>
            <polygon points="26,3 50,15 50,37 26,49 2,37 2,15" fill="url(#lg)"/>
            <text x="26" y="32" textAnchor="middle" fill="#0E0A1A" fontFamily="DM Sans" fontWeight="700" fontSize="14">F</text>
          </svg>
          <h1 className="text-3xl font-bold">FOLIO</h1>
        </div>

        {sent ? (
          <div className="folio-card p-8 text-center">
            <div className="text-5xl mb-4">📬</div>
            <h2 className="text-xl font-bold mb-2">Check your inbox</h2>
            <p className="text-text-muted text-sm">We sent a magic link to <strong className="text-primary">{email}</strong>. Click it to sign in — no password needed.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-text-muted text-sm underline">Use a different email</button>
          </div>
        ) : (
          <div className="folio-card p-8">
            <h2 className="text-xl font-bold mb-1">Welcome back</h2>
            <p className="text-text-muted text-sm mb-6">Enter your email — we&apos;ll send a magic link.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                className="input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              {error && <p className="text-error text-sm">{error}</p>}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send magic link ✨'}
              </button>
            </form>
            <p className="text-text-muted text-xs text-center mt-4">
              New here? Same link — we&apos;ll set up your Folio after.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
