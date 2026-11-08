import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-app flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="flex flex-col items-center pt-8 animate-fade-in">
        <div className="mb-3">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <defs>
              <linearGradient id="logo-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
            <polygon points="26,3 50,15 50,37 26,49 2,37 2,15" fill="url(#logo-g)" />
            <text x="26" y="32" textAnchor="middle" fill="#0E0A1A" fontFamily="DM Sans" fontWeight="700" fontSize="14">F</text>
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-text-main tracking-tight">FOLIO</h1>
        <p className="text-primary/80 text-sm font-medium mt-1 tracking-widest uppercase">By your story</p>
      </div>

      {/* Hero text */}
      <div className="flex flex-col items-center text-center animate-slide-up">
        <h2 className="text-3xl font-bold text-text-main leading-tight mb-3">
          Your story.<br />
          <span style={{fontFamily:'Playfair Display,serif',fontStyle:'italic',color:'#C084FC'}}>Their story.</span><br />
          The beginning of one.
        </h2>
        <p className="text-text-muted text-base leading-relaxed max-w-sm mb-8">
          Upload your CV. Get matched with 4 real people every morning.
          No swipes. No filters. 30 days to find out if it&apos;s real.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[
            { icon: '📄', label: 'CV-powered' },
            { icon: '🎭', label: 'Anonymous' },
            { icon: '⏳', label: '30-day reveal' },
            { icon: '🧠', label: 'Smart matching' },
            { icon: '🔒', label: 'Fully private' },
          ].map(f => (
            <span key={f.label} className="chip text-sm py-1.5 px-4">{f.icon} {f.label}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          <Link href="/auth" className="btn-primary text-center">
            Get started — it&apos;s free
          </Link>
          <Link href="/auth" className="btn-ghost text-center">
            Sign in
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-text-muted text-xs text-center animate-fade-in">
        Gender-inclusive · Dating, friends, collab, mentorship<br />
        <span className="text-primary/60">4 people. Every morning. 9AM.</span>
      </div>
    </main>
  )
}
