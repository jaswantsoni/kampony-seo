import type { SeoPage } from "./keywords";
import { SHARED_FEATURES, SHARED_FAQS } from "@/lib/pageData";

export interface FAQ { q: string; a: string; }
export interface PageContent {
  h1: string;
  intro: string;
  features: { title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  faqs: FAQ[];
  relatedPages: SeoPage[];
  toolHook?: { label: string; href: string };
  richContent?: string; // Full HTML article body for specific pages
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
// Imported from @/lib/pageData — single source of truth shared with tool pages.

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
    ...SHARED_FAQS,
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
    features: [...SHARED_FEATURES],
    steps: intentContent.steps ?? [],
    faqs: buildFaqs(page),
    relatedPages,
    toolHook: intentContent.toolHook,
    richContent: RICH_CONTENT[page.slug],
  };
}

// ── Rich article content for specific pages ──────────────────────────────────

const RICH_CONTENT: Record<string, string> = {
  "debit-note-format-gst": `
<article class="prose prose-lg max-w-none">

  <h2>Introduction</h2>
  <p>Businesses frequently encounter situations where an invoice issued to a customer requires modification. Sometimes the original invoice may have been raised for a lower amount, additional goods may be supplied later, or taxes may need revision. In such cases, GST law allows suppliers to issue a <strong>Debit Note</strong> to increase the value of a previously issued tax invoice.</p>
  <p>Understanding debit notes is essential for accountants, business owners, finance teams, and GST practitioners because improper documentation can lead to tax mismatches, compliance issues, and reconciliation challenges.</p>
  <p>This guide explains everything you need to know about Debit Notes under GST, including their meaning, format, mandatory fields, accounting treatment, GST implications, examples, and best practices.</p>

  <h2>What is a Debit Note?</h2>
  <p>A Debit Note is a commercial document issued by a supplier to a buyer indicating that the buyer's payable amount has increased compared to the amount stated in the original invoice.</p>
  <p>In simple terms, a debit note acts as a notification that: <em>"The amount charged earlier was lower than what should have been charged, and additional payment is now due."</em></p>
  <p>Under GST, a debit note enables businesses to legally increase the taxable value or tax amount related to an earlier invoice.</p>

  <h2>Legal Provision for Debit Notes Under GST</h2>
  <p>Debit Notes are governed under <strong>Section 34 of the CGST Act, 2017</strong>.</p>
  <p>A registered supplier may issue a debit note where:</p>
  <ul>
    <li>Taxable value charged is less than actual value.</li>
    <li>Tax charged is less than actual tax payable.</li>
    <li>Additional goods or services are supplied after invoice generation.</li>
    <li>Pricing adjustments increase invoice value.</li>
  </ul>
  <p>The supplier must maintain proper records and reflect the additional tax liability in GST returns.</p>

  <h2>Why Are Debit Notes Important?</h2>
  <p>Debit Notes play a critical role in GST compliance because they:</p>
  <ul>
    <li>Correct under-billed transactions</li>
    <li>Maintain transparency between buyer and seller</li>
    <li>Ensure accurate tax reporting</li>
    <li>Support audit and compliance requirements</li>
    <li>Help maintain proper accounting records</li>
    <li>Prevent revenue leakage</li>
  </ul>
  <p>Without debit notes, businesses may struggle to justify changes in invoice values during GST audits.</p>

  <h2>Situations Where a Debit Note is Issued</h2>

  <h3>1. Price Revision</h3>
  <p>A supplier may revise the price of goods after issuing an invoice.</p>
  <table>
    <thead><tr><th>Item</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Original Invoice Value</td><td>₹50,000</td></tr>
      <tr><td>Revised Price</td><td>₹55,000</td></tr>
      <tr><td>Debit Note Amount</td><td>₹5,000 + GST</td></tr>
    </tbody>
  </table>

  <h3>2. Additional Quantity Supplied</h3>
  <p>Sometimes extra goods are delivered after invoice generation. The supplier can issue a debit note for the value of the additional units.</p>

  <h3>3. Incorrect GST Calculation</h3>
  <p>If GST was charged at a lower amount than required, a debit note can be issued to recover the difference.</p>
  <table>
    <thead><tr><th>Item</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>GST Charged</td><td>₹8,000</td></tr>
      <tr><td>Actual GST Payable</td><td>₹10,000</td></tr>
      <tr><td>Debit Note for Shortfall</td><td>₹2,000</td></tr>
    </tbody>
  </table>

  <h3>4. Additional Service Charges</h3>
  <p>Charges such as transportation, installation, packaging, freight, and handling fees may be added later through a debit note.</p>

  <h3>5. Contract Value Increase</h3>
  <p>Construction, consulting, and project-based businesses often revise contract values after project execution. Debit notes help document these increases properly.</p>

  <h2>Mandatory Contents of a Debit Note Under GST</h2>
  <p>A GST-compliant Debit Note should include:</p>

  <h3>Supplier Details</h3>
  <ul>
    <li>Business Name</li>
    <li>Address</li>
    <li>GSTIN</li>
    <li>State Code</li>
  </ul>

  <h3>Buyer Details</h3>
  <ul>
    <li>Customer Name</li>
    <li>Customer Address</li>
    <li>GSTIN (if registered)</li>
  </ul>

  <h3>Debit Note Information</h3>
  <ul>
    <li>Unique Debit Note Number</li>
    <li>Date of Issue</li>
    <li>Reference Invoice Number</li>
    <li>Reference Invoice Date</li>
  </ul>

  <h3>Product / Service Information</h3>
  <ul>
    <li>Description</li>
    <li>HSN / SAC Code</li>
    <li>Quantity</li>
    <li>Unit Price</li>
    <li>Taxable Value</li>
  </ul>

  <h3>GST Details</h3>
  <ul>
    <li>CGST</li>
    <li>SGST</li>
    <li>IGST</li>
    <li>GST Rate</li>
  </ul>

  <h3>Financial Summary</h3>
  <ul>
    <li>Additional Taxable Amount</li>
    <li>Additional GST Amount</li>
    <li>Grand Total</li>
  </ul>

  <h3>Declaration</h3>
  <p>Reason for issuing the debit note.</p>

  <h2>Standard Debit Note Format</h2>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px;background:#f9fafb;margin:16px 0">
    <p><strong>ABC Enterprises</strong><br/>GSTIN: 06XXXXXXXXXXXX<br/>Address: Gurugram, Haryana</p>
    <h3 style="margin-top:16px">Debit Note</h3>
    <p><strong>Debit Note No.:</strong> DN-2026-015<br/>
    <strong>Date:</strong> 04 June 2026<br/>
    <strong>Reference Invoice No.:</strong> INV-2026-201<br/>
    <strong>Invoice Date:</strong> 15 May 2026<br/>
    <strong>Customer:</strong> XYZ Traders — GSTIN: 07XXXXXXXXXXXXX</p>
    <table>
      <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Taxable Value</th></tr></thead>
      <tbody>
        <tr><td>Additional Product Supply</td><td>10</td><td>₹1,000</td><td>₹10,000</td></tr>
      </tbody>
    </table>
    <table style="margin-top:12px">
      <thead><tr><th>Tax Type</th><th>Amount</th></tr></thead>
      <tbody>
        <tr><td>CGST 9%</td><td>₹900</td></tr>
        <tr><td>SGST 9%</td><td>₹900</td></tr>
      </tbody>
    </table>
    <p style="margin-top:12px"><strong>Total Debit Note Amount: ₹11,800</strong></p>
    <p><em>Reason: Additional quantity supplied after invoice generation.</em></p>
  </div>

  <h2>Debit Note Accounting Entry</h2>
  <p>When a debit note is issued:</p>

  <h3>Seller Books</h3>
  <ul>
    <li>Customer A/C Dr</li>
    <li>To Sales A/C</li>
    <li>To Output GST A/C</li>
  </ul>

  <h3>Buyer Books</h3>
  <ul>
    <li>Purchase A/C Dr</li>
    <li>Input GST A/C Dr</li>
    <li>To Supplier A/C</li>
  </ul>

  <h2>Debit Note vs Tax Invoice</h2>
  <table>
    <thead><tr><th>Debit Note</th><th>Tax Invoice</th></tr></thead>
    <tbody>
      <tr><td>Issued after invoice</td><td>Original transaction document</td></tr>
      <tr><td>Increases invoice value</td><td>Records initial sale</td></tr>
      <tr><td>References existing invoice</td><td>Independent document</td></tr>
      <tr><td>Used for corrections</td><td>Used for sales recording</td></tr>
    </tbody>
  </table>

  <h2>Debit Note vs Credit Note</h2>
  <table>
    <thead><tr><th>Debit Note</th><th>Credit Note</th></tr></thead>
    <tbody>
      <tr><td>Increases payable amount</td><td>Reduces payable amount</td></tr>
      <tr><td>Additional payment required</td><td>Refund or adjustment provided</td></tr>
      <tr><td>Increases GST liability</td><td>Reduces GST liability</td></tr>
      <tr><td>Issued for undercharging</td><td>Issued for overcharging</td></tr>
    </tbody>
  </table>

  <h2>GST Return Reporting of Debit Notes</h2>
  <p>Debit notes impact GST liability and should be reported accurately in GST returns. Businesses should:</p>
  <ul>
    <li>Link debit notes with original invoices</li>
    <li>Maintain supporting documents</li>
    <li>Reconcile debit notes with books of accounts</li>
    <li>Ensure correct GST reporting</li>
  </ul>

  <h2>Common Errors While Creating Debit Notes</h2>

  <h3>Missing Invoice References</h3>
  <p>Every debit note should clearly reference the original invoice.</p>

  <h3>Incorrect GST Rates</h3>
  <p>Using the wrong GST rate can lead to tax mismatches.</p>

  <h3>Duplicate Debit Notes</h3>
  <p>Creating multiple debit notes for the same adjustment may cause accounting issues.</p>

  <h3>Wrong Customer GSTIN</h3>
  <p>Incorrect GSTIN information can create reconciliation problems.</p>

  <h3>Missing Reason for Issue</h3>
  <p>Always mention why the debit note was generated.</p>

  <h2>Benefits of Automated Debit Note Management</h2>
  <p>Using ERP software instead of manual spreadsheets provides:</p>
  <ul>
    <li>Faster document generation</li>
    <li>Reduced accounting errors</li>
    <li>Automatic GST calculations</li>
    <li>Invoice linking</li>
    <li>Real-time reporting</li>
    <li>Audit-ready records</li>
    <li>Better compliance management</li>
  </ul>

  <h2>How Kampony Helps Businesses Manage Debit Notes</h2>
  <p>Kampony ERP allows businesses to create and manage GST-compliant debit notes in a few clicks.</p>
  <h3>Key Features</h3>
  <ul>
    <li>Automated debit note generation</li>
    <li>GST-compliant templates</li>
    <li>Invoice-to-debit-note linking</li>
    <li>Customer management</li>
    <li>Tax calculations</li>
    <li>Financial reporting</li>
    <li>Multi-user accounting workflows</li>
    <li>Cloud-based access</li>
  </ul>

  <h2>Conclusion</h2>
  <p>A Debit Note under GST is a crucial document used to increase the value of an already issued invoice. Whether the increase is due to pricing revisions, additional quantities, tax corrections, or supplementary charges, debit notes ensure proper accounting and GST compliance.</p>
  <p>Maintaining accurate debit note records helps businesses avoid tax disputes, improve financial transparency, and simplify audits. Implementing an ERP platform such as Kampony further streamlines the process by automating document creation, GST calculations, and accounting workflows.</p>

</article>
  `,
};
