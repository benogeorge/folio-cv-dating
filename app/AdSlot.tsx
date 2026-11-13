'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { hasAdvertisingConsent } from './CookieConsent'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
const homeSlotId = process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT
const cmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === 'true'

export default function AdSlot() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const refresh = () => setAllowed(hasAdvertisingConsent())
    refresh()
    window.addEventListener('cvd-consent-change', refresh)
    return () => window.removeEventListener('cvd-consent-change', refresh)
  }, [])

  if (!clientId || !homeSlotId || !cmpReady || !allowed) return null

  return (
    <aside aria-label="Advertisement" className="mx-auto my-8 min-h-24 max-w-5xl px-6 sm:px-10">
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.16em] text-[#73776e]">Advertisement</p>
      <ins className="adsbygoogle block min-h-24 w-full" style={{ display: 'block' }} data-ad-client={clientId} data-ad-slot={homeSlotId} data-ad-format="auto" data-full-width-responsive="true" />
      <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`} crossOrigin="anonymous" strategy="afterInteractive" onReady={() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch { /* AdSense may decline to fill this request. */ } }} />
    </aside>
  )
}
