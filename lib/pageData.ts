/**
 * Shared data used across the free-gst-calculator and gst-invoice-generator-free pages.
 * Centralised here to avoid duplication — previously copy-pasted in both page files.
 */



export const SHARED_FEATURES = [
  {
    title: "GST-Compliant Invoices",
    desc: "Tax invoices, bill of supply, proforma and delivery challans with auto CGST/SGST/IGST.",
  },
  {
    title: "HSN/SAC Code Support",
    desc: "Search and apply correct HSN/SAC codes with auto GST rate lookup.",
  },
  {
    title: "E-Way Bill & IRN",
    desc: "Generate e-way bills and IRN with QR codes directly from your invoice.",
  },
  {
    title: "Inventory Management",
    desc: "Track stock levels, get low-stock alerts and manage purchases.",
  },
  {
    title: "Reports & Ledgers",
    desc: "Sales, purchase, profit, GST and customer ledgers — exportable to Excel.",
  },
  {
    title: "Telegram Bot",
    desc: "Create invoices and check payments right from Telegram.",
  },
] as const;

export const SHARED_FAQS = [
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
] as const;

/** Build a FAQ JSON-LD schema array from any FAQ list. */
export function buildFaqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Format a number as Indian Rupees. */
export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);
