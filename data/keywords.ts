/**
 * Master page definitions for programmatic SEO.
 * Each entry generates a static page at /[slug].
 *
 * intent types:
 *   "informational" - guides, how-tos (priority 0.8)
 *   "tool"          - calculators, generators (priority 1.0)
 *   "comparison"    - alternatives, vs pages (priority 0.9)
 *   "usecase"       - industry/vertical pages (priority 0.8)
 */
export interface SeoPage {
  slug: string;
  title: string;
  description: string;
  intent: "informational" | "tool" | "comparison" | "usecase";
}

export const SEO_PAGES: SeoPage[] = [
  // ── Tools (highest priority) ──────────────────────────────────────────────
  {
    slug: "free-gst-calculator",
    title: "Free GST Calculator India — CGST, SGST & IGST",
    description: "Calculate GST instantly. Enter amount and rate to get CGST, SGST or IGST breakdown. Free online tool for Indian businesses.",
    intent: "tool",
  },
  {
    slug: "gst-invoice-generator-free",
    title: "Free GST Invoice Generator — Create Invoice Online",
    description: "Generate GST-compliant invoices online for free. Download PDF instantly. No signup required for first invoice.",
    intent: "tool",
  },
  {
    slug: "hsn-code-finder-india",
    title: "HSN Code Finder India — Search HSN/SAC Codes & GST Rates",
    description: "Find the correct HSN or SAC code for your product or service. Includes GST rate lookup for all categories.",
    intent: "tool",
  },
  {
    slug: "gst-rate-finder-india",
    title: "GST Rate Finder India — Check GST Rate by Product",
    description: "Look up the GST rate for any product or service in India. Updated for latest GST council notifications.",
    intent: "tool",
  },

  // ── Invoice & GST basics (informational) ──────────────────────────────────
  {
    slug: "gst-invoice-format-india",
    title: "GST Invoice Format India — Mandatory Fields & Free Template",
    description: "Learn the correct GST invoice format with all mandatory fields. Download free Word/Excel/PDF templates.",
    intent: "informational",
  },
  {
    slug: "gst-invoice-online-india",
    title: "Create GST Invoice Online — Fast, Free & Compliant",
    description: "Create and download GST invoices online in minutes. Auto CGST/SGST/IGST calculation. No accounting knowledge needed.",
    intent: "informational",
  },
  {
    slug: "how-to-create-gst-invoice",
    title: "How to Create a GST Invoice — Step-by-Step Guide 2025",
    description: "Step-by-step guide to creating a GST invoice in India. Covers mandatory fields, tax calculation and e-way bill.",
    intent: "informational",
  },
  {
    slug: "gst-invoice-with-qr-code",
    title: "GST Invoice with QR Code — IRN & e-Invoice Guide",
    description: "Learn how to generate GST invoices with QR codes and IRN for e-invoicing compliance in India.",
    intent: "informational",
  },

  // ── Document types ────────────────────────────────────────────────────────
  {
    slug: "e-way-bill-generation-online",
    title: "E-Way Bill Generation Online — Complete Guide 2025",
    description: "Generate e-way bills online for goods transport in India. Step-by-step guide with threshold limits and exemptions.",
    intent: "informational",
  },
  {
    slug: "proforma-invoice-format-india",
    title: "Proforma Invoice Format India — Free Template & Guide",
    description: "Download free proforma invoice format for India. Understand the difference between proforma and tax invoice.",
    intent: "informational",
  },
  {
    slug: "credit-note-format-gst",
    title: "Credit Note Format Under GST — When & How to Issue",
    description: "Learn when to issue a GST credit note, mandatory fields, and how to adjust your GST returns.",
    intent: "informational",
  },
  {
    slug: "debit-note-format-gst",
    title: "Debit Note Format Under GST — Complete Guide",
    description: "Understand GST debit notes — when to issue, format requirements, and impact on GST returns.",
    intent: "informational",
  },
  {
    slug: "delivery-challan-format",
    title: "Delivery Challan Format Under GST — Free Template",
    description: "Download delivery challan format for goods sent without invoice. Covers job work, sales returns and more.",
    intent: "informational",
  },
  {
    slug: "bill-of-supply-format",
    title: "Bill of Supply Format Under GST — Who Needs It?",
    description: "Learn when to use a bill of supply instead of a tax invoice. Free format download for composition dealers.",
    intent: "informational",
  },

  // ── GST compliance ────────────────────────────────────────────────────────
  {
    slug: "gst-return-filing-guide",
    title: "GST Return Filing Guide 2025 — GSTR-1, 3B & Annual",
    description: "Complete guide to filing GST returns in India. Covers GSTR-1, GSTR-3B, GSTR-9 with due dates and penalties.",
    intent: "informational",
  },
  {
    slug: "gstr-1-filing-guide",
    title: "GSTR-1 Filing Guide — How to File Sales Return Online",
    description: "Step-by-step guide to filing GSTR-1 on the GST portal. Covers B2B, B2C, exports and amendments.",
    intent: "informational",
  },
  {
    slug: "gstr-3b-filing-guide",
    title: "GSTR-3B Filing Guide — Monthly Summary Return",
    description: "How to file GSTR-3B correctly. Covers ITC claims, tax payment and common mistakes to avoid.",
    intent: "informational",
  },

  // ── Industry verticals (usecase) ──────────────────────────────────────────
  {
    slug: "gst-for-retail-shop",
    title: "GST Billing Software for Retail Shops — Free Trial",
    description: "Manage GST billing for your retail shop. Create invoices, track inventory and file returns — all in one app.",
    intent: "usecase",
  },
  {
    slug: "gst-for-freelancers",
    title: "GST for Freelancers India — Registration, Invoicing & Returns",
    description: "Complete GST guide for Indian freelancers. When to register, how to invoice clients and file returns.",
    intent: "usecase",
  },
  {
    slug: "gst-for-traders",
    title: "GST Billing for Traders — Wholesale & Retail",
    description: "GST billing solution for traders. Handle B2B invoices, e-way bills and purchase orders in one platform.",
    intent: "usecase",
  },
  {
    slug: "gst-for-manufacturers",
    title: "GST Billing for Manufacturers — Production & Sales",
    description: "Manage GST compliance for manufacturing businesses. Track raw materials, production and finished goods.",
    intent: "usecase",
  },
  {
    slug: "gst-for-service-providers",
    title: "GST Billing for Service Providers — SAC Codes & Invoicing",
    description: "Create GST invoices for services with correct SAC codes. Manage clients, track payments and file returns.",
    intent: "usecase",
  },
  {
    slug: "gst-billing-for-restaurants",
    title: "GST Billing Software for Restaurants — 5% & 12% Rates",
    description: "Restaurant-specific GST billing. Handle dine-in, takeaway and delivery with correct GST rates.",
    intent: "usecase",
  },
  {
    slug: "gst-billing-for-medical-shops",
    title: "GST Billing for Medical Shops & Pharmacies",
    description: "Pharmacy billing with GST. Handle medicine HSN codes, 0%/5%/12% rates and batch tracking.",
    intent: "usecase",
  },
  {
    slug: "gst-billing-for-construction",
    title: "GST for Construction Business — Works Contract & ITC",
    description: "GST billing for construction companies. Handle works contracts, RCM, ITC restrictions and subcontractors.",
    intent: "usecase",
  },

  // ── Competitor alternatives (comparison) ──────────────────────────────────
  {
    slug: "tally-alternative-india",
    title: "Best Tally Alternative in India 2025 — Cloud-Based & Affordable",
    description: "Looking for a Tally alternative? Kampony offers cloud-based GST billing at a fraction of the cost. No installation needed.",
    intent: "comparison",
  },
  {
    slug: "zoho-books-alternative",
    title: "Zoho Books Alternative for Indian MSMEs — Simpler & Cheaper",
    description: "Compare Zoho Books vs Kampony. Get GST-compliant invoicing, inventory and reports at ₹149/month.",
    intent: "comparison",
  },
  {
    slug: "quickbooks-alternative-india",
    title: "QuickBooks Alternative India — GST-Ready Billing Software",
    description: "QuickBooks not GST-friendly? Switch to Kampony — built for Indian GST compliance from the ground up.",
    intent: "comparison",
  },
  {
    slug: "vyapar-alternative",
    title: "Vyapar Alternative — Web-Based GST Billing with More Features",
    description: "Compare Vyapar vs Kampony. Get web access, Telegram bot, e-way bills and advanced reports.",
    intent: "comparison",
  },
  {
    slug: "marg-erp-alternative",
    title: "Marg ERP Alternative — Modern Cloud GST Billing",
    description: "Replace Marg ERP with a modern cloud solution. No installation, automatic updates, GST-compliant.",
    intent: "comparison",
  },

  // ── Business size ─────────────────────────────────────────────────────────
  {
    slug: "gst-billing-software-small-business",
    title: "GST Billing Software for Small Business India — Free Plan",
    description: "Best GST billing software for small businesses in India. Start free, upgrade as you grow. No accounting expertise needed.",
    intent: "informational",
  },
  {
    slug: "billing-software-for-startups",
    title: "Billing Software for Startups India — GST Compliant",
    description: "Affordable GST billing for Indian startups. Free plan with 10 invoices. Scale to unlimited as you grow.",
    intent: "informational",
  },
  {
    slug: "billing-software-for-msme",
    title: "Best Billing Software for MSME India 2025",
    description: "GST billing software designed for Indian MSMEs. Invoicing, inventory, e-way bills and reports in one platform.",
    intent: "informational",
  },
  {
    slug: "billing-software-for-sole-proprietor",
    title: "Billing Software for Sole Proprietors India — Simple & Free",
    description: "Easy GST billing for sole proprietors. Create invoices, track payments and file returns without an accountant.",
    intent: "informational",
  },
  {
    slug: "cloud-billing-software-india",
    title: "Cloud Billing Software India — Access Anywhere, Anytime",
    description: "Cloud-based GST billing software for India. No installation, automatic backups, access from any device.",
    intent: "informational",
  },
  {
    slug: "mobile-billing-app-india",
    title: "Mobile Billing App India — Create GST Invoices on Phone",
    description: "Create GST invoices from your mobile. Works on any browser + Telegram bot for billing on the go.",
    intent: "informational",
  },
];

/** Convenience: just the slugs (used in generateStaticParams etc.) */
export const SEO_KEYWORDS: string[] = SEO_PAGES.map((p) => p.slug);

/** Static pages for sitemap */
export const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/features", priority: "0.9", changefreq: "monthly" },
  { path: "/templates", priority: "0.8", changefreq: "monthly" },
  { path: "/faqs", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
  { path: "/terms", priority: "0.4", changefreq: "yearly" },
  { path: "/privacy", priority: "0.4", changefreq: "yearly" },
];
