'use client'

import { useEffect, useState } from 'react'

const CONSENT_KEY = 'cvd_cookie_preferences'
type Preferences = { analytics: boolean; advertising: boolean }

function readPreferences(): Preferences | null {
  try {
    const saved = localStorage.getItem(CONSENT_KEY) ?? document.cookie.split('; ').find((item) => item.startsWith(`${CONSENT_KEY}=`))?.slice(CONSENT_KEY.length + 1)
    return saved ? JSON.parse(saved) as Preferences : null
  } catch {
    return null
  }
}

export function hasAnalyticsConsent() {
  return readPreferences()?.analytics === true
}

export function hasAdvertisingConsent() {
  return readPreferences()?.advertising === true
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = readPreferences()
    setPreferences(saved)
    if (!saved) setOpen(true)
  }, [])

  function save(next: Preferences) {
    const value = JSON.stringify(next)
    localStorage.setItem(CONSENT_KEY, value)
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`
    setPreferences(next)
    setOpen(false)
    window.dispatchEvent(new Event('cvd-consent-change'))
  }

  if (preferences && !open) {
    return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-3 left-3 z-40 rounded-full border border-[#d8d8d0] bg-white px-3 py-2 text-xs text-[#374238] shadow-sm">Cookie settings</button>
  }

  return (
    <section aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-[#d8d8d0] bg-white p-5 text-[#28342a] shadow-xl sm:inset-x-auto sm:right-5 sm:bottom-5">
      <h2 className="text-base font-semibold">Your privacy choices</h2>
      <p className="mt-2 text-sm leading-5 text-[#536055]">Necessary storage keeps sign-in and security working. Optional analytics help us understand site visits. Advertising cookies are not active; we do not load ad trackers.</p>
      {open && preferences && <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={preferences.analytics} onChange={(event) => setPreferences({ ...preferences, analytics: event.target.checked })} /> Optional analytics</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={preferences.advertising} onChange={(event) => setPreferences({ ...preferences, advertising: event.target.checked })} /> Advertising cookies (not active)</label>
      </div>}
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {preferences ? <button type="button" onClick={() => save(preferences)} className="rounded-full border border-[#9ba69a] px-4 py-2 text-sm">Save choices</button> : null}
        <button type="button" onClick={() => save({ analytics: false, advertising: false })} className="rounded-full border border-[#9ba69a] px-4 py-2 text-sm">Necessary only</button>
        <button type="button" onClick={() => save({ analytics: true, advertising: true })} className="rounded-full bg-[#345b40] px-4 py-2 text-sm font-semibold text-white">Accept all</button>
        {!preferences && <button type="button" onClick={() => setPreferences({ analytics: false, advertising: false })} className="rounded-full px-3 py-2 text-sm underline underline-offset-2">Customize</button>}
      </div>
    </section>
  )
}
