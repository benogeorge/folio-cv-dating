import type { Metadata } from 'next'
import CookieConsent from './CookieConsent'
import AnalyticsGate from './AnalyticsGate'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cvdating.app'),
  title: {
    default: 'NoSwipe – Free Dating App & Online Chat Without Swiping | Tinder Alternative',
    template: '%s | NoSwipe',
  },
  description: 'NoSwipe is a free no-swipe dating app. Meet people online for dating, friendship and language exchange. The best Tinder alternative, Bumble alternative and HelloTalk alternative. Works in USA, UK, Canada, Australia and worldwide.',
  keywords: [
    'no swipe dating app',
    'tinder alternative',
    'bumble alternative',
    'hinge alternative',
    'meet people online',
    'online dating free',
    'chat with strangers',
    'meet girls online',
    'meet women online',
    'meet men online',
    'language exchange app',
    'hellotalk alternative',
    'slow dating app',
    'serious dating app',
    'dating app without swiping',
    'free online chat',
    'dating app uk',
    'dating app usa',
    'dating app australia',
    'dating app canada',
    'make friends online',
    'international dating app',
    'kpop dating app',
    'anime dating app',
    'gaming dating app',
    'dating for professionals',
    'meet singles online',
    'online chat rooms',
    'dating without swiping',
    'noswipe',
  ],
  applicationName: 'NoSwipe',
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
    title: 'NoSwipe – Free Dating App Without Swiping | Tinder Alternative',
    description: 'Fed up with swiping? NoSwipe matches you with real people for dating, friendship and language exchange. Free. No photo queue. Works worldwide.',
    url: 'https://cvdating.app',
    siteName: 'NoSwipe',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoSwipe – No Swipe Dating App | Tinder Alternative',
    description: 'Meet people online without swiping. Free dating app for dating, friendship and language exchange worldwide.',
  },
  alternates: {
    canonical: 'https://cvdating.app',
    languages: {
      'en-US': 'https://cvdating.app',
      'en-GB': 'https://cvdating.app',
      'en-AU': 'https://cvdating.app',
      'en-CA': 'https://cvdating.app',
      'x-default': 'https://cvdating.app',
    },
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
