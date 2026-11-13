import type { Metadata } from 'next'
import CookieConsent from './CookieConsent'
import AnalyticsGate from './AnalyticsGate'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://cvdating.app' : process.env.NEXT_PUBLIC_APP_URL || 'https://cvdating.app'),
  title: {
    default: 'MeetByStory — Online Chat, Dating & Friends Without Swiping',
    template: '%s | MeetByStory',
  },
  description: 'No-swipe dating, private online chat, friendship, love and language exchange for adults of all genders and backgrounds. Meet through automatic introductions and a full 24-hour conversation.',
  keywords: ['no swipe dating app', 'private online chat for adults', 'meet singles online', 'make friends online', 'language exchange app', 'serious dating app', 'international dating'],
  applicationName: 'MeetByStory',
  category: 'social networking',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'MeetByStory — Meet Beyond the Swipe',
    description: 'Up to four introductions selected for you. Conversations begin automatically and stay open through a 24-hour introduction period.',
    type: 'website',
    siteName: 'MeetByStory',
    locale: 'en_GB',
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
