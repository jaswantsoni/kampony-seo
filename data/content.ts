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
  "proforma-invoice-format-india": `
<article class="prose prose-lg max-w-none">

  <h2>What is a Proforma Invoice?</h2>

  <p>A <strong>Proforma Invoice</strong> is a preliminary commercial document issued by a seller to a buyer before goods are supplied or services are delivered. It provides an estimate of the products, services, pricing, taxes, shipping charges, and payment terms that will appear on the final invoice.</p>

  <p>Unlike a tax invoice, a proforma invoice is not a demand for payment and does not create an accounting transaction. Instead, it serves as a quotation in invoice format, helping buyers understand costs before placing an order.</p>

  <p>Businesses across India use proforma invoices for domestic sales, exports, custom orders, project-based services, advance approvals, and international trade transactions.</p>

  <h2>Why Businesses Use Proforma Invoices</h2>

  <p>A proforma invoice helps both buyers and sellers establish clarity before a transaction is finalized.</p>

  <ul>
    <li>Provides detailed cost estimates before confirming an order.</li>
    <li>Helps customers secure internal approvals and budgets.</li>
    <li>Reduces misunderstandings regarding pricing and taxes.</li>
    <li>Supports import-export documentation requirements.</li>
    <li>Allows sellers to communicate terms before issuing a tax invoice.</li>
    <li>Improves transparency in B2B transactions.</li>
  </ul>

  <h2>When Should a Proforma Invoice Be Issued?</h2>

  <h3>1. Before Confirming a Sales Order</h3>

  <p>Many businesses issue a proforma invoice after price negotiations but before order confirmation.</p>

  <table>
    <thead>
      <tr>
        <th>Stage</th>
        <th>Document Used</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Price Discussion</td>
        <td>Quotation</td>
      </tr>
      <tr>
        <td>Order Approval</td>
        <td>Proforma Invoice</td>
      </tr>
      <tr>
        <td>Supply of Goods</td>
        <td>Tax Invoice</td>
      </tr>
    </tbody>
  </table>

  <h3>2. For Advance Payments</h3>

  <p>Businesses often send a proforma invoice before collecting advance payments from customers.</p>

  <h3>3. For Import and Export Transactions</h3>

  <p>International buyers frequently require a proforma invoice to obtain import licenses, arrange financing, calculate duties, or complete customs documentation.</p>

  <h3>4. For Custom Manufacturing Orders</h3>

  <p>When products are manufactured according to customer specifications, a proforma invoice helps document agreed pricing and requirements before production begins.</p>

  <h3>5. For Service-Based Projects</h3>

  <p>Consultants, agencies, software companies, and contractors use proforma invoices to communicate project costs before commencing work.</p>

  <h2>Is a Proforma Invoice Valid Under GST?</h2>

  <p>Yes, businesses can issue proforma invoices under GST for quotation and estimation purposes.</p>

  <p>However, a proforma invoice:</p>

  <ul>
    <li>Is not a GST tax invoice.</li>
    <li>Does not create GST liability.</li>
    <li>Cannot be used to claim Input Tax Credit (ITC).</li>
    <li>Cannot be reported in GST returns.</li>
    <li>Must be replaced by a valid tax invoice when the supply occurs.</li>
  </ul>

  <p>GST becomes applicable only when the actual supply takes place and a tax invoice is issued.</p>

  <h2>Proforma Invoice vs Tax Invoice</h2>

  <table>
    <thead>
      <tr>
        <th>Aspect</th>
        <th>Proforma Invoice</th>
        <th>Tax Invoice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Purpose</td>
        <td>Estimate / Proposal</td>
        <td>Final Billing Document</td>
      </tr>
      <tr>
        <td>Legal Demand for Payment</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>GST Liability</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>Accounting Entry</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>Used in GST Returns</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td>ITC Eligibility</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
    </tbody>
  </table>

  <h2>Mandatory Details in a Proforma Invoice</h2>

  <p>Although there is no prescribed GST format for proforma invoices, businesses should include all important commercial information.</p>

  <h3>Business Information</h3>

  <ul>
    <li>Business Name</li>
    <li>Business Address</li>
    <li>GSTIN (if registered)</li>
    <li>Contact Number</li>
    <li>Email Address</li>
  </ul>

  <h3>Customer Information</h3>

  <ul>
    <li>Customer Name</li>
    <li>Company Name</li>
    <li>Billing Address</li>
    <li>Shipping Address</li>
    <li>GSTIN (if applicable)</li>
  </ul>

  <h3>Invoice Information</h3>

  <ul>
    <li>Proforma Invoice Number</li>
    <li>Date of Issue</li>
    <li>Validity Period</li>
    <li>Reference Number</li>
  </ul>

  <h3>Product or Service Details</h3>

  <ul>
    <li>Description</li>
    <li>Quantity</li>
    <li>Unit Price</li>
    <li>Discount</li>
    <li>Tax Rate</li>
    <li>Total Amount</li>
  </ul>

  <h3>Payment Terms</h3>

  <ul>
    <li>Advance Payment Requirements</li>
    <li>Delivery Timeline</li>
    <li>Payment Due Date</li>
    <li>Bank Details</li>
  </ul>

  <h2>Free Proforma Invoice Format India</h2>

  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px;background:#f9fafb;margin:16px 0">

    <p>
      <strong>ABC Enterprises</strong><br/>
      GSTIN: 27ABCDE1234F1Z5<br/>
      Mumbai, Maharashtra
    </p>

    <h3 style="margin-top:16px">PROFORMA INVOICE</h3>

    <p>
      <strong>Proforma Invoice No:</strong> PI-2026-001<br/>
      <strong>Date:</strong> 05 June 2026<br/>
      <strong>Valid Until:</strong> 20 June 2026
    </p>

    <p>
      <strong>Customer:</strong> XYZ Technologies Pvt Ltd<br/>
      GSTIN: 07ABCDE1234F1Z5
    </p>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Software Development Services</td>
          <td>1</td>
          <td>₹50,000</td>
          <td>₹50,000</td>
        </tr>
      </tbody>
    </table>

    <table style="margin-top:12px">
      <thead>
        <tr>
          <th>Particular</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Subtotal</td>
          <td>₹50,000</td>
        </tr>
        <tr>
          <td>GST (18%)</td>
          <td>₹9,000</td>
        </tr>
        <tr>
          <td><strong>Total Estimate</strong></td>
          <td><strong>₹59,000</strong></td>
        </tr>
      </tbody>
    </table>

    <p style="margin-top:12px">
      <strong>Note:</strong> This is a proforma invoice issued for estimation purposes only and does not constitute a tax invoice.
    </p>

  </div>

  <h2>How to Create a Proforma Invoice</h2>

  <h3>Step 1: Assign a Unique Number</h3>

  <p>Create a unique numbering sequence such as PI-2026-001 for tracking purposes.</p>

  <h3>Step 2: Add Customer Information</h3>

  <p>Include complete customer details to avoid confusion later during invoicing.</p>

  <h3>Step 3: Enter Product or Service Details</h3>

  <p>Clearly mention quantities, rates, discounts, and taxes.</p>

  <h3>Step 4: Define Terms and Conditions</h3>

  <p>Specify delivery timelines, payment schedules, warranty information, and validity period.</p>

  <h3>Step 5: Review Before Sending</h3>

  <p>Verify calculations and customer details before sharing the document.</p>

  <h2>Benefits of Using Proforma Invoices</h2>

  <ul>
    <li><strong>Professional communication</strong> with customers before order confirmation.</li>
    <li><strong>Better cash flow planning</strong> through advance payment requests.</li>
    <li><strong>Reduced disputes</strong> regarding pricing and taxes.</li>
    <li><strong>Improved budgeting</strong> for buyers.</li>
    <li><strong>Smoother international trade</strong> processes.</li>
    <li><strong>Higher conversion rates</strong> from quotation to confirmed order.</li>
  </ul>

  <h2>Common Mistakes to Avoid</h2>

  <h3>Treating It as a Tax Invoice</h3>

  <p>A proforma invoice cannot replace a GST tax invoice.</p>

  <h3>Missing Validity Period</h3>

  <p>Prices can change over time, so every proforma invoice should specify an expiry date.</p>

  <h3>Incorrect Tax Estimates</h3>

  <p>Using wrong GST rates may create confusion during final billing.</p>

  <h3>Incomplete Terms</h3>

  <p>Always include payment and delivery conditions to prevent future disputes.</p>

  <h2>How Kampony Helps Create Proforma Invoices</h2>

  <p>Kampony makes proforma invoice creation simple for businesses, freelancers, consultants, manufacturers, and service providers.</p>

  <ul>
    <li>Create professional proforma invoices in seconds.</li>
    <li>Convert proforma invoices into tax invoices with one click.</li>
    <li>Auto-calculate GST and discounts.</li>
    <li>Generate PDF documents instantly.</li>
    <li>Share invoices through WhatsApp and email.</li>
    <li>Manage customers, products, and pricing from a single dashboard.</li>
    <li>Track quotation-to-order conversion rates.</li>
    <li>Maintain complete document history and audit trails.</li>
  </ul>

  <p>Whether you're a freelancer, startup, wholesaler, manufacturer, exporter, or enterprise business, Kampony helps streamline invoicing and sales workflows while maintaining professional documentation standards.</p>

  <h2>Frequently Asked Questions (FAQs)</h2>

  <h3>Is a proforma invoice legally binding?</h3>

  <p>No. A proforma invoice is an estimate and does not create a legal payment obligation like a tax invoice.</p>

  <h3>Can GST be claimed using a proforma invoice?</h3>

  <p>No. Input Tax Credit can only be claimed using a valid GST tax invoice.</p>

  <h3>Can a proforma invoice become a tax invoice?</h3>

  <p>Not automatically. A separate tax invoice must be issued after the supply of goods or services.</p>

  <h3>Do exporters use proforma invoices?</h3>

  <p>Yes. Proforma invoices are widely used in export transactions for customs, import permits, and international payments.</p>

  <h3>Can Kampony generate proforma invoices?</h3>

  <p>Yes. Kampony enables businesses to create, share, track, and convert proforma invoices into final invoices seamlessly.</p>

  <h2>Conclusion</h2>

  <p>A Proforma Invoice is an essential business document that helps buyers understand pricing, taxes, delivery schedules, and payment terms before placing an order. While it does not create GST liability or accounting entries, it plays a crucial role in professional sales processes and customer communication.</p>

  <p>Using a modern invoicing platform like Kampony allows businesses to generate professional proforma invoices, manage approvals, convert them into tax invoices, and streamline the complete sales lifecycle from quotation to payment.</p>

</article>
`,
  "credit-note-format-gst": `
<article class="prose prose-lg max-w-none">

  <h2>What is a Credit Note Under GST?</h2>
  <p>A <strong>Credit Note</strong> is a legal document issued by a seller to a buyer when the value of an invoice needs to be reduced after it has already been issued. It serves as formal proof that the seller has adjusted the taxable value, GST amount, or quantity supplied in the original invoice.</p>
  <p>Under the Goods and Services Tax (GST) regime in India, businesses must issue a credit note whenever there is a reduction in the value of goods or services supplied. Correct and timely credit note issuance is essential for accurate GST returns, ITC (Input Tax Credit) adjustments, and audit compliance.</p>
  <p>Credit notes are governed under <strong>Section 34 of the CGST Act, 2017</strong>.</p>

  <h2>Legal Provision for Credit Notes Under GST</h2>
  <p>Section 34(1) of the CGST Act states that a registered supplier may issue a credit note where:</p>
  <ul>
    <li>Taxable value in the original invoice is higher than the actual taxable value.</li>
    <li>Tax charged in the original invoice is higher than the actual tax payable.</li>
    <li>The recipient has returned the goods.</li>
    <li>The services supplied are found to be deficient.</li>
  </ul>
  <p>Credit notes must be reported in the GST return for the month in which they are issued. The last date to issue a credit note for a financial year is the earlier of: 30 September following the end of that financial year, or the date of filing the annual return.</p>

  <h2>When Should a Credit Note Be Issued?</h2>

  <h3>1. Goods Returned by the Customer</h3>
  <p>If a customer returns products after receiving them, the seller can issue a credit note to reduce the original invoice value.</p>
  <table>
    <thead><tr><th>Item</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Original Invoice Value</td><td>₹50,000</td></tr>
      <tr><td>Goods Returned (10 units × ₹1,000)</td><td>₹10,000</td></tr>
      <tr><td>Credit Note Amount</td><td>₹10,000 + GST</td></tr>
    </tbody>
  </table>

  <h3>2. Excess Amount Charged</h3>
  <p>When an invoice is generated with a higher price than agreed, a credit note corrects the overcharged amount and the corresponding GST.</p>

  <h3>3. Damaged or Defective Goods</h3>
  <p>If goods supplied are defective or damaged and the seller provides compensation to the buyer, a credit note documents the adjustment.</p>

  <h3>4. Post-Sale Discounts</h3>
  <p>When discounts are offered after invoice generation — provided the buyer reverses the ITC attributable to the discount — a credit note can reflect the adjusted value.</p>

  <h3>5. Service Adjustments</h3>
  <p>For service providers, project scope reductions, early-completion credits, or billing corrections may require issuance of a credit note.</p>

  <h3>6. Cancellation of Supply</h3>
  <p>If a supply is cancelled after the invoice has been raised and payment has not been made, a credit note for the full invoice value may be issued.</p>

  <h2>Mandatory Fields in a GST Credit Note</h2>
  <p>A valid GST credit note must contain the following information:</p>

  <h3>Supplier Details</h3>
  <ul>
    <li>Business / Trade Name</li>
    <li>Registered Address</li>
    <li>GSTIN</li>
    <li>State and State Code</li>
  </ul>

  <h3>Buyer Details</h3>
  <ul>
    <li>Customer Name</li>
    <li>Customer Address</li>
    <li>Customer GSTIN (if registered)</li>
  </ul>

  <h3>Credit Note Information</h3>
  <ul>
    <li>Unique Credit Note Number (sequential, per financial year)</li>
    <li>Date of Issue</li>
    <li>Reference to Original Invoice Number</li>
    <li>Reference to Original Invoice Date</li>
    <li>Reason for Issuance</li>
  </ul>

  <h3>Item / Service Details</h3>
  <ul>
    <li>Description of Goods or Services</li>
    <li>HSN Code (goods) or SAC Code (services)</li>
    <li>Quantity Returned or Adjusted</li>
    <li>Unit and Unit Price</li>
    <li>Taxable Value Being Reduced</li>
  </ul>

  <h3>GST Details</h3>
  <ul>
    <li>GST Rate Applied</li>
    <li>CGST Amount (intra-state)</li>
    <li>SGST / UTGST Amount (intra-state)</li>
    <li>IGST Amount (inter-state)</li>
  </ul>

  <h3>Financial Summary</h3>
  <ul>
    <li>Total Taxable Value Reduction</li>
    <li>Total GST Reduction</li>
    <li>Net Credit Note Value</li>
  </ul>

  <h2>Standard Credit Note Format Under GST</h2>
  <div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px;background:#f9fafb;margin:16px 0">
    <p><strong>ABC Enterprises</strong><br/>GSTIN: 27AABCE1234F1Z5<br/>Address: Andheri East, Mumbai, Maharashtra</p>
    <h3 style="margin-top:16px">Credit Note</h3>
    <p>
      <strong>Credit Note No.:</strong> CN-2026-001<br/>
      <strong>Date:</strong> 05 June 2026<br/>
      <strong>Reference Invoice No.:</strong> INV-2026-145<br/>
      <strong>Invoice Date:</strong> 10 May 2026<br/>
      <strong>Customer:</strong> ABC Traders — GSTIN: 07ABCDE1234F1Z5<br/>
      <strong>Reason:</strong> Product Return
    </p>
    <table>
      <thead><tr><th>Description</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Taxable Value</th></tr></thead>
      <tbody>
        <tr><td>Electronic Components</td><td>8542</td><td>10</td><td>₹1,000</td><td>₹10,000</td></tr>
      </tbody>
    </table>
    <table style="margin-top:12px">
      <thead><tr><th>Tax Type</th><th>Rate</th><th>Amount</th></tr></thead>
      <tbody>
        <tr><td>CGST</td><td>9%</td><td>₹900</td></tr>
        <tr><td>SGST</td><td>9%</td><td>₹900</td></tr>
      </tbody>
    </table>
    <p style="margin-top:12px"><strong>Total Credit Note Amount: ₹11,800</strong></p>
    <p><em>Note: This credit note reduces the liability of Invoice No. INV-2026-145 by ₹11,800.</em></p>
  </div>

  <h2>Credit Note Accounting Entry</h2>
  <p>When a credit note is issued the accounting entries are:</p>

  <h3>Seller (Supplier) Books</h3>
  <ul>
    <li>Sales Returns A/C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dr</li>
    <li>Output GST A/C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dr</li>
    <li>&nbsp;&nbsp;&nbsp;&nbsp;To Customer A/C</li>
  </ul>

  <h3>Buyer (Recipient) Books</h3>
  <ul>
    <li>Supplier A/C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dr</li>
    <li>&nbsp;&nbsp;&nbsp;&nbsp;To Purchase Returns A/C</li>
    <li>&nbsp;&nbsp;&nbsp;&nbsp;To Input GST A/C (ITC reversal)</li>
  </ul>
  <p>The buyer must reverse the ITC claimed on the original invoice to the extent of the credit note — failure to do so can attract interest and penalties.</p>

  <h2>Credit Note vs Debit Note</h2>
  <table>
    <thead><tr><th>Aspect</th><th>Credit Note</th><th>Debit Note</th></tr></thead>
    <tbody>
      <tr><td>Issued by</td><td>Supplier</td><td>Supplier</td></tr>
      <tr><td>Effect on invoice value</td><td>Reduces</td><td>Increases</td></tr>
      <tr><td>GST impact</td><td>Reduces output tax liability</td><td>Increases output tax liability</td></tr>
      <tr><td>Buyer ITC impact</td><td>Buyer must reverse ITC</td><td>Buyer can claim additional ITC</td></tr>
      <tr><td>Common reason</td><td>Returns, overcharging, discounts</td><td>Undercharging, extra supply</td></tr>
      <tr><td>GST return table</td><td>GSTR-1 Table 9B</td><td>GSTR-1 Table 9B</td></tr>
    </tbody>
  </table>

  <h2>Credit Note vs Tax Invoice</h2>
  <table>
    <thead><tr><th>Credit Note</th><th>Tax Invoice</th></tr></thead>
    <tbody>
      <tr><td>Issued after the original invoice</td><td>Issued at the time of supply</td></tr>
      <tr><td>Reduces invoice value</td><td>Records the original sale</td></tr>
      <tr><td>Must reference an existing invoice</td><td>Stands as an independent document</td></tr>
      <tr><td>Used for adjustments and corrections</td><td>Used for recording taxable supplies</td></tr>
    </tbody>
  </table>

  <h2>GST Return Reporting of Credit Notes</h2>
  <p>Credit notes are reported in <strong>GSTR-1 under Table 9B</strong> (Credit / Debit Notes). Key compliance points:</p>
  <ul>
    <li>The credit note must be linked to the original invoice number.</li>
    <li>GST reduction is reflected in the supplier's output tax liability.</li>
    <li>The recipient's ITC must be reversed by the equivalent amount.</li>
    <li>Credit notes cannot be issued after 30 September of the next financial year or the annual return filing date, whichever is earlier.</li>
    <li>Unreported credit notes can cause mismatches in GSTR-2B reconciliation.</li>
  </ul>

  <h2>Common Mistakes to Avoid</h2>

  <h3>Issuing Without Referencing the Original Invoice</h3>
  <p>Every credit note must clearly state the original invoice number and date. Missing this link breaks the audit trail and causes GSTR-1 mismatches.</p>

  <h3>Incorrect GST Calculations</h3>
  <p>Using the wrong rate or applying CGST/SGST instead of IGST (or vice versa) for the adjustment creates reconciliation issues.</p>

  <h3>Missing the Time Limit</h3>
  <p>Credit notes issued after the prescribed deadline cannot be used to reduce GST liability for that period.</p>

  <h3>Buyer Not Reversing ITC</h3>
  <p>If the recipient does not reverse ITC on receipt of the credit note, the tax department may raise a demand with interest.</p>

  <h3>Incomplete Mandatory Fields</h3>
  <p>Omitting the reason for issuance, HSN/SAC codes, or GSTIN of either party can make the credit note non-compliant.</p>

  <h2>Benefits of Proper Credit Note Management</h2>
  <ul>
    <li><strong>Accurate financial records</strong> — Maintains a clean trail of all invoice adjustments.</li>
    <li><strong>GST compliance</strong> — Ensures correct output tax and ITC reporting in GSTR-1 and GSTR-3B.</li>
    <li><strong>Improved customer relationships</strong> — Provides a professional, documented process for handling returns and corrections.</li>
    <li><strong>Easier audits</strong> — A complete credit note trail simplifies GST audits and assessments.</li>
    <li><strong>Reduced penalties</strong> — Timely and accurate credit notes avoid interest and late-filing penalties.</li>
  </ul>

  <h2>How Kampony Helps Manage Credit Notes</h2>
  <p>Kampony simplifies GST credit note compliance for Indian businesses with purpose-built features:</p>
  <ul>
    <li>Create GST-compliant credit notes in seconds — linked directly to the original invoice.</li>
    <li>Automatic CGST / SGST / IGST calculation based on transaction type.</li>
    <li>Sequential credit note numbering per financial year.</li>
    <li>Centralised audit trail for all invoice adjustments.</li>
    <li>Export credit note data for GSTR-1 reporting.</li>
    <li>PDF download and WhatsApp / email sharing in one click.</li>
    <li>Multi-user access so your accountant and operations team stay in sync.</li>
  </ul>
  <p>With Kampony, businesses can manage invoices, credit notes, debit notes, e-way bills, GST reports, inventory, and accounting workflows from a single cloud-based platform — with no installation required.</p>

  <h2>Conclusion</h2>
  <p>A Credit Note under GST is an essential document for correcting overcharges, processing returns, applying post-sale discounts, and adjusting service billing. Issued correctly and on time, it keeps your output tax liability accurate, protects your customers' ITC, and ensures clean GST return filings.</p>
  <p>Maintaining proper credit note records reduces the risk of tax mismatches, audit complications, and penalties. Using a purpose-built platform like Kampony automates the entire process — from document creation to GST return data — so your team can focus on running the business.</p>

</article>
  `,

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
