'use client'

import React, { useState } from 'react'
import { 
  Building2, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  Calculator, 
  ShieldCheck, 
  ArrowRight,
  Copy,
  ExternalLink
} from 'lucide-react'
import LeaseGenerator from './LeaseGenerator'

export default function RealEstateHub() {
  const [activeTab, setActiveTab] = useState<'lease' | 'airbnb' | 'roi' | 'methods'>('lease')

  // Airbnb Optimizer State
  const [abCity, setAbCity] = useState('Miami, FL')
  const [abType, setAbType] = useState('Entire 2-Bedroom Condo')
  const [abNiche, setAbNiche] = useState('Remote Workers & Digital Nomads')
  const [optimizedListing, setOptimizedListing] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  // Deal ROI Calculator State
  const [purchasePrice, setPurchasePrice] = useState(350000)
  const [monthlyRentEst, setMonthlyRentEst] = useState(2600)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [interestRate, setInterestRate] = useState(6.5)
  const [propertyTaxYear, setPropertyTaxYear] = useState(4200)
  const [insuranceYear, setInsuranceYear] = useState(1500)
  const [maintenancePct, setMaintenancePct] = useState(5)

  // Calculations
  const downPayment = (purchasePrice * downPaymentPct) / 100
  const loanAmount = purchasePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const nPayments = 30 * 12
  const monthlyMortgage = loanAmount > 0 
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, nPayments))) / (Math.pow(1 + monthlyRate, nPayments) - 1)
    : 0
  const monthlyTax = propertyTaxYear / 12
  const monthlyInsurance = insuranceYear / 12
  const monthlyMaint = (monthlyRentEst * maintenancePct) / 100
  const totalMonthlyExpenses = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyMaint
  const netMonthlyCashflow = monthlyRentEst - totalMonthlyExpenses
  const annualCashflow = netMonthlyCashflow * 12
  const cashOnCash = downPayment > 0 ? ((annualCashflow / downPayment) * 100).toFixed(2) : '0'
  const capRate = (((monthlyRentEst * 12) - (propertyTaxYear + insuranceYear + (monthlyMaint * 12))) / purchasePrice * 100).toFixed(2)

  const handleOptimizeAirbnb = (e: React.FormEvent) => {
    e.preventDefault()
    setOptimizedListing({
      title: `★ Modern Luxe ${abType.split(' ')[1] || 'Stay'} | High-Speed WiFi & Dedicated Workspace in ${abCity.split(',')[0]}`,
      subtitle: `Top-Rated Destination for ${abNiche} | Central Location & Designer Comforts`,
      highlights: [
        '⚡ 500+ Mbps Fiber WiFi tested for seamless Zoom & remote meetings',
        '☕ Specialty Pour-over Coffee Bar & Organic Teas provided',
        '🔒 Keyless Smart Lock self check-in 24/7',
        '🛏️ Hotel-Grade Memory Foam Mattress with luxury organic linen',
        '📍 Walk to top neighborhood cafes, parks, and vibrant dining'
      ],
      pricingTip: `Suggested Dynamic Pricing: $165 - $240/night (Increase weekend rates by +28% and set a 3-night minimum to maximize RevPAR).`,
      occupancyAdvice: `Target Occupancy: 82%. Adding a dedicated workstation and ergonomic chair increases average booking length from 2.4 to 6.8 nights.`
    })
  }

  const copyListing = () => {
    if (!optimizedListing) return
    const text = `${optimizedListing.title}\n\n${optimizedListing.subtitle}\n\nHighlights:\n${optimizedListing.highlights.join('\n')}\n\n${optimizedListing.pricingTip}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="w-full">
      {/* TABS HEADER */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#d8ded6] bg-white p-3 sm:gap-4 sm:p-4 rounded-2xl shadow-sm">
        <button
          onClick={() => setActiveTab('lease')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
            activeTab === 'lease'
              ? 'bg-[#1b3823] text-white shadow-md'
              : 'text-[#415344] hover:bg-[#eef4ee]'
          }`}
        >
          <Building2 size={16} />
          <span>Lease Agreement Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('airbnb')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
            activeTab === 'airbnb'
              ? 'bg-[#1b3823] text-white shadow-md'
              : 'text-[#415344] hover:bg-[#eef4ee]'
          }`}
        >
          <Sparkles size={16} />
          <span>Airbnb Listing Optimizer</span>
        </button>

        <button
          onClick={() => setActiveTab('roi')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
            activeTab === 'roi'
              ? 'bg-[#1b3823] text-white shadow-md'
              : 'text-[#415344] hover:bg-[#eef4ee]'
          }`}
        >
          <Calculator size={16} />
          <span>Rental Cash Flow & ROI</span>
        </button>

        <button
          onClick={() => setActiveTab('methods')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
            activeTab === 'methods'
              ? 'bg-[#1b3823] text-white shadow-md'
              : 'text-[#415344] hover:bg-[#eef4ee]'
          }`}
        >
          <DollarSign size={16} />
          <span>Monetization & Real Estate Jobs</span>
        </button>
      </div>

      {/* TAB 1: LEASE GENERATOR */}
      {activeTab === 'lease' && (
        <div className="mt-6">
          <LeaseGenerator />
        </div>
      )}

      {/* TAB 2: AIRBNB LISTING OPTIMIZER */}
      {activeTab === 'airbnb' && (
        <div className="mt-6 rounded-2xl border border-[#d8ded6] bg-white p-6 shadow-xl sm:p-10">
          <div className="border-b border-[#e5ebe4] pb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1e7] px-3 py-1 text-xs font-semibold text-[#285731]">
              <Sparkles size={13} /> Rank Higher on Airbnb & Vrbo Algorithms
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#15271a] sm:text-3xl">
              Airbnb & Short-Term Rental Listing Optimizer
            </h2>
            <p className="mt-1 text-sm text-[#505e53]">
              Generate high-converting titles, targeted amenity hooks, and dynamic pricing rules designed to boost click-through rates and booking conversions.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <form onSubmit={handleOptimizeAirbnb} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374539]">
                  Property Location / City
                </label>
                <input
                  type="text"
                  required
                  value={abCity}
                  onChange={(e) => setAbCity(e.target.value)}
                  placeholder="e.g. Austin, TX or London, UK"
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3.5 py-2.5 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374539]">
                  Property Layout & Type
                </label>
                <select
                  value={abType}
                  onChange={(e) => setAbType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3.5 py-2.5 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                >
                  <option value="Entire 1-Bedroom Apartment">Entire 1-Bedroom Apartment</option>
                  <option value="Entire 2-Bedroom Condo">Entire 2-Bedroom Condo</option>
                  <option value="3-Bedroom Luxury Family House">3-Bedroom Luxury Family House</option>
                  <option value="Cozy Private Studio Suite">Cozy Private Studio Suite</option>
                  <option value="Boutique Villa with Pool">Boutique Villa with Pool</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374539]">
                  Target Guest Demographic
                </label>
                <select
                  value={abNiche}
                  onChange={(e) => setAbNiche(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3.5 py-2.5 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                >
                  <option value="Remote Workers & Digital Nomads">Remote Workers & Digital Nomads (Longer stays, high WiFi demand)</option>
                  <option value="Traveling Couples & Weekend Getaways">Traveling Couples & Weekend Getaways (Aesthetic & romantic vibes)</option>
                  <option value="Family Vacations & Large Groups">Family Vacations (Baby-friendly, washer/dryer, full kitchen)</option>
                  <option value="Business Travelers & Medical Professionals">Business Travelers (Quiet hours, workstation, instant check-in)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#285731] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1e4225]"
              >
                <Sparkles size={16} /> Optimize Listing & Pricing Now
              </button>
            </form>

            {/* Results Preview */}
            <div className="rounded-xl border border-[#d3ded2] bg-[#f9fbf9] p-6">
              {optimizedListing ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#285731]">
                      Optimized Output
                    </span>
                    <button
                      onClick={copyListing}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#c5d3c4] bg-white px-2.5 py-1 text-xs font-semibold text-[#285731] hover:bg-[#ebf4ea]"
                    >
                      <Copy size={13} />
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#687a6a] uppercase">Algorithmic Title</span>
                    <h4 className="text-base font-bold text-[#142918]">{optimizedListing.title}</h4>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#687a6a] uppercase">Hook Description</span>
                    <p className="text-xs text-[#394a3c]">{optimizedListing.subtitle}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#687a6a] uppercase">5 Core Conversion Bullets</span>
                    <ul className="mt-1 space-y-1.5 text-xs text-[#2b3c2e]">
                      {optimizedListing.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-[#c9ddc7] bg-[#edf6ec] p-3 text-xs text-[#224727]">
                    <p className="font-bold">Dynamic Revenue Strategy:</p>
                    <p className="mt-0.5">{optimizedListing.pricingTip}</p>
                    <p className="mt-1 text-[11px] text-[#3c5c40]">{optimizedListing.occupancyAdvice}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center text-[#708072]">
                  <Sparkles size={36} className="text-[#3a6b43] opacity-60" />
                  <p className="mt-3 text-sm font-semibold">Enter your property details on the left</p>
                  <p className="mt-1 max-w-xs text-xs">
                    Get an instant SEO title, conversion-focused description, and pricing yield strategy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CASH FLOW & ROI CALCULATOR */}
      {activeTab === 'roi' && (
        <div className="mt-6 rounded-2xl border border-[#d8ded6] bg-white p-6 shadow-xl sm:p-10">
          <div className="border-b border-[#e5ebe4] pb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1e7] px-3 py-1 text-xs font-semibold text-[#285731]">
              <Calculator size={13} /> Real Estate Deal Analyzer
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#15271a] sm:text-3xl">
              Rental Cash Flow & Cap Rate Calculator
            </h2>
            <p className="mt-1 text-sm text-[#505e53]">
              Quickly underwrite long-term or short-term rental acquisitions. Analyze net monthly cash flow, annual yield, and Cash-on-Cash ROI.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#374539]">Purchase Price ($)</label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374539]">Down Payment (%)</label>
                <input
                  type="number"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374539]">Gross Monthly Rent ($)</label>
                <input
                  type="number"
                  value={monthlyRentEst}
                  onChange={(e) => setMonthlyRentEst(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374539]">Mortgage Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374539]">Annual Property Taxes ($)</label>
                <input
                  type="number"
                  value={propertyTaxYear}
                  onChange={(e) => setPropertyTaxYear(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374539]">Annual Insurance ($)</label>
                <input
                  type="number"
                  value={insuranceYear}
                  onChange={(e) => setInsuranceYear(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
                />
              </div>
            </div>

            {/* Financial Results Cards */}
            <div className="rounded-2xl border border-[#cde0cc] bg-[#f3f8f2] p-6 text-[#1b3520]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#285731]">Investment Summary</h3>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-[#d6e3d5]">
                  <span className="text-[11px] font-semibold text-[#5a6e5d] uppercase">Net Monthly Cash Flow</span>
                  <p className={`mt-1 text-2xl font-black ${netMonthlyCashflow >= 0 ? 'text-[#1e5c2a]' : 'text-red-600'}`}>
                    ${Math.round(netMonthlyCashflow).toLocaleString()}
                    <span className="text-xs font-normal text-gray-500">/mo</span>
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm border border-[#d6e3d5]">
                  <span className="text-[11px] font-semibold text-[#5a6e5d] uppercase">Cash-on-Cash Return</span>
                  <p className="mt-1 text-2xl font-black text-[#1e5c2a]">{cashOnCash}%</p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm border border-[#d6e3d5]">
                  <span className="text-[11px] font-semibold text-[#5a6e5d] uppercase">Capitalization Rate</span>
                  <p className="mt-1 text-2xl font-black text-[#1e5c2a]">{capRate}%</p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm border border-[#d6e3d5]">
                  <span className="text-[11px] font-semibold text-[#5a6e5d] uppercase">Upfront Down Payment</span>
                  <p className="mt-1 text-2xl font-black text-[#1e5c2a]">${Math.round(downPayment).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t border-[#d8e6d7] pt-4 text-xs text-[#354f39]">
                <div className="flex justify-between">
                  <span>Estimated Monthly P&I Mortgage:</span>
                  <span className="font-semibold">${Math.round(monthlyMortgage).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Property Tax:</span>
                  <span className="font-semibold">${Math.round(monthlyTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Insurance & Maint. Reserves:</span>
                  <span className="font-semibold">${Math.round(monthlyInsurance + monthlyMaint).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL ESTATE JOBS & MONETIZATION METHODS */}
      {activeTab === 'methods' && (
        <div className="mt-6 rounded-2xl border border-[#d8ded6] bg-white p-6 shadow-xl sm:p-10">
          <div className="border-b border-[#e5ebe4] pb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1e7] px-3 py-1 text-xs font-semibold text-[#285731]">
              <DollarSign size={13} /> How to Make Money in Real Estate
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#15271a] sm:text-3xl">
              Proven Real Estate Monetization Methods & Remote Jobs (2025/2026)
            </h2>
            <p className="mt-1 text-sm text-[#505e53]">
              From digital Airbnb co-hosting without owning property to tenant screening affiliate income, discover actionable ways to monetize real estate skills today.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Method 1 */}
            <div className="rounded-xl border border-[#d8ded6] bg-[#fbfdfa] p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2e7] text-[#24572c]">
                <Briefcase size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#142818]">1. Remote Airbnb Co-Hosting</h3>
              <p className="mt-2 text-xs leading-5 text-[#4e6151]">
                <strong>How it works:</strong> Manage short-term rental listings for busy landlords. Handle guest communication, pricing adjustments, cleaner scheduling, and 5-star reviews remotely.
              </p>
              <div className="mt-4 rounded-lg bg-white p-2.5 text-xs border border-[#e1ece0]">
                <span className="font-bold text-[#1e4a25]">Earnings:</span> 15% - 25% of gross booking revenue per property ($400 - $1,500/month per active door with zero down payment).
              </div>
            </div>

            {/* Method 2 */}
            <div className="rounded-xl border border-[#d8ded6] bg-[#fbfdfa] p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2e7] text-[#24572c]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#142818]">2. Tenant Screening & Legal Affiliates</h3>
              <p className="mt-2 text-xs leading-5 text-[#4e6151]">
                <strong>How it works:</strong> Landlords need background checks, eviction history, and credit reports for prospective tenants. By referring screening services (TransUnion SmartMove, RentPrep), you earn high CPA commissions.
              </p>
              <div className="mt-4 rounded-lg bg-white p-2.5 text-xs border border-[#e1ece0]">
                <span className="font-bold text-[#1e4a25]">Earnings:</span> $15 - $30 per completed screening applicant + recurring commissions on rent guarantee insurance.
              </div>
            </div>

            {/* Method 3 */}
            <div className="rounded-xl border border-[#d8ded6] bg-[#fbfdfa] p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f2e7] text-[#24572c]">
                <TrendingUp size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#142818]">3. Off-Market Real Estate Wholesaling</h3>
              <p className="mt-2 text-xs leading-5 text-[#4e6151]">
                <strong>How it works:</strong> Find distressed or motivated sellers who want a fast cash sale. Put the property under contract and assign the contract rights to an active cash buyer or investor.
              </p>
              <div className="mt-4 rounded-lg bg-white p-2.5 text-xs border border-[#e1ece0]">
                <span className="font-bold text-[#1e4a25]">Earnings:</span> Assignment fees typically range from $5,000 to $25,000 per closed deal with minimal capital risk.
              </div>
            </div>
          </div>

          {/* Action Step Guide */}
          <div className="mt-8 rounded-xl border border-[#c9ddc7] bg-[#f3f9f2] p-6 text-xs text-[#224727]">
            <h4 className="text-sm font-bold text-[#1a3d20]">⚡ 3 Immediate Steps to Land Your First Real Estate Client:</h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[#2d5032]">
              <li>Use our <strong>Airbnb Listing Optimizer</strong> above to draft an optimized proposal for an underperforming local listing, then DM the host showing them how to increase weekend bookings.</li>
              <li>Provide landlords with our free, compliant <strong>Residential Lease Agreement (PDF)</strong> as a high-value lead magnet to establish instant authority.</li>
              <li>Partner with local property investors to manage tenant turnover, contracts, and screening documentation.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
