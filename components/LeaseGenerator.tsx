'use client'

import React, { useState } from 'react'
import { FileText, Download, CheckCircle, Shield, AlertCircle, Building2, HelpCircle } from 'lucide-react'
import { STATE_LAWS } from '@/lib/stateLaws'
import { generateLeasePDF, LeaseFormData } from '@/lib/pdfGenerator'

export default function LeaseGenerator() {
  const [selectedState, setSelectedState] = useState<string>('california')
  const [formData, setFormData] = useState<LeaseFormData>({
    stateKey: 'california',
    propertyAddress: '',
    city: '',
    stateCode: 'CA',
    zipCode: '',
    landlordName: '',
    landlordEmail: '',
    landlordPhone: '',
    tenantNames: '',
    leaseType: 'fixed',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    monthlyRent: '2200',
    rentDueDay: '1st',
    securityDeposit: '2200',
    utilitiesIncluded: 'Water, Trash removal',
    petsAllowed: 'no',
    petDepositAmount: '0',
    furnishingStatus: 'unfurnished',
    leadPaintApplies: false,
  })

  const [generating, setGenerating] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const activeLaw = STATE_LAWS[selectedState] || STATE_LAWS['california']

  const handleStateChange = (newKey: string) => {
    setSelectedState(newKey)
    const law = STATE_LAWS[newKey]
    if (law) {
      setFormData(prev => ({
        ...prev,
        stateKey: newKey,
        stateCode: law.code,
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setGenerating(true)
    try {
      generateLeasePDF(formData)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 8000)
    } catch (err) {
      console.error(err)
      alert('Error creating PDF. Please ensure all required fields are filled.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div id="generator" className="rounded-2xl border border-[#d8ded6] bg-white p-6 shadow-xl sm:p-10">
      <div className="flex flex-col gap-4 border-b border-[#e5ebe4] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1e7] px-3 py-1 text-xs font-semibold text-[#285731]">
            <CheckCircle size={13} /> 100% Free · No Trial · Instant PDF
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#15271a] sm:text-3xl">
            Create State-Compliant Residential Lease
          </h2>
          <p className="mt-1 text-sm text-[#505e53]">
            Customized for <strong className="text-[#1a3821]">{activeLaw.state}</strong> statutory codes ({activeLaw.statuteCitation}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="stateSelect" className="text-xs font-bold uppercase tracking-wider text-[#495b4c]">
            Select State:
          </label>
          <select
            id="stateSelect"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="rounded-xl border border-[#c4d1c2] bg-[#fbfdfb] px-3 py-2 text-sm font-semibold text-[#162a1c] shadow-sm focus:border-[#2f633a] focus:outline-none"
          >
            {Object.entries(STATE_LAWS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.state} ({item.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State Law Live Alert Box */}
      <div className="mt-6 rounded-xl border border-[#cde0cc] bg-[#f3f8f2] p-4 text-xs text-[#2b4b32]">
        <div className="flex items-start gap-2.5">
          <Shield size={18} className="mt-0.5 shrink-0 text-[#2f633a]" />
          <div>
            <p className="font-bold text-[#1a3a22]">{activeLaw.state} Statutory Protection Rules Built-In:</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[#35523c]">
              <li><strong>Max Security Deposit:</strong> {activeLaw.maxDeposit}</li>
              <li><strong>Notice to Terminate:</strong> {activeLaw.noticePeriod}</li>
              <li><strong>Grace Period / Late Fees:</strong> {activeLaw.gracePeriod}</li>
              <li><strong>Mandatory Disclosures Included:</strong> {activeLaw.requiredDisclosures.length} statutory notices auto-appended</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="mt-8 space-y-8">
        {/* Step 1: Property Details */}
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-[#142619]">
            <Building2 size={17} className="text-[#2f633a]" /> 1. Rental Property Address
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#374539]">Street Address *</label>
              <input
                type="text"
                required
                name="propertyAddress"
                placeholder="e.g. 742 Evergreen Terrace, Apt 3B"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">City *</label>
              <input
                type="text"
                required
                name="city"
                placeholder="e.g. Los Angeles"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">ZIP Code *</label>
              <input
                type="text"
                required
                name="zipCode"
                placeholder="90001"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Parties */}
        <div className="border-t border-[#eaf0e9] pt-6">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#142619]">
            <FileText size={17} className="text-[#2f633a]" /> 2. Landlord & Tenant Names
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Landlord / Property Manager Name *</label>
              <input
                type="text"
                required
                name="landlordName"
                placeholder="e.g. Jane Smith Properties LLC"
                value={formData.landlordName}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Landlord Contact Email</label>
              <input
                type="email"
                name="landlordEmail"
                placeholder="contact@example.com"
                value={formData.landlordEmail}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Tenant Full Name(s) *</label>
              <input
                type="text"
                required
                name="tenantNames"
                placeholder="e.g. John Doe, Sarah Doe"
                value={formData.tenantNames}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Terms & Rent */}
        <div className="border-t border-[#eaf0e9] pt-6">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#142619]">
            <FileText size={17} className="text-[#2f633a]" /> 3. Rent, Deposit & Term
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Lease Type</label>
              <select
                name="leaseType"
                value={formData.leaseType}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              >
                <option value="fixed">Fixed Term (e.g. 1 Year)</option>
                <option value="month-to-month">Month-to-Month Periodic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Monthly Rent ($) *</label>
              <input
                type="number"
                required
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Security Deposit ($) *</label>
              <input
                type="number"
                required
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Lease Start Date *</label>
              <input
                type="date"
                required
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Utilities, Pets & Options */}
        <div className="border-t border-[#eaf0e9] pt-6">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#142619]">
            <HelpCircle size={17} className="text-[#2f633a]" /> 4. Policies & Included Services
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Pet Policy</label>
              <select
                name="petsAllowed"
                value={formData.petsAllowed}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              >
                <option value="no">No Pets Allowed</option>
                <option value="yes">Pets Allowed (No Fee)</option>
                <option value="deposit">Pets Allowed with Deposit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#374539]">Utilities Paid by Landlord</label>
              <input
                type="text"
                name="utilitiesIncluded"
                placeholder="e.g. Water, Sewer, Trash"
                value={formData.utilitiesIncluded}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border border-[#cfd9ce] px-3 py-2 text-sm text-[#182a1d] focus:border-[#2f633a] focus:outline-none"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#2f4032]">
                <input
                  type="checkbox"
                  name="leadPaintApplies"
                  checked={formData.leadPaintApplies}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#2f633a] focus:ring-[#2f633a]"
                />
                Property built before 1978 (Lead Paint Disclosure required)
              </label>
            </div>
          </div>
        </div>

        {/* Submit & Generate CTA */}
        <div className="border-t border-[#e5ebe4] pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-[#506353]">
              <Shield size={16} className="text-[#2f633a]" />
              <span>Free client-side rendering. Your private data is never saved to external servers.</span>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#285731] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#1e4225] disabled:opacity-50"
            >
              <Download size={18} />
              {generating ? 'Compiling Legal PDF...' : 'Download Free Lease Agreement (PDF)'}
            </button>
          </div>

          {downloadSuccess && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#ebf6ea] p-3 text-xs font-semibold text-[#205228]">
              <CheckCircle size={16} /> Your {activeLaw.state} Residential Lease Agreement has downloaded successfully! Check your downloads folder.
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
