import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FOLIO — Your story. Their story. The beginning of one.',
  description: 'Upload your CV. Meet ambitious people. 4 real matches every morning. No swipes, no filters, no AI — just your work and 30 days to find out.',
  keywords: 'cv dating app, professional dating, anonymous dating, slow dating, meet people, no swipe dating',
  openGraph: {
    title: 'FOLIO',
    description: 'CV-powered connections. 4 real people. Every morning.',
    type: 'website',
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
      </body>
    </html>
  )
}
