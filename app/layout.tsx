import type { Metadata } from 'next'
import CookieConsent from './CookieConsent'
import AnalyticsGate from './AnalyticsGate'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cvdating.app'),
  title: {
    default: 'Free Lease Agreement Generator 2025 | State-Compliant PDF Templates — RealEstateSuite',
    template: '%s | RealEstateSuite — Free Real Estate Tools',
  },
  description: 'Free state-compliant lease agreements, Airbnb listing optimizer & rental ROI calculator. No paywall, no account, instant PDF. Used by landlords, Airbnb hosts & investors across all 50 US states.',
  keywords: [
    // Core lease keywords
    'free lease agreement',
    'free lease agreement generator',
    'residential lease agreement',
    'residential lease agreement template',
    'free rental agreement',
    'rental agreement generator',
    'lease agreement PDF free download',
    'standard lease agreement',
    'month to month lease agreement',
    'month to month rental agreement',
    'simple lease agreement',
    'blank lease agreement',
    'printable lease agreement',
    'landlord tenant agreement',
    'room rental agreement',
    'free room rental agreement',
    // State-specific
    'california lease agreement',
    'california residential lease agreement',
    'texas lease agreement',
    'texas rental agreement',
    'florida lease agreement',
    'florida rental agreement',
    'new york lease agreement',
    'illinois lease agreement',
    'georgia lease agreement',
    'ohio lease agreement',
    'pennsylvania lease agreement',
    'washington state lease agreement',
    'north carolina lease agreement',
    // Airbnb
    'airbnb listing optimizer',
    'airbnb listing tips',
    'airbnb title generator',
    'airbnb host tools',
    'short term rental optimizer',
    'vrbo listing tips',
    // ROI / investing
    'rental property ROI calculator',
    'cash on cash return calculator',
    'cap rate calculator',
    'rental cash flow calculator',
    'real estate deal calculator',
    // Landlord tools
    'landlord tools free',
    'landlord legal documents',
    'tenant screening',
    'property management tools',
    'no paywall lease generator',
    'free landlord forms',
    // vs competitors
    'lawdepot alternative free',
    'eforms alternative',
    'free alternative to lawdepot',
  ],
  applicationName: 'RealEstateSuite',
  category: 'real estate tools',
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
    title: 'Free Lease Agreement Generator + Airbnb Optimizer + ROI Calculator — RealEstateSuite',
    description: 'Free state-compliant lease agreements (CA, TX, FL, NY + all 50 states), Airbnb listing optimizer, and rental ROI calculator. No paywall, no account, instant PDF download.',
    url: 'https://cvdating.app',
    siteName: 'RealEstateSuite',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RealEstateSuite — Free Lease Agreement Generator & Landlord Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lease Agreement Generator 2025 — No Paywall, Instant PDF',
    description: 'State-compliant residential lease agreements for all 50 US states. Plus Airbnb optimizer & rental ROI calculator. 100% free.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://cvdating.app',
  },
  verification: {
    google: 'google-site-verification',
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
