import type { Metadata } from 'next'
import CookieConsent from './CookieConsent'
import AnalyticsGate from './AnalyticsGate'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cvdating.app'),
  title: {
    default: 'Free Residential Lease Agreement Generator | State-Compliant Legal Templates 2025',
    template: '%s | StateLeaseLegal',
  },
  description: 'Generate free, state-compliant residential lease agreements and rental contracts in under 2 minutes. No subscription, no credit card required, instant clean PDF download for all 50 US states.',
  keywords: [
    'free lease agreement',
    'residential lease agreement generator',
    'state residential lease template',
    'free rental agreement',
    'california lease agreement template',
    'texas lease agreement free',
    'florida rental agreement form',
    'standard residential lease agreement',
    'month to month lease agreement',
    'landlord tenant legal documents',
    'free room rental agreement',
    'no paywall lease generator'
  ],
  applicationName: 'StateLeaseLegal',
  category: 'real estate legal utilities',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Free Residential Lease Agreement Generator — 100% Free PDF',
    description: 'Instant, state-specific residential rental contracts compliant with California, Texas, Florida, New York, and all US landlord-tenant statutes. Zero paywall.',
    url: 'https://cvdating.app',
    siteName: 'StateLeaseLegal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Residential Lease Agreement Generator (PDF)',
    description: 'Download standard, state-compliant residential lease agreements for free. No credit card or trial required.',
  },
  alternates: {
    canonical: 'https://cvdating.app',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#13231a" />
      </head>
      <body className="bg-[#f7f9f6] text-[#1c291f] font-sans min-h-screen">
        {children}
        <CookieConsent />
        <AnalyticsGate />
      </body>
    </html>
  )
}
