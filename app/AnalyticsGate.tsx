'use client'

import { Analytics } from '@vercel/analytics/next'
import { hasAnalyticsConsent } from './CookieConsent'

export default function AnalyticsGate() {
  return <Analytics beforeSend={(event) => hasAnalyticsConsent() ? event : null} />
}
