'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Sparkles, Clock, CheckCircle2, FileText, Lock, Users, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0714] text-[#FAF8FF] selection:bg-primary selection:text-app relative overflow-hidden">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-purple-600/20 via-primary/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[800px] -right-40 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-500 p-[1px]">
            <div className="w-full h-full bg-[#0A0714] rounded-[11px] flex items-center justify-center">
              <span className="font-black text-lg text-primary tracking-tighter">F</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">FOLIO</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#psychology" className="hover:text-white transition-colors">The 30-Day Rule</a>
          <a href="#security" className="hover:text-white transition-colors">Privacy & Shield</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth" className="px-4 py-2 text-sm font-semibold text-text-muted hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/auth" className="px-5 py-2.5 rounded-full text-sm font-bold bg-primary text-[#0A0714] hover:bg-primary-dark transition-all shadow-glow-sm">
            Launch Folio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-8 animate-fade-in">
          <Sparkles size={14} /> The Anti-Swipe Professional & Social Connection Network
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Stop swiping on selfies.<br />
          <span className="bg-gradient-to-r from-primary via-purple-300 to-indigo-300 bg-clip-text text-transparent" style={{fontFamily: 'Playfair Display, serif', fontStyle: 'italic'}}>
            Connect on intellect & story.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-10">
          Upload your CV. Receive exactly <strong>4 curated introductions every morning at 9:00 AM</strong>.
          Anonymous by default. 30 days of progressive unlock before permanent identity reveals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link href="/auth" className="btn-primary !w-auto px-8 py-4 flex items-center justify-center gap-2 text-base font-bold shadow-glow">
            Upload CV & Get Matched <ArrowRight size={18} />
          </Link>
          <Link href="/auth" className="btn-ghost !w-auto px-6 py-4 text-base">
            Explore Experience
          </Link>
        </div>

        {/* Live UI Mockup Preview Card */}
        <div className="max-w-md mx-auto folio-card p-6 text-left border border-primary/30 shadow-2xl relative group hover:border-primary/50 transition-all">
          <div className="absolute -top-3 right-6 bg-coral text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={10} /> 23h 14m Left
          </div>

          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-primary p-[1.5px]">
              <div className="w-full h-full bg-[#120D22] rounded-[14px] flex items-center justify-center font-bold text-primary">
                AV
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Arctic_Volta_88</h3>
              <p className="text-xs text-text-muted">London, UK · Tech & Architecture</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="badge badge-dating">🔴 Dating</span>
            <span className="badge badge-collab">🟡 Co-founder</span>
            <span className="chip">Product Design</span>
            <span className="chip">Distributed Systems</span>
          </div>

          <div className="bg-[#0D091B] p-3.5 rounded-xl border border-white/5 mb-5">
            <p className="text-xs text-text-muted mb-1">Chapter Prompt: Professional Plot Twist</p>
            <p className="text-sm italic text-white/90 font-medium">
              &ldquo;Left medical school in year 3 to build autonomous aerospace software. Never looked back.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-xs font-semibold text-text-muted">
              Pass
            </button>
            <button className="py-2.5 rounded-xl bg-primary text-app text-xs font-bold hover:bg-primary-dark">
              Continue (1 of 4)
            </button>
          </div>
        </div>
      </section>

      {/* Behavioral Psychology Feature Grid */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.06] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Engineered for Depth, Not Dopamine Traps</h2>
          <p className="text-text-muted text-base max-w-xl mx-auto">
            Traditional apps profit on keeping you single and swiping forever. FOLIO utilizes constrained interaction psychology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="folio-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">The 4-Match Drop Rule</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                No infinite feed. Every morning at 9:00 AM, our heuristic vector engine presents 4 candidates. You have 24 hours to review or forfeit. Scarcity forces intentional evaluation.
              </p>
            </div>
            <span className="text-xs font-bold text-primary mt-6 block">9:00 AM Daily Ritual →</span>
          </div>

          <div className="folio-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">30-Day Progressive Reveal</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Connect anonymously first. Day 7 unlocks first names and photos. Day 14 reveals full CVs. Day 30 permanently confirms connection or gracefully ends it without ghosting.
              </p>
            </div>
            <span className="text-xs font-bold text-gold mt-6 block">Intimacy Ladder System →</span>
          </div>

          <div className="folio-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">Enterprise-Grade Privacy</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Your uploaded resume is parsed for skills, trajectory, and passion tags. Employer names and confidential coordinates remain encrypted until mutual progressive milestones.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-400 mt-6 block">Zero Surface Doxxing →</span>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
        <div className="folio-card p-12 bg-gradient-to-b from-[#18112C] to-[#0E0A1A] border-primary/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to meet people who match your ambition?</h2>
          <p className="text-text-muted text-base max-w-lg mx-auto mb-8">
            Create your anonymous Folio profile in under 2 minutes. Your first drop arrives tomorrow morning.
          </p>
          <Link href="/auth" className="btn-primary !w-auto px-8 py-4 inline-flex items-center gap-2 font-bold shadow-glow text-base">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.06] py-8 text-center text-xs text-text-muted">
        <p>© 2026 FOLIO Technologies Inc. All rights reserved. Registered on cvdating.app</p>
      </footer>
    </main>
  )
}
