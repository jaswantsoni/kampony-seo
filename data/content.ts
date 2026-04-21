import type { SeoPage } from "./keywords";

export interface FAQ { q: string; a: string; }
export interface PageContent {
  h1: string;
  intro: string;
  features: { title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  faqs: FAQ[];
  relatedPages: SeoPage[];
  toolHook?: { label: string; href: string };
}

export function slugToTitle(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function getMetaDescription(page: SeoPage): string {
  return page.description;
}

// ── Intent-based content variation ──────────────────────────────────────────

function toolContent(page: SeoPage): Partial<PageContent> {
  return {
    intro: `${page.title} — use Kampony's free online tool to get instant results. 
    No signup required. Built specifically for Indian GST rules with CGST, SGST and IGST support.`,
    steps: [
      { step: "01", title: "Enter your details", desc: "Input the amount, GST rate and transaction type (intra-state or inter-state)." },
      { step: "02", title: "Get instant results", desc: "See CGST, SGST or IGST breakdown instantly. No manual calculation needed." },
      { step: "03", title: "Use in your invoice", desc: "Apply the calculated tax directly in Kampony to generate a GST-compliant invoice." },
      { step: "04", title: "Download & share", desc: "Download the invoice as PDF or share via WhatsApp and email in one click." },
    ],
    toolHook: { label: "Try Free GST Invoice Generator →", href: "/gst-invoice-generator-free" },
  };
}

function comparisonContent(page: SeoPage): Partial<PageContent> {
  const competitor = page.slug.replace("-alternative", "").replace("-india", "").replace(/-/g, " ");
  return {
    intro: `Considering switching from ${competitor}? Kampony is a modern, cloud-based GST billing platform 
    built specifically for Indian businesses. No installation, no annual contracts, and plans starting at ₹149/month.`,
    steps: [
      { step: "01", title: "Sign up free", desc: "Create your Kampony account in under a minute. No credit card required." },
      { step: "02", title: "Import your data", desc: "Import customers and products from Excel. Your existing data migrates in minutes." },
      { step: "03", title: "Create your first invoice", desc: "Generate a GST-compliant invoice immediately. Same workflow, better interface." },
      { step: "04", title: "Cancel your old subscription", desc: "Once you're comfortable, cancel your old software. Most users switch in a week." },
    ],
    toolHook: { label: "Compare Plans & Pricing →", href: "https://www.kampony.com/#pricing" },
  };
}

function usecaseContent(page: SeoPage): Partial<PageContent> {
  return {
    intro: `Kampony is designed to handle the specific GST billing needs of ${slugToTitle(page.slug).toLowerCase()}. 
    From correct tax rates to industry-specific document types — everything is pre-configured so you can focus on your business.`,
    steps: [
      { step: "01", title: "Set up your business profile", desc: "Add GSTIN, trade name and bank details. Kampony auto-fills from GSTIN lookup." },
      { step: "02", title: "Configure your products/services", desc: "Add items with correct HSN/SAC codes and GST rates. Bulk import via Excel." },
      { step: "03", title: "Create invoices in seconds", desc: "Select customer, add items, and your GST invoice is ready. Auto CGST/SGST/IGST." },
      { step: "04", title: "File returns with ease", desc: "Export GSTR-1 and GSTR-3B data directly from Kampony reports." },
    ],
    toolHook: { label: "Try Free GST Calculator →", href: "/free-gst-calculator" },
  };
}

function informationalContent(page: SeoPage): Partial<PageContent> {
  return {
    intro: `Understanding ${page.title.toLowerCase()} is essential for GST compliance in India. 
    This guide covers everything you need to know — from mandatory fields and formats to common mistakes and how Kampony automates the entire process.`,
    steps: [
      { step: "01", title: "Understand the requirements", desc: "Learn what's mandatory under GST law for this document type." },
      { step: "02", title: "Set up Kampony", desc: "Create your free account and configure your business profile with GSTIN." },
      { step: "03", title: "Generate the document", desc: "Kampony auto-fills all required fields. Just select customer and items." },
      { step: "04", title: "Download, share & file", desc: "PDF download, WhatsApp sharing and GST return data — all in one place." },
    ],
    toolHook: { label: "Generate Invoice Free →", href: "/gst-invoice-generator-free" },
  };
}

// ── Common features (shared across all intents) ──────────────────────────────

const COMMON_FEATURES = [
  { title: "GST-Compliant Invoices", desc: "Tax invoices, bill of supply, proforma and delivery challans with auto CGST/SGST/IGST." },
  { title: "HSN/SAC Code Support", desc: "Search and apply correct HSN/SAC codes with auto GST rate lookup." },
  { title: "E-Way Bill & IRN", desc: "Generate e-way bills and IRN with QR codes directly from your invoice." },
  { title: "Inventory Management", desc: "Track stock levels, get low-stock alerts and manage purchases." },
  { title: "Reports & Ledgers", desc: "Sales, purchase, profit, GST and customer ledgers — exportable to Excel." },
  { title: "Telegram Bot", desc: "Create invoices and check payments right from Telegram." },
];

// ── Common FAQs ──────────────────────────────────────────────────────────────

function buildFaqs(page: SeoPage): FAQ[] {
  const title = page.title;
  return [
    {
      q: `What is ${slugToTitle(page.slug)}?`,
      a: `${title} is an important aspect of GST compliance for Indian businesses. 
      It involves creating and managing GST-compliant documents with correct tax calculations (CGST, SGST or IGST) 
      based on whether the transaction is intra-state or inter-state.`,
    },
    {
      q: "Is Kampony free to use?",
      a: "Yes. Kampony offers a free plan with 10 invoices, unlimited products and customers. Paid plans start at ₹149/month for unlimited invoices.",
    },
    {
      q: "Does Kampony support e-way bills and IRN?",
      a: "Yes. Premium plan users can generate e-way bills, IRN and QR codes directly from invoices in one click.",
    },
    {
      q: "Can I use Kampony on mobile?",
      a: "Yes. Kampony works on any mobile browser. You can also create invoices via the Telegram bot without opening a browser.",
    },
    {
      q: "How is Kampony different from Tally or Vyapar?",
      a: "Kampony is 100% cloud-based — no installation, no USB dongles, automatic updates. Plans start at ₹149/month vs ₹18,000+ for Tally. Access from any device, anywhere.",
    },
    {
      q: "Is my business data secure?",
      a: "All data is encrypted and stored on secure cloud servers with HTTPS. We never share your data with third parties.",
    },
  ];
}

// ── Main export ──────────────────────────────────────────────────────────────

export function getPageContent(page: SeoPage, allPages: SeoPage[]): PageContent {
  // Pick intent-specific content variation
  const intentContent =
    page.intent === "tool" ? toolContent(page) :
    page.intent === "comparison" ? comparisonContent(page) :
    page.intent === "usecase" ? usecaseContent(page) :
    informationalContent(page);

  // Related pages: same intent first, then others — max 5
  const sameIntent = allPages.filter((p) => p.slug !== page.slug && p.intent === page.intent).slice(0, 3);
  const others = allPages.filter((p) => p.slug !== page.slug && p.intent !== page.intent).slice(0, 2);
  const relatedPages = [...sameIntent, ...others];

  return {
    h1: page.title,
    intro: intentContent.intro ?? "",
    features: COMMON_FEATURES,
    steps: intentContent.steps ?? [],
    faqs: buildFaqs(page),
    relatedPages,
    toolHook: intentContent.toolHook,
  };
}
