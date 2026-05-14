/**
 * Public legal copy for the site chrome (navbar strip, etc.).
 * Default EIN matches IRS exempt org records (overridable via NEXT_PUBLIC_ORG_EIN).
 * The IRS determination letter PDF remains the source of truth for tax status.
 */
export const IRS_DETERMINATION_LETTER_URL =
  'https://raw.githubusercontent.com/expressionneuroscienceinstitute/next-site/refs/heads/documents/TAX_EXEMPT_DETERMINATION-flattened-redacted.pdf'

/** IRS EIN from public exempt-organization data (EO BMF). */
const DEFAULT_PUBLIC_EIN = '33-4592229'

export const siteIdentity = {
  ein: process.env.NEXT_PUBLIC_ORG_EIN?.trim() || DEFAULT_PUBLIC_EIN,
  taxDesignation: '501(c)(3) tax-exempt public charity',
  determinationLetterUrl: IRS_DETERMINATION_LETTER_URL,
}
