"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import {
  ArrowRight, CheckCircle2, FileText, Package, Plus,
  Receipt, Send, ShieldCheck, Sparkles, Trash2, Loader2,
} from "lucide-react";

const AUTH_URL = "https://business.kampony.com/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const GST_RATES = [0, 5, 12, 18, 28];

type Item = { id: string; name: string; hsn: string; qty: number; price: number; rate: number };

const features = [
  { icon: FileText, title: "GST-Compliant Invoices", desc: "Tax invoices, bill of supply, proforma and delivery challans with auto CGST/SGST/IGST." },
  { icon: Package, title: "HSN/SAC Code Support", desc: "Search and apply correct HSN/SAC codes with auto GST rate lookup." },
  { icon: Receipt, title: "E-Way Bill & IRN", desc: "Generate e-way bills and IRN with QR codes directly from your invoice." },
  { icon: Package, title: "Inventory Management", desc: "Track stock levels, get low-stock alerts and manage purchases." },
  { icon: FileText, title: "Reports & Ledgers", desc: "Sales, purchase, profit, GST and customer ledgers — exportable to Excel." },
  { icon: Send, title: "Telegram Bot", desc: "Create invoices and check payments right from Telegram." },
];

const steps = [
  { n: "01", title: "Add your business", desc: "Enter your business name, GSTIN and address — used as the seller on the invoice." },
  { n: "02", title: "Add line items", desc: "Add products or services with HSN codes, quantity, price and GST rate." },
  { n: "03", title: "Auto GST calculation", desc: "CGST, SGST or IGST is calculated automatically based on transaction type." },
  { n: "04", title: "Download & share", desc: "Sign in with Google to download as PDF. Free, with Kampony watermark." },
];

const faqs = [
  { q: "Is the GST invoice generator really free?", a: "Yes. Build invoices without signing up. Sign in with Google to download the PDF — free, with a Kampony watermark. Upgrade for watermark-free PDFs." },
  { q: "Are these invoices GST-compliant in India?", a: "Yes. Invoices include seller and buyer details, GSTIN, HSN/SAC codes, taxable value and CGST/SGST or IGST as required by Indian GST law." },
  { q: "Why do I need to sign in to download?", a: "We use Google sign-in to create your free Kampony account so you can access your invoices later. No password needed — one click with Google." },
  { q: "Can I generate e-way bills and IRN?", a: "Yes — Premium users can generate e-way bills, IRN and QR codes directly from invoices in one click." },
  { q: "Do I need to install anything?", a: "No. Kampony is 100% cloud-based and works in any browser. There's also a Telegram bot for billing on the go." },
  { q: "Is my data secure?", a: "All data is encrypted in transit (HTTPS) and stored on secure cloud servers. We never share your data with third parties." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(
    Number.isFinite(n) ? n : 0,
  );

const newItem = (): Item => ({ id: Math.random().toString(36).slice(2, 9), name: "", hsn: "", qty: 1, price: 0, rate: 18 });

// Simple input/select components (no shadcn dependency)
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground block mb-1">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background";
const selectCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background";

export default function GstInvoiceGeneratorFreePage() {
  const [region, setRegion] = useState<"intra" | "inter">("intra");
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);

  const [seller, setSeller] = useState({ name: "", gstin: "", address: "", city: "", state: "", pincode: "", phone: "", email: "", upi: "" });
  const [buyer, setBuyer] = useState({ name: "", gstin: "", address: "", city: "", state: "", pincode: "", phone: "", email: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState<Item[]>([
    { id: "i1", name: "Web design service", hsn: "998314", qty: 1, price: 10000, rate: 18 },
  ]);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const totals = useMemo(() => {
    let subtotal = 0, tax = 0;
    items.forEach((it) => {
      const line = (it.qty || 0) * (it.price || 0);
      subtotal += line;
      tax += (line * (it.rate || 0)) / 100;
    });
    const total = subtotal + tax;
    return { subtotal, tax, total, cgst: region === "intra" ? tax / 2 : 0, sgst: region === "intra" ? tax / 2 : 0, igst: region === "inter" ? tax : 0 };
  }, [items, region]);

  const updateItem = (id: string, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

  const handleDownload = useCallback(async () => {
    if (!seller.name) { showToast("Add your business name first", "err"); return; }

    setDownloading(true);
    try {
      const g = (window as any).google;
      if (!g) throw new Error("Google SDK not loaded. Please refresh.");

      const googleToken = await new Promise<string>((resolve, reject) => {
        g.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: (r: any) => resolve(r.credential),
          error_callback: reject,
        });
        g.accounts.id.prompt((n: any) => {
          if (n.isNotDisplayed() || n.isSkippedMoment()) reject(new Error("Please allow the sign-in popup"));
        });
      });

      const res = await fetch(`${API_URL}/api/public/invoice/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleToken, seller, buyer, items, region, invoiceNumber, invoiceDate }),
      });

      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed"); }

      const authToken = res.headers.get("X-Auth-Token");
      if (authToken) localStorage.setItem("auth_token", authToken);

      const count = parseInt(res.headers.get("X-Invoice-Count") || "1");
      setInvoiceCount(count);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "invoice-kampony.pdf"; a.click();
      URL.revokeObjectURL(url);

      setShowUpsell(true);
    } catch (err: any) {
      showToast(err.message, "err");
    } finally {
      setDownloading(false);
    }
  }, [seller, buyer, items, region]);

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Google Identity Services */}
      <script src="https://accounts.google.com/gsi/client" async defer />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "ok" ? "bg-accent" : "bg-destructive"}`}>
          {toast.msg}
        </div>
      )}

      {/* Hero */}
      <section className="container py-16 md:py-24 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-5">
          <Sparkles className="h-3.5 w-3.5" /> Free Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Free GST Invoice Generator —{" "}
          <span className="text-gradient-hero">Create Invoice Online</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Create GST-compliant invoices in seconds. Auto CGST/SGST/IGST, HSN/SAC support and instant PDF download. Sign in with Google to download — free.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={AUTH_URL} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 shadow-md">
            Start Free — No Credit Card <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/#pricing" className="inline-flex items-center border border-border px-6 py-3 rounded-xl font-semibold hover:bg-secondary">
            View Pricing
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">10 free invoices · No credit card required</p>
      </section>

      {/* Builder */}
      <section className="container pb-20 space-y-6">
        {/* Seller + Buyer */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <h2 className="font-semibold">Your Business (Seller)</h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Invoice Number *">
                <input className={inputCls} value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="INV/2025-26/001" />
              </Field>
              <Field label="Invoice Date">
                <input className={inputCls} type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
              </Field>
              <div className="col-span-2"><Field label="Business Name *"><input className={inputCls} value={seller.name} onChange={e => setSeller(s => ({ ...s, name: e.target.value }))} placeholder="ACME Pvt Ltd" /></Field></div>
              <Field label="GSTIN"><input className={inputCls} value={seller.gstin} onChange={e => setSeller(s => ({ ...s, gstin: e.target.value }))} placeholder="27XXXXX" /></Field>
              <Field label="Phone"><input className={inputCls} value={seller.phone} onChange={e => setSeller(s => ({ ...s, phone: e.target.value }))} placeholder="9876543210" /></Field>
              <div className="col-span-2"><Field label="Address"><input className={inputCls} value={seller.address} onChange={e => setSeller(s => ({ ...s, address: e.target.value }))} placeholder="Street address" /></Field></div>
              <Field label="City"><input className={inputCls} value={seller.city} onChange={e => setSeller(s => ({ ...s, city: e.target.value }))} /></Field>
              <Field label="State"><input className={inputCls} value={seller.state} onChange={e => setSeller(s => ({ ...s, state: e.target.value }))} /></Field>
              <Field label="UPI ID"><input className={inputCls} value={seller.upi} onChange={e => setSeller(s => ({ ...s, upi: e.target.value }))} placeholder="business@upi" /></Field>
              <Field label="Email"><input className={inputCls} value={seller.email} onChange={e => setSeller(s => ({ ...s, email: e.target.value }))} /></Field>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <h2 className="font-semibold">Customer (Buyer)</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><Field label="Customer Name *"><input className={inputCls} value={buyer.name} onChange={e => setBuyer(b => ({ ...b, name: e.target.value }))} placeholder="Customer name" /></Field></div>
              <Field label="GSTIN"><input className={inputCls} value={buyer.gstin} onChange={e => setBuyer(b => ({ ...b, gstin: e.target.value }))} placeholder="27XXXXX (optional)" /></Field>
              <Field label="Phone"><input className={inputCls} value={buyer.phone} onChange={e => setBuyer(b => ({ ...b, phone: e.target.value }))} /></Field>
              <div className="col-span-2"><Field label="Address"><input className={inputCls} value={buyer.address} onChange={e => setBuyer(b => ({ ...b, address: e.target.value }))} /></Field></div>
              <Field label="City"><input className={inputCls} value={buyer.city} onChange={e => setBuyer(b => ({ ...b, city: e.target.value }))} /></Field>
              <Field label="State"><input className={inputCls} value={buyer.state} onChange={e => setBuyer(b => ({ ...b, state: e.target.value }))} /></Field>
            </div>
          </div>
        </div>

        {/* Items + Preview */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-4 lg:col-span-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-semibold">Line Items</h2>
              <select value={region} onChange={e => setRegion(e.target.value as "intra" | "inter")} className={`${selectCls} w-auto`}>
                <option value="intra">Intra-state (CGST + SGST)</option>
                <option value="inter">Inter-state (IGST)</option>
              </select>
            </div>

            <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
              <div className="col-span-4">Item</div><div className="col-span-2">HSN/SAC</div>
              <div className="col-span-1">Qty</div><div className="col-span-2">Price (₹)</div>
              <div className="col-span-2">GST</div><div className="col-span-1" />
            </div>

            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
                <input className={`${inputCls} col-span-12 md:col-span-4`} placeholder="Item name" value={it.name} onChange={e => updateItem(it.id, { name: e.target.value })} />
                <input className={`${inputCls} col-span-6 md:col-span-2`} placeholder="HSN" value={it.hsn} onChange={e => updateItem(it.id, { hsn: e.target.value })} />
                <input className={`${inputCls} col-span-3 md:col-span-1`} inputMode="decimal" value={it.qty} onChange={e => updateItem(it.id, { qty: parseFloat(e.target.value) || 0 })} />
                <input className={`${inputCls} col-span-3 md:col-span-2`} inputMode="decimal" value={it.price} onChange={e => updateItem(it.id, { price: parseFloat(e.target.value) || 0 })} />
                <select className={`${selectCls} col-span-9 md:col-span-2`} value={it.rate} onChange={e => updateItem(it.id, { rate: parseFloat(e.target.value) })}>
                  {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                </select>
                <button onClick={() => removeItem(it.id)} className="col-span-3 md:col-span-1 flex justify-center text-muted-foreground hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button onClick={() => setItems(prev => [...prev, newItem()])} className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-2 hover:bg-secondary">
              <Plus className="h-4 w-4" /> Add item
            </button>
          </div>

          {/* Live preview */}
          <div className="border border-border rounded-2xl p-6 lg:col-span-2">
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Tax Invoice</div>
                <div className="text-lg font-semibold mt-0.5">{seller.name || "Your Business"}</div>
                {seller.gstin && <div className="text-xs text-muted-foreground">GSTIN: {seller.gstin}</div>}
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div className="font-mono font-semibold text-foreground">{invoiceNumber || "INV/2025-26/001"}</div>
                <div>Date: {new Date(invoiceDate).toLocaleDateString("en-IN")}</div>
                <div className="mt-1">{region === "intra" ? "CGST + SGST" : "IGST"}</div>
              </div>
            </div>

            {buyer.name && (
              <div className="text-xs text-muted-foreground mb-4 p-2 bg-secondary/40 rounded">
                <strong>Bill To:</strong> {buyer.name}{buyer.gstin ? ` · ${buyer.gstin}` : ""}
              </div>
            )}

            <div className="border-t border-border pt-4 space-y-3">
              {items.map((it) => {
                const line = (it.qty || 0) * (it.price || 0);
                return (
                  <div key={it.id} className="flex justify-between text-sm">
                    <div className="min-w-0 pr-3">
                      <div className="font-medium truncate">{it.name || "Untitled item"}</div>
                      <div className="text-xs text-muted-foreground">{it.hsn && `HSN ${it.hsn} · `}{it.qty} × {inr(it.price)} · {it.rate}%</div>
                    </div>
                    <div className="font-medium shrink-0">{inr(line)}</div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border mt-5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(totals.subtotal)}</span></div>
              {region === "intra" ? (
                <>
                  <div className="flex justify-between"><span className="text-muted-foreground">CGST</span><span>{inr(totals.cgst)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">SGST</span><span>{inr(totals.sgst)}</span></div>
                </>
              ) : (
                <div className="flex justify-between"><span className="text-muted-foreground">IGST</span><span>{inr(totals.igst)}</span></div>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{inr(totals.total)}</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {downloading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <>Download PDF — Free <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="text-[11px] text-center text-muted-foreground mt-2">Sign in with Google to download · Kampony watermark on free PDFs</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-20">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need — all in one platform</h2>
          <p className="mt-3 text-muted-foreground">From invoicing to inventory and reports — Kampony handles it end to end.</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border border-border/60 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div><h3 className="font-semibold mb-1.5">{f.title}</h3><p className="text-sm text-muted-foreground">{f.desc}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-16 md:py-24">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl bg-card border border-border p-6">
                <div className="text-3xl font-bold text-primary/70">{s.n}</div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="container py-16 md:py-24 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight">What is a GST invoice?</h2>
        <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
          <p>A GST invoice is a legal document issued by a registered seller to the buyer, showing the goods or services supplied along with the GST charged. It is required under Indian GST law for B2B and many B2C transactions.</p>
          <h3 className="text-xl font-semibold text-foreground">Mandatory fields in a GST invoice</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Seller name, address and GSTIN</li>
            <li>Buyer name, address and GSTIN (if registered)</li>
            <li>Invoice number and date</li>
            <li>HSN or SAC code for each item</li>
            <li>CGST and SGST (intra-state) or IGST (inter-state)</li>
            <li>Total invoice value in figures and words</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16 md:py-24 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer font-semibold flex items-center justify-between list-none">
                {f.q}<span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-gradient-hero p-10 md:p-14 text-center text-primary-foreground shadow-xl">
          <ShieldCheck className="h-10 w-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold">Bill smarter with Kampony</h2>
          <p className="mt-3 opacity-90">Join thousands of Indian businesses creating GST invoices with Kampony.</p>
          <div className="mt-6">
            <a href={AUTH_URL} className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-white/90 shadow-xl">
              Start Free Today <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-sm opacity-80">No credit card required · 10 free invoices</p>
        </div>
      </section>

      {/* Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-hero p-6 text-white text-center relative">
              <button
                onClick={() => setShowUpsell(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-bold">Invoice Downloaded!</h2>
              <p className="text-white/80 text-sm mt-1">
                {invoiceCount >= 5
                  ? `You've used ${invoiceCount}/5 free invoices`
                  : `${5 - invoiceCount} free invoice${5 - invoiceCount !== 1 ? "s" : ""} remaining`}
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-center text-muted-foreground mb-5">
                Unlock the full Kampony experience for your business
              </p>

              <ul className="space-y-2.5 mb-6">
                {[
                  { icon: "🔍", text: "Auto GSTIN fetch — fill buyer details instantly" },
                  { icon: "📦", text: "HSN/SAC search with auto GST rate" },
                  { icon: "👥", text: "Customer & product management" },
                  { icon: "📊", text: "Invoice history & records" },
                  { icon: "🎨", text: "7 professional invoice templates" },
                  { icon: "✏️", text: "Custom template builder — your letterhead" },
                  { icon: "📄", text: "Watermark-free PDF downloads" },
                  { icon: "📱", text: "Telegram bot for billing on the go" },
                ].map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    <span className="text-base leading-5">{f.icon}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary">₹149<span className="text-base font-normal text-muted-foreground">/month</span></div>
                <div className="text-xs text-muted-foreground mt-0.5">or ₹1,199/year — save 33%</div>
              </div>

              <a
                href={AUTH_URL}
                className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 shadow-lg"
              >
                Upgrade Now — Kampony™ <ArrowRight className="inline h-4 w-4 ml-1" />
              </a>

              <button
                onClick={() => setShowUpsell(false)}
                className="block w-full text-center text-sm text-muted-foreground mt-3 hover:text-foreground"
              >
                Continue with free plan
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
