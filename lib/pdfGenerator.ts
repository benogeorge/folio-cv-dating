import { jsPDF } from 'jspdf'
import { STATE_LAWS } from './stateLaws'

export interface LeaseFormData {
  stateKey: string
  propertyAddress: string
  city: string
  stateCode: string
  zipCode: string
  landlordName: string
  landlordEmail: string
  landlordPhone: string
  tenantNames: string
  leaseType: 'fixed' | 'month-to-month'
  startDate: string
  endDate: string
  monthlyRent: string
  rentDueDay: string
  securityDeposit: string
  utilitiesIncluded: string
  petsAllowed: 'yes' | 'no' | 'deposit'
  petDepositAmount?: string
  furnishingStatus: 'unfurnished' | 'furnished'
  leadPaintApplies: boolean
}

export function generateLeasePDF(data: LeaseFormData): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
  })

  const stateInfo = STATE_LAWS[data.stateKey] || STATE_LAWS['california']
  const margin = 50
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin * 2
  let y = 55

  const addHeader = (title: string, subtitle?: string) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(25, 45, 30)
    doc.text(title, margin, y)
    y += 18

    if (subtitle) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(90, 100, 95)
      doc.text(subtitle, margin, y)
      y += 18
    }

    doc.setDrawColor(200, 210, 205)
    doc.setLineWidth(1)
    doc.line(margin, y, pageWidth - margin, y)
    y += 20
  }

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage()
      y = 55
    }
  }

  const printSectionHeader = (text: string) => {
    checkPageBreak(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(20, 35, 25)
    doc.text(text.toUpperCase(), margin, y)
    y += 14
  }

  const printParagraph = (text: string, indent = 0) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(40, 45, 42)
    const splitText = doc.splitTextToSize(text, contentWidth - indent)
    checkPageBreak(splitText.length * 13 + 8)
    doc.text(splitText, margin + indent, y)
    y += splitText.length * 13 + 6
  }

  // --- PAGE 1: TITLE & CORE AGREEMENT ---
  addHeader(
    `${stateInfo.state.toUpperCase()} RESIDENTIAL LEASE AGREEMENT`,
    `Compliant with ${stateInfo.statuteCitation} & Standard Landlord-Tenant Statutory Requirements`
  )

  printParagraph(
    `THIS RESIDENTIAL LEASE AGREEMENT (the "Agreement") is entered into and made effective as of ${data.startDate || 'the date of signing'}, by and between the Landlord and Tenant(s) identified below:`
  )

  printSectionHeader('1. Parties to This Agreement')
  printParagraph(`LANDLORD / LESSOR: ${data.landlordName || '[Landlord Full Legal Name]'}`)
  printParagraph(`Notice Address: ${data.landlordEmail ? `Email: ${data.landlordEmail} | ` : ''}${data.landlordPhone ? `Phone: ${data.landlordPhone}` : ''}`)
  printParagraph(`TENANT(S) / LESSEE: ${data.tenantNames || '[Tenant Legal Name(s)]'}`)
  y += 4

  printSectionHeader('2. Demised Premises Description')
  printParagraph(
    `Landlord hereby leases to Tenant, and Tenant leases from Landlord, the residential premises located at: ${data.propertyAddress || '[Street Address]'}, ${data.city || '[City]'}, ${data.stateCode || stateInfo.code} ${data.zipCode || '[ZIP]'}. The premises are leased in ${data.furnishingStatus} condition and shall be used exclusively for private single-family residential occupancy only.`
  )
  y += 4

  printSectionHeader('3. Lease Term')
  if (data.leaseType === 'fixed') {
    printParagraph(
      `FIXED TERM LEASE: The term of this Lease shall begin on ${data.startDate || '[Start Date]'} and continue until ${data.endDate || '[End Date]'}. At the expiration of this initial term, this Lease shall continue as a month-to-month tenancy subject to statutory notice requirements unless terminated by either party with at least ${stateInfo.noticePeriod} prior written notice.`
    )
  } else {
    printParagraph(
      `MONTH-TO-MONTH PERIODIC TENANCY: This Lease commences on ${data.startDate || '[Start Date]'} and shall continue on a month-to-month basis until terminated by either party delivering written notice of termination in accordance with state law (minimum ${stateInfo.noticePeriod}).`
    )
  }
  y += 4

  printSectionHeader('4. Rent Payments & Grace Periods')
  printParagraph(
    `MONTHLY RENT: Tenant agrees to pay Landlord rent in the amount of $${data.monthlyRent || '0.00'} per month, payable in advance on or before the ${data.rentDueDay || '1st'} day of each calendar month.`
  )
  printParagraph(
    `GRACE PERIOD & LATE CHARGES: Statutory grace rules: ${stateInfo.gracePeriod}. If rent is not received by the Landlord within the designated grace period, a reasonable late fee permitted under state regulations may be assessed.`
  )
  y += 4

  printSectionHeader('5. Security Deposit')
  printParagraph(
    `DEPOSIT AMOUNT: Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $${data.securityDeposit || '0.00'} as security for the faithful performance of all terms of this Lease. State legal limit: ${stateInfo.maxDeposit}.`
  )
  printParagraph(
    `DEPOSIT RETURN: The security deposit will be returned to Tenant in accordance with state statute after vacancy, less any legal deductions for unpaid rent, cleaning, or actual damages exceeding normal wear and tear, accompanied by an itemized written accounting statement.`
  )
  y += 4

  printSectionHeader('6. Utilities & Services')
  printParagraph(
    `Utilities paid and provided by Landlord: ${data.utilitiesIncluded || 'None (All utilities to be arranged and paid directly by Tenant)'}. All other utilities, internet, trash, and municipal services shall be the sole responsibility of Tenant.`
  )
  y += 4

  printSectionHeader('7. Pets & Animal Policy')
  if (data.petsAllowed === 'yes') {
    printParagraph('PET PERMITTED: Pets are allowed on the premises subject to general community rules and tenant maintenance.')
  } else if (data.petsAllowed === 'deposit') {
    printParagraph(`PETS ALLOWED WITH DEPOSIT: Tenant is permitted to keep authorized pets upon payment of a pet deposit of $${data.petDepositAmount || '0.00'}.`)
  } else {
    printParagraph('NO PETS PERMITTED: No animals, birds, or pets shall be kept on or about the premises without prior written consent from Landlord (service/assistance animals exempted under federal law).')
  }
  y += 4

  printSectionHeader('8. Mandatory State Disclosures & Notices')
  stateInfo.requiredDisclosures.forEach((disc) => {
    printParagraph(`• ${disc}`, 10)
  })
  if (data.leadPaintApplies) {
    printParagraph('• Federal Lead-Based Paint Disclosure: Housing built before 1978 may contain lead-based paint. Lead poisoning poses severe health hazards to young children and pregnant individuals. Landlord has provided the EPA-approved Protect Your Family pamphlet.', 10)
  }
  y += 6

  printSectionHeader('9. Governing Law')
  printParagraph(
    `This Agreement shall be construed, enforced, and governed by the statutory codes of the State of ${stateInfo.state} (${stateInfo.statuteCitation}). If any clause herein violates applicable state statutes, said clause shall be deemed severed without invalidating remaining sections.`
  )
  y += 12

  // --- SIGNATURE BLOCKS ---
  checkPageBreak(120)
  printSectionHeader('10. Execution & Signatures')
  printParagraph('IN WITNESS WHEREOF, the Landlord and Tenant(s) have signed and executed this Residential Lease Agreement as of the date written below.')
  y += 20

  const colWidth = (contentWidth - 20) / 2
  const sigBoxY = y

  // Landlord Signature Line
  doc.setDrawColor(80, 80, 80)
  doc.setLineWidth(0.8)
  doc.line(margin, sigBoxY + 35, margin + colWidth, sigBoxY + 35)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(30, 30, 30)
  doc.text('LANDLORD SIGNATURE', margin, sigBoxY + 46)
  doc.setFont('helvetica', 'normal')
  doc.text(`Print: ${data.landlordName || '_______________________'}`, margin, sigBoxY + 58)
  doc.text(`Date: ________________________`, margin, sigBoxY + 70)

  // Tenant Signature Line
  const rightColX = margin + colWidth + 20
  doc.line(rightColX, sigBoxY + 35, rightColX + colWidth, sigBoxY + 35)
  doc.setFont('helvetica', 'bold')
  doc.text('TENANT SIGNATURE', rightColX, sigBoxY + 46)
  doc.setFont('helvetica', 'normal')
  doc.text(`Print: ${data.tenantNames || '_______________________'}`, rightColX, sigBoxY + 58)
  doc.text(`Date: ________________________`, rightColX, sigBoxY + 70)

  // Footer / Page numbers
  const pageCount = doc.internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(140, 140, 140)
    doc.text(
      `StateLeaseLegal.com | Free Compliant ${stateInfo.state} Lease Agreement | Page ${i} of ${pageCount}`,
      margin,
      doc.internal.pageSize.getHeight() - 25
    )
  }

  const safeFilename = `${stateInfo.slug}-residential-lease-agreement.pdf`
  doc.save(safeFilename)
}
