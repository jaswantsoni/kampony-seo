# Rich Content Backlog

Pages missing long-form `richContent` in `data/content.ts`.
Only `debit-note-format-gst` currently has a full article.

Add content by inserting a key into the `RICH_CONTENT` record in `data/content.ts`:

```ts
const RICH_CONTENT: Record<string, string> = {
  "debit-note-format-gst": `...`, // ✅ done
  "your-slug-here": `<article>...</article>`,
};
```

---

## Priority 1 — Informational: Document Types
> Same structure as debit-note — quickest wins.

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `credit-note-format-gst` | Credit Note Format Under GST — When & How to Issue | ✅ done |
| 2 | `proforma-invoice-format-india` | Proforma Invoice Format India — Free Template & Guide | ✅ done |
| 3 | `delivery-challan-format` | Delivery Challan Format Under GST — Free Template | ⬜ todo |
| 4 | `bill-of-supply-format` | Bill of Supply Format Under GST — Who Needs It? | ⬜ todo |
| 5 | `e-way-bill-generation-online` | E-Way Bill Generation Online — Complete Guide 2025 | ⬜ todo |
| 6 | `gst-invoice-format-india` | GST Invoice Format India — Mandatory Fields & Free Template | ⬜ todo |
| 7 | `gst-invoice-with-qr-code` | GST Invoice with QR Code — IRN & e-Invoice Guide | ⬜ todo |

---

## Priority 2 — Informational: How-To & Guides

| # | Slug | Title | Status |
|---|---|---|---|
| 8 | `how-to-create-gst-invoice` | How to Create a GST Invoice — Step-by-Step Guide 2025 | ⬜ todo |
| 9 | `gst-invoice-online-india` | Create GST Invoice Online — Fast, Free & Compliant | ⬜ todo |
| 10 | `gst-return-filing-guide` | GST Return Filing Guide 2025 — GSTR-1, 3B & Annual | ⬜ todo |
| 11 | `gstr-1-filing-guide` | GSTR-1 Filing Guide — How to File Sales Return Online | ⬜ todo |
| 12 | `gstr-3b-filing-guide` | GSTR-3B Filing Guide — Monthly Summary Return | ⬜ todo |

---

## Priority 3 — Informational: Business Size / Software

| # | Slug | Title | Status |
|---|---|---|---|
| 13 | `gst-billing-software-small-business` | GST Billing Software for Small Business India — Free Plan | ⬜ todo |
| 14 | `billing-software-for-msme` | Best Billing Software for MSME India 2025 | ⬜ todo |
| 15 | `billing-software-for-startups` | Billing Software for Startups India — GST Compliant | ⬜ todo |
| 16 | `billing-software-for-sole-proprietor` | Billing Software for Sole Proprietors India | ⬜ todo |
| 17 | `cloud-billing-software-india` | Cloud Billing Software India — Access Anywhere, Anytime | ⬜ todo |
| 18 | `mobile-billing-app-india` | Mobile Billing App India — Create GST Invoices on Phone | ⬜ todo |

---

## Priority 4 — Comparisons
> High commercial intent. Include a comparison table + migration steps.

| # | Slug | Title | Status |
|---|---|---|---|
| 19 | `tally-alternative-india` | Best Tally Alternative in India 2025 | ⬜ todo |
| 20 | `vyapar-alternative` | Vyapar Alternative — Web-Based GST Billing | ⬜ todo |
| 21 | `zoho-books-alternative` | Zoho Books Alternative for Indian MSMEs | ⬜ todo |
| 22 | `quickbooks-alternative-india` | QuickBooks Alternative India | ⬜ todo |
| 23 | `marg-erp-alternative` | Marg ERP Alternative — Modern Cloud GST Billing | ⬜ todo |

---

## Priority 5 — Use Cases / Industry Verticals

| # | Slug | Title | Status |
|---|---|---|---|
| 24 | `gst-for-freelancers` | GST for Freelancers India — Registration, Invoicing & Returns | ⬜ todo |
| 25 | `gst-for-retail-shop` | GST Billing Software for Retail Shops | ⬜ todo |
| 26 | `gst-billing-for-restaurants` | GST Billing Software for Restaurants — 5% & 12% Rates | ⬜ todo |
| 27 | `gst-billing-for-medical-shops` | GST Billing for Medical Shops & Pharmacies | ⬜ todo |
| 28 | `gst-for-traders` | GST Billing for Traders — Wholesale & Retail | ⬜ todo |
| 29 | `gst-for-service-providers` | GST Billing for Service Providers — SAC Codes & Invoicing | ⬜ todo |
| 30 | `gst-for-manufacturers` | GST Billing for Manufacturers — Production & Sales | ⬜ todo |
| 31 | `gst-billing-for-construction` | GST for Construction Business — Works Contract & ITC | ⬜ todo |

---

## Priority 6 — Tools
> These pages embed an interactive tool — rich content is secondary but still useful for rankings.

| # | Slug | Title | Status |
|---|---|---|---|
| 32 | `hsn-code-finder-india` | HSN Code Finder India — Search HSN/SAC Codes & GST Rates | ⬜ todo |
| 33 | `gst-rate-finder-india` | GST Rate Finder India — Check GST Rate by Product | ⬜ todo |

---

## Already Done

| Slug | Title |
|---|---|
| `debit-note-format-gst` | Debit Note Format Under GST — Complete Guide ✅ |

---

## Notes

- Mark items `🔄 in progress` or `✅ done` as work proceeds.
- Each article should follow the structure used in `debit-note-format-gst`:
  intro → legal provision → why it matters → use cases / situations → mandatory fields → sample format → accounting entries → comparison table → common errors → how Kampony helps → conclusion.
- Comparison pages should additionally include a feature comparison table (Kampony vs competitor) and a migration/switching section.
- Use case pages should include industry-specific GST rates, common document types for that industry, and a worked invoice example.
