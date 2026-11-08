'use client'
import Link from 'next/link'
import { Flame, Clock, Sparkles, ArrowRight, ShieldCheck, FileText, ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="bg-[#0E0A1A] text-[#FAF8FF] min-h-screen selection:bg-[#C084FC]/30 selection:text-[#FAF8FF]">
      {/* Mobile-constrained Luxury Broadsheet Container */}
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-[#0E0A1A] border-x border-[#1A1428] shadow-2xl pb-24">
        
        {/* Editorial Top Masthead */}
        <header className="px-6 py-5 border-b border-[#231B36] flex items-center justify-between sticky top-0 bg-[#0E0A1A]/95 backdrop-blur-md z-40">
          <div className="flex items-center gap-2 text-[#F59E0B] text-xs font-bold tracking-wider">
            <Flame size={16} />
            <span>DAY 1 · EDITION 04</span>
          </div>

          <div className="text-center">
            <span className="font-serif tracking-[0.25em] text-lg font-bold text-white block">FOLIO</span>
            <span className="text-[9px] font-mono tracking-widest text-[#9CA3AF] uppercase block -mt-0.5">The Human Network</span>
          </div>

          <Link href="/auth" className="text-xs font-semibold text-[#C084FC] hover:text-white transition-colors">
            Sign In
          </Link>
        </header>

        {/* Lead Volume Banner */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] font-mono mb-2">
            <span>VOLUME 01 // LONDON & GLOBAL</span>
            <span className="text-[#F97316] font-semibold flex items-center gap-1">
              <Clock size={12} /> 24H WINDOW
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-white leading-snug">
            Curated Minds.<br />
            <span className="italic font-normal text-[#C084FC]" style={{ fontFamily: 'Playfair Display, serif' }}>
              No Swipes. Just Real Work.
            </span>
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed font-sans">
            Every morning at 9:00 AM, our heuristic vector engine presents 4 people whose trajectory and values align with yours. 
            Review their work, annotations, and character before connection.
          </p>
        </div>

        {/* Primary Feature Match: Tactile Cream Card (Elena Vance) */}
        <section className="px-5 my-2">
          <div className="bg-[#FAF7F2] text-[#1C181D] rounded-2xl p-5 shadow-xl border border-[#E8E2D8] relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#5D5764] bg-[#E8E2D8]/60 px-2 py-0.5 rounded">
                CANDIDATE // 01 OF 04
              </span>
              <span className="text-[10px] font-mono font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-full">
                23H REMAINING
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1C181D] leading-tight">
                  Elena Vance, 31
                </h2>
                <p className="text-xs font-sans text-[#5D5764] mt-0.5">
                  Urban Systems Director · London & Zurich
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#1C181D] text-[#FAF7F2] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                EV
              </div>
            </div>

            {/* Trajectory Timeline */}
            <div className="border-y border-[#E8E2D8] py-3 my-3 flex flex-col gap-2">
              <span className="text-[9px] font-mono tracking-wider uppercase text-[#5D5764] font-bold">
                Career Trajectory & Anchors
              </span>
              <div className="text-xs font-sans text-[#1C181D] flex flex-col gap-1.5">
                <div className="flex gap-2 items-baseline">
                  <span className="font-mono text-[10px] text-[#5D5764] shrink-0">2019–2022</span>
                  <span>Senior Associate, Foster + Partners (Infrastructure)</span>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="font-mono text-[10px] text-[#5D5764] shrink-0">2022–NOW</span>
                  <span className="font-semibold">Founding Partner, Atelier Terracotta</span>
                </div>
              </div>
            </div>

            {/* Editorial Pull Quote */}
            <blockquote className="my-3 italic text-xs text-[#1C181D]/90 font-serif leading-relaxed border-l-2 border-[#1C181D] pl-3 py-0.5">
              &ldquo;I believe the architecture we build in our thirties should outlive our personal egos by at least a century.&rdquo;
            </blockquote>

            {/* Chapter Prompt */}
            <div className="bg-[#EFEAE1] p-3 rounded-xl my-3">
              <span className="text-[9px] font-mono text-[#5D5764] uppercase block mb-1">
                Chapter Prompt: What I&apos;m Seeking
              </span>
              <p className="text-xs font-sans text-[#1C181D]">
                Someone who builds with disciplined intensity by day, but protects their evening conversations without distraction.
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <Link href="/auth" className="py-2.5 rounded-xl border border-[#1C181D]/20 hover:bg-[#1C181D]/5 text-xs font-semibold text-center text-[#1C181D] transition-colors">
                Pass Tactfully
              </Link>
              <Link href="/auth" className="py-2.5 rounded-xl bg-[#1C181D] hover:bg-[#2E2830] text-xs font-bold text-center text-[#FAF7F2] transition-colors flex items-center justify-center gap-1">
                <span>Continue</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* Secondary Match Strip */}
        <section className="px-5 mt-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#9CA3AF]">
              REMAINING DAILY DOSSIERS
            </span>
            <span className="text-[10px] font-mono text-[#C084FC]">3 PENDING</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Card 2 */}
            <div className="folio-card p-4 flex items-center justify-between hover:border-[#C084FC]/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Julian Mercer, 34</span>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">Oxford</span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Principal Scientist in Genomics & Longevity</p>
              </div>
              <Link href="/auth" className="px-3 py-1.5 rounded-full bg-[#231B36] text-xs font-semibold text-[#FAF8FF] hover:bg-[#C084FC] hover:text-[#0E0A1A] transition-colors flex items-center gap-1">
                <span>Review</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="folio-card p-4 flex items-center justify-between hover:border-[#C084FC]/50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Sora Takahashi, 29</span>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">Tokyo / Paris</span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-0.5">Type Foundry Founder & Generative Technologist</p>
              </div>
              <Link href="/auth" className="px-3 py-1.5 rounded-full bg-[#231B36] text-xs font-semibold text-[#FAF8FF] hover:bg-[#C084FC] hover:text-[#0E0A1A] transition-colors flex items-center gap-1">
                <span>Review</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* The 30-Day Philosophy */}
        <section className="px-6 py-6 border-t border-[#231B36] text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1428] border border-[#231B36] text-[10px] font-mono uppercase text-[#C084FC] mb-3">
            <ShieldCheck size={12} /> The 30-Day Progressive Protocol
          </div>
          <p className="font-serif italic text-sm text-[#FAF8FF]/80 leading-relaxed mb-2">
            &ldquo;Conversations that ripen in depth rather than disposable speed.&rdquo;
          </p>
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            Mutual Continues unlock a daily thread. Real names and photos unlock at Day 7. Full archives at Day 14. Permanent connection confirmed at Day 30.
          </p>

          <Link href="/auth" className="btn-primary mt-6 !w-full py-3.5 text-sm font-bold block">
            Begin Your Folio — Upload CV
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-[#1A1428] text-[10px] font-mono text-[#9CA3AF]">
          FOLIO TECHNOLOGIES // cvdating.app
        </footer>
      </div>
    </main>
  )
}
