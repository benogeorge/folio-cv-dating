export interface StateLaw {
  state: string
  code: string
  slug: string
  maxDeposit: string
  noticePeriod: string
  gracePeriod: string
  requiredDisclosures: string[]
  statuteCitation: string
}

export const STATE_LAWS: Record<string, StateLaw> = {
  california: {
    state: 'California',
    code: 'CA',
    slug: 'california',
    maxDeposit: '1 month rent (unfurnished) or 2 months (furnished) as per AB 12 (effective 2024)',
    noticePeriod: '30 days (under 1 year tenancy) or 60 days (over 1 year)',
    gracePeriod: 'No statutory grace period unless specified in lease agreement',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure (pre-1978 properties)',
      'Megan’s Law Registered Sex Offender Database Disclosure (Civil Code § 2079.10a)',
      'AB 1482 Just Cause Eviction & Rent Cap Notice',
      'Bedbug Addendum & Inspection History (Civil Code § 1954.603)',
      'Flood Hazard Disclosure (Government Code § 8589.45)',
      'Demolition or Military Ordnance Notice (if applicable)'
    ],
    statuteCitation: 'Cal. Civ. Code §§ 1940-1954.05'
  },
  texas: {
    state: 'Texas',
    code: 'TX',
    slug: 'texas',
    maxDeposit: 'No statutory limit set by Texas state law',
    noticePeriod: '30 days for month-to-month leases (Tex. Prop. Code § 91.001)',
    gracePeriod: '2 full days required before late fees can be legally assessed',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Right to Repair & Remedy Notice (Tex. Prop. Code § 92.056)',
      'Security Device & Lock Requirements (Tex. Prop. Code § 92.153)',
      'Landlord Contact & Property Management Identity (Tex. Prop. Code § 92.201)',
      'Flood Zone Disclosure Notice (Tex. Prop. Code § 92.0135)'
    ],
    statuteCitation: 'Tex. Prop. Code Ann. §§ 91.001 - 92.355'
  },
  florida: {
    state: 'Florida',
    code: 'FL',
    slug: 'florida',
    maxDeposit: 'No statutory limit set by Florida state law',
    noticePeriod: '15 days (month-to-month)',
    gracePeriod: 'No statutory grace period required',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Radon Gas Notification (§ 404.056(5), Fla. Stat.)',
      'Security Deposit Holding Location & Bank Notification (§ 83.49, Fla. Stat.)',
      'Authorized Landlord & Agent Contact Details (§ 83.50, Fla. Stat.)'
    ],
    statuteCitation: 'Fla. Stat. §§ 83.40 - 83.683'
  },
  newyork: {
    state: 'New York',
    code: 'NY',
    slug: 'new-york',
    maxDeposit: 'Capped at exactly 1 month rent (Housing Stability & Tenant Protection Act)',
    noticePeriod: '30 days (less than 1 yr), 60 days (1-2 yrs), 90 days (2+ yrs)',
    gracePeriod: '5-day statutory grace period before late fee (max $50 or 5%)',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Window Guard Notice & Smoking Policy Disclosure',
      'Sprinkler System Disclosure Notice (N.Y. Real Prop. Law § 231-A)',
      'Bedbug Infestation History (NYC Admin. Code § 27-2018.1)',
      'Security Deposit Bank & Account Details Notice'
    ],
    statuteCitation: 'N.Y. Real Prop. Law §§ 220 - 238-A'
  },
  illinois: {
    state: 'Illinois',
    code: 'IL',
    slug: 'illinois',
    maxDeposit: 'No statewide statutory maximum limit',
    noticePeriod: '30 days for month-to-month leases',
    gracePeriod: '5-day statutory grace period before late fees',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Radon Testing & Hazard Disclosure (420 ILCS 46/)',
      'Security Deposit Interest Statement (properties with 25+ units)',
      'Heating Cost / Master Utility Disclosure (765 ILCS 740/)'
    ],
    statuteCitation: '765 ILCS 705/ (Landlord and Tenant Act)'
  },
  pennsylvania: {
    state: 'Pennsylvania',
    code: 'PA',
    slug: 'pennsylvania',
    maxDeposit: '2 months rent (Year 1); 1 month rent (subsequent years)',
    noticePeriod: '15 days notice (for year lease or less)',
    gracePeriod: 'No statutory grace period mandated',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Escrow Account Details for Deposits Over $100',
      'Landlord / Agent Identity Disclosure'
    ],
    statuteCitation: '68 Pa. Stat. §§ 250.101 - 250.602'
  },
  ohio: {
    state: 'Ohio',
    code: 'OH',
    slug: 'ohio',
    maxDeposit: 'No statutory limit (Interest of 5% due on deposits >$50 held over 6 months)',
    noticePeriod: '30 days notice for month-to-month tenancies',
    gracePeriod: 'No statutory grace period mandated by state law',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Landlord Name & Registered Address in Lease (Ohio Rev. Code § 5321.18)'
    ],
    statuteCitation: 'Ohio Rev. Code Ann. §§ 5321.01 - 5321.19'
  },
  georgia: {
    state: 'Georgia',
    code: 'GA',
    slug: 'georgia',
    maxDeposit: 'No statutory limit set by Georgia state law',
    noticePeriod: '60 days notice by landlord; 30 days notice by tenant',
    gracePeriod: 'No statutory grace period mandated',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Security Deposit Escrow Account Information (O.C.G.A. § 44-7-31)',
      'Pre-Existing Damages Move-in Inspection Checklist (O.C.G.A. § 44-7-33)',
      'Flood Hazard Disclosure (if flooded 3+ times in past 5 years)'
    ],
    statuteCitation: 'Ga. Code Ann. §§ 44-7-1 - 44-7-115'
  },
  washington: {
    state: 'Washington',
    code: 'WA',
    slug: 'washington',
    maxDeposit: 'No statutory limit, but installment payment options mandated',
    noticePeriod: '20 days written notice (month-to-month)',
    gracePeriod: '5-day grace period before late fees',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Written Move-in Condition Checklist Signed by Both Parties (RCW 59.18.260)',
      'Security Deposit Receipt & Escrow Account Holding Bank (RCW 59.18.270)',
      'Mold Information Handout (RCW 59.18.060)',
      'Voter Registration & Fire Safety Evacuation Info'
    ],
    statuteCitation: 'Wash. Rev. Code §§ 59.18.010 - 59.18.912'
  },
  northcarolina: {
    state: 'North Carolina',
    code: 'NC',
    slug: 'north-carolina',
    maxDeposit: '2 weeks (weekly tenancy), 1.5 months (month-to-month), 2 months (longer)',
    noticePeriod: '7 days (month-to-month), 30 days (year-to-year)',
    gracePeriod: '5 days grace period before late fee (maximum $15 or 5% of rent)',
    requiredDisclosures: [
      'Lead-Based Paint Disclosure',
      'Security Deposit Trust Bank Location (N.C. Gen. Stat. § 42-50)',
      'Late Fee Statutory Limits Statement (N.C. Gen. Stat. § 42-46)'
    ],
    statuteCitation: 'N.C. Gen. Stat. §§ 42-1 - 42-76'
  }
}
