'use client'
import { useState } from 'react'
import { Check, Sparkles, Shield, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SubscriptionPage() {
  const router = useRouter()
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    setLoading(plan)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Payment gateway setup required')
      }
    } catch {
      alert('Error initiating checkout')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="px-5 py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-primary">Elevate Your Folio</h1>
        <p className="text-text-muted text-sm">Targeted exposure, double drops, and zero limits</p>
      </div>

      {/* Interval Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-card p-1 rounded-full border border-border flex gap-1">
          <button
            onClick={() => setInterval('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              interval === 'monthly' ? 'bg-primary text-app shadow' : 'text-text-muted'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('yearly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              interval === 'yearly' ? 'bg-primary text-app shadow' : 'text-text-muted'
            }`}
          >
            Yearly (Save 40%)
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-4">
        {/* FOLIO+ */}
        <div className="folio-card p-5 relative border-primary/40 bg-card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-text-main">FOLIO+</h3>
              <p className="text-xs text-text-muted">For intentional networking & dating</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-primary">
                {interval === 'monthly' ? '£9.99' : '£69.99'}
              </span>
              <span className="text-[10px] text-text-muted block">/{interval === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2 my-4 text-xs text-text-main">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-primary shrink-0" /> 8 Daily Curated Matches (Double Drop)
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-primary shrink-0" /> 3 Active 30-Day Threads Simultaneously
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-primary shrink-0" /> Unlimited daily chat messages
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-primary shrink-0" /> See who passed on your Folio
            </li>
          </ul>

          <button
            onClick={() => handleCheckout('plus')}
            disabled={loading === 'plus'}
            className="btn-primary py-2.5 text-sm"
          >
            {loading === 'plus' ? 'Redirecting...' : 'Upgrade to FOLIO+'}
          </button>
        </div>

        {/* FOLIO PRO */}
        <div className="folio-card p-5 relative border-gold/40 bg-card">
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold bg-gold/20 text-gold px-2 py-0.5 rounded-full">
            VIP
          </div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-text-main">FOLIO Pro</h3>
              <p className="text-xs text-text-muted">Maximum velocity & algorithmic priority</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gold">
                {interval === 'monthly' ? '£24.99' : '£179.99'}
              </span>
              <span className="text-[10px] text-text-muted block">/{interval === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2 my-4 text-xs text-text-main">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-gold shrink-0" /> 12 Daily Matches
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-gold shrink-0" /> Accelerated Reveals (Day 3 instead of 7)
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-gold shrink-0" /> Folio Spotlight (Featured once per week)
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-gold shrink-0" /> Direct LinkedIn/Contact export
            </li>
          </ul>

          <button
            onClick={() => handleCheckout('pro')}
            disabled={loading === 'pro'}
            className="w-full bg-gold hover:bg-gold/90 text-app font-bold rounded-full py-2.5 text-sm transition-all"
          >
            {loading === 'pro' ? 'Redirecting...' : 'Get FOLIO Pro'}
          </button>
        </div>
      </div>
    </div>
  )
}
