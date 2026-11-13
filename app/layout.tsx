import type { Metadata } from 'next'
import CookieConsent from './CookieConsent'
import AnalyticsGate from './AnalyticsGate'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://cvdating.app' : process.env.NEXT_PUBLIC_APP_URL || 'https://cvdating.app'),
  title: {
    default: 'CV Dating — Online Chat, Dating & Language Exchange Without Swiping',
    template: '%s | CV Dating',
  },
  description: 'CV Dating connects adults through shared stories, not swipe fatigue. Get 4 curated daily introductions for serious dating, friendship, language exchange, and career connections with a private 24-hour conversation.',
  keywords: [
    'cv dating',
    'cv dating app',
    'resume dating',
    'no swipe dating app',
    'hellotalk alternative',
    'online chat for adults',
    'meet girls online',
    'meet women online',
    'language exchange app',
    'slow dating app',
    'serious dating app',
    'meet singles online',
    'make friends online',
    'international dating',
    'kpop dating',
    'anime dating',
    'goth dating',
    'dating for professionals',
    'free online chat',
  ],
  applicationName: 'CV Dating',
  category: 'social networking',
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
    title: 'CV Dating — Meet Beyond the Swipe',
    description: 'Get up to four automatic introductions each day for dating, friendship, and language exchange with a 24-hour private conversation.',
    url: 'https://cvdating.app',
    siteName: 'CV Dating',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Dating — Meet Beyond the Swipe',
    description: 'Dating, friendship, and language exchange without swiping. Up to 4 automatic daily introductions.',
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
        <meta name="theme-color" content="#0E0A1A" />
      </head>
      <body className="bg-app text-text-main font-sans min-h-screen">
        {children}
        <CookieConsent />
        <AnalyticsGate />
      </body>
    </html>
  )
}
