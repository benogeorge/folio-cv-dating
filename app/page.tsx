import type { Metadata } from 'next'
import Link from 'next/link'
import { FileCheck, Shield, Download, CheckCircle, Scale, Building2, Sparkles, Calculator, ArrowRight, DollarSign } from 'lucide-react'
import RealEstateHub from '@/components/RealEstateHub'
import { STATE_LAWS } from '@/lib/stateLaws'

export const metadata: Metadata = {
  title: 'RealEstateLegal & Tools | Free Lease Agreements, Airbnb Optimizer & Deal Calculator',
  description: 'Free, professional real estate tools for landlords, Airbnb hosts, and investors. Generate state-compliant lease agreements (PDF), optimize short-term rental listings, and calculate rental ROI with zero paywalls.',
  alternates: { canonical: 'https://cvdating.app' },
}

const faqs = [
  {
    q: 'What real estate tools are included on this platform?',
    a: 'We offer an integrated suite: 1) A 100% Free State Residential Lease Agreement Generator with instant PDF export, 2) An Airbnb & Vrbo Listing Optimizer to boost ranking and bookings, 3) A Rental Deal & Cash-on-Cash ROI Calculator, and 4) Guides on remote co-hosting, wholesaling, and real estate income methods.',
  },
  {
    q: 'Is the residential lease agreement really free without hidden fees?',
    a: 'Yes. Unlike services like LawDepot or eForms that trap you in a 20-minute form before demanding a $45/month recurring subscription, our tool compiles and downloads your legal state-specific agreement instantly in your browser with zero paywalls, zero accounts, and zero watermarks.',
  },
  {
    q: 'How does the Airbnb Listing Optimizer improve my booking rate?',
    a: 'It formats your title and bulleted descriptions based on high-converting keywords that the Airbnb search algorithm rewards (e.g. fiber WiFi speed, workstation amenities, self check-in, key location proximity). It also provides dynamic pricing advice tailored to your target guest type.',
  },
  {
    q: 'Are the generated lease contracts compliant with state regulations?',
    a: 'Yes. The generator dynamically references statutory codes across all 50 states (such as California AB 12, Texas Property Code 92, and Florida Statutes 83) and automatically injects statutory disclosures including Lead-Based Paint, deposit holding requirements, and statutory termination notice periods.',
  },
]

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RealEstateLegal - Free Landlord, Host & Investor Suite',
    url: 'https://cvdating.app',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    description: 'Free suite of real estate tools: State Residential Lease Agreement Generator (PDF), Airbnb Listing Optimizer, and Rental Deal ROI Calculator.',
  }

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#1c291f] selection:bg-[#d8e6d6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

      {/* HEADER / NAV */}
      <header className="border-b border-[#e2eae0] bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-[#162f1c]">
            <Building2 size={24} className="text-[#2b6135]" />
            <span>RealEstate<span className="text-[#2b6135]">Suite</span></span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#415344]">
            <a href="#tools" className="hidden sm:inline-block hover:text-[#18311e]">All Tools</a>
            <a href="#state-laws" className="hidden sm:inline-block hover:text-[#18311e]">State Laws</a>
            <a href="#faq" className="hidden sm:inline-block hover:text-[#18311e]">FAQ</a>
            <a
              href="#tools"
              className="rounded-lg bg-[#25542c] px-4 py-2 font-bold text-white shadow-sm transition hover:bg-[#1c4021]"
            >
              Open Tools (100% Free)
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#13231a] px-6 py-14 text-white sm:px-10 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b7d6bb]">
            <CheckCircle size={14} /> Free Landlord, Host & Investor Suite
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Real Estate Tools That Scale.<br />
            <span className="text-[#8ec293]">Lease Agreements. Airbnb Optimizer. Deal ROI.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#d1ded2] sm:text-lg">
            Create state-compliant residential lease agreements (PDF), optimize short-term Airbnb listings for maximum bookings, and underwrite rental cash flow in seconds with zero paywalls.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#b8d1b9]">
            <span className="flex items-center gap-1.5"><Download size={15} /> Instant PDF Lease Download</span>
            <span className="flex items-center gap-1.5"><Sparkles size={15} /> Airbnb Algorithmic Optimizer</span>
            <span className="flex items-center gap-1.5"><Calculator size={15} /> Cap Rate & Cash-on-Cash Calculator</span>
            <span className="flex items-center gap-1.5"><Shield size={15} /> State Statutory Disclosures Included</span>
          </div>
        </div>
      </section>

      {/* MAIN TOOLS TABS COMPONENT */}
      <section id="tools" className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <RealEstateHub />
      </section>

      {/* THREE PILLARS OVERVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2f633a]">Built for Operators</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#162b1c] sm:text-4xl">
            Everything You Need to Manage & Monetize Real Estate
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#536555]">
            Whether you manage 1 unit or 50 doors, our free web tools replace expensive software suites.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#d8ded6] bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ebf4ea] text-[#295b31]">
              <FileCheck size={22} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#152a1b]">Compliant Lease Generator</h3>
            <p className="mt-2 text-sm leading-6 text-[#58695a]">
              Generates clean, customized residential lease agreements with state-mandated disclosures for California, Texas, Florida, New York, and all 50 states.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ded6] bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ebf4ea] text-[#295b31]">
              <Sparkles size={22} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#152a1b]">Airbnb Listing Optimizer</h3>
            <p className="mt-2 text-sm leading-6 text-[#58695a]">
              Craft high-converting titles, target specific guest segments (nomads, families, couples), and apply dynamic pricing tactics to maximize occupancy.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ded6] bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ebf4ea] text-[#295b31]">
              <DollarSign size={22} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#152a1b]">Rental ROI & Job Blueprints</h3>
            <p className="mt-2 text-sm leading-6 text-[#58695a]">
              Analyze net monthly cash flow before purchasing, or leverage remote co-hosting and wholesaling strategies to earn income with zero initial capital.
            </p>
          </div>
        </div>
      </section>

      {/* STATE LAW DIRECTORY */}
      <section id="state-laws" className="border-t border-[#e2ebe0] bg-[#f2f6f1] py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2f633a]">Statutory Reference</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#162b1c]">
            US Landlord-Tenant Statutory Requirements
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-[#546757]">
            Review statutory rules regarding maximum security deposits, notice periods, and required written lease notices across major US states:
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(STATE_LAWS).map((law) => (
              <div key={law.code} className="rounded-xl border border-[#d8ded6] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e9f0e8] pb-3">
                  <h3 className="font-bold text-[#172b1d]">{law.state} ({law.code})</h3>
                  <span className="rounded bg-[#ebf2ea] px-2 py-0.5 text-[11px] font-semibold text-[#285731]">
                    {law.statuteCitation}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs text-[#4b5b4e]">
                  <p><strong>Max Deposit:</strong> {law.maxDeposit}</p>
                  <p><strong>Notice Period:</strong> {law.noticePeriod}</p>
                  <p><strong>Grace Period:</strong> {law.gracePeriod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-16 sm:px-10 md:py-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2f633a]">FAQ</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#162b1c]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-[#d8ded6] bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#172d1e]">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-[#526454]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e2eae0] bg-white py-8 text-center text-xs text-[#6a7c6c]">
        <p>© 2025 RealEstateSuite. All Rights Reserved. Generated documents and models are for informational and contractual drafting purposes.</p>
        <p className="mt-1">Compliant residential lease agreements, Airbnb listing optimization, and real estate cash flow calculators.</p>
      </footer>
    </main>
  )
}
