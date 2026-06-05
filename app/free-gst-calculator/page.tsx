"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { SHARED_FEATURES, SHARED_FAQS, buildFaqSchema, inr } from "@/lib/pageData";
import {
  ArrowRight, Calculator, CheckCircle2, ShieldCheck, Sparkles,
} from "lucide-react";

const AUTH_URL = "https://business.kampony.com/auth";
const GST_RATES = [0, 0.25, 3, 5, 12, 18, 28];

type AmountType = "exclusive" | "inclusive";
type Region = "intra" | "inter";

const CALCULATOR_FAQS = [
  {
    q: "What is the Free GST Calculator?",
    a: "It's a free online tool by Kampony to instantly calculate CGST, SGST or IGST on any amount based on Indian GST rules — for both intra-state and inter-state transactions.",
  },
  ...SHARED_FAQS,
];

const faqSchema = buildFaqSchema(CALCULATOR_FAQS);

const steps = [
  { n: "01", title: "Enter your details", desc: "Input the amount, GST rate and transaction type (intra-state or inter-state)." },
  { n: "02", title: "Get instant results", desc: "See CGST, SGST or IGST breakdown instantly. No manual calculation needed." },
  { n: "03", title: "Use in your invoice", desc: "Apply the calculated tax directly in Kampony to generate a GST-compliant invoice." },
  { n: "04", title: "Download & share", desc: "Download the invoice as PDF or share via WhatsApp and email in one click." },
];

export default function FreeGstCalculatorPage() {
  const [amount, setAmount] = useState<string>("10000");
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<AmountType>("exclusive");
  const [region, setRegion] = useState<Region>("intra");

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    let net = amt, tax = 0;
    if (type === "exclusive") {
      tax = (amt * rate) / 100;
      net = amt;
    } else {
      net = amt / (1 + rate / 100);
      tax = amt - net;
    }
    const total = net + tax;
    const half = tax / 2;
    return {
      net,
      tax,
      total,
      cgst: region === "intra" ? half : 0,
      sgst: region === "intra" ? half : 0,
      igst: region === "inter" ? tax : 0,
    };
  }, [amount, rate, type, region]);

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero + Calculator */}
      <section className="container py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Free GST Calculator India —{" "}
            <span className="text-gradient-hero">CGST, SGST &amp; IGST</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Use Kampony's free online tool to get instant GST results. No signup required. Built specifically for Indian GST rules.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={AUTH_URL}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 shadow-md"
            >
              Start Free — No Credit Card <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/#pricing"
              className="inline-flex items-center border border-border px-6 py-3 rounded-xl font-semibold hover:bg-secondary"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">10 free invoices · No credit card required</p>
        </div>

        {/* Calculator card */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">GST Calculator</h2>
              <p className="text-xs text-muted-foreground">Instant CGST / SGST / IGST breakdown</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                className="mt-1.5 w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="text-sm font-medium">GST rate</label>
                <select
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="mt-1.5 w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {GST_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="amtType" className="text-sm font-medium">Amount type</label>
                <select
                  id="amtType"
                  value={type}
                  onChange={(e) => setType(e.target.value as AmountType)}
                  className="mt-1.5 w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="exclusive">Exclusive of GST</option>
                  <option value="inclusive">Inclusive of GST</option>
                </select>
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-medium mb-2">Transaction type</legend>
              <div className="grid grid-cols-2 gap-3">
                {(["intra", "inter"] as Region[]).map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer text-sm ${region === r ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <input
                      type="radio"
                      name="region"
                      value={r}
                      checked={region === r}
                      onChange={() => setRegion(r)}
                      className="accent-primary"
                    />
                    {r === "intra" ? "Intra-state (CGST + SGST)" : "Inter-state (IGST)"}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="rounded-xl bg-secondary/60 p-5 space-y-2.5 text-sm" aria-live="polite" aria-label="GST calculation result">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net amount</span>
                <span className="font-medium">{inr(result.net)}</span>
              </div>
              {region === "intra" ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CGST ({rate / 2}%)</span>
                    <span className="font-medium">{inr(result.cgst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SGST ({rate / 2}%)</span>
                    <span className="font-medium">{inr(result.sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IGST ({rate}%)</span>
                  <span className="font-medium">{inr(result.igst)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2.5 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{inr(result.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need — all in one platform</h2>
          <p className="mt-3 text-muted-foreground">From calculation to compliant invoicing — Kampony handles it end to end.</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHARED_FEATURES.map((f) => (
            <div key={f.title} className="border border-border/60 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
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
            <p className="mt-3 text-muted-foreground">Four simple steps from calculation to GST-ready invoice.</p>
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

      {/* Long-form SEO content */}
      <section className="container py-16 md:py-24 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight">Understanding GST in India</h2>
        <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Goods and Services Tax (GST) is a unified indirect tax applied on the supply of goods and services across India.
            For intra-state transactions, GST is split equally between Central GST (CGST) and State GST (SGST).
            For inter-state transactions, a single Integrated GST (IGST) is charged at the full rate.
          </p>
          <h3 className="text-xl font-semibold text-foreground">How to calculate GST</h3>
          <p>
            <strong className="text-foreground">GST exclusive:</strong> If your amount does not include tax,
            GST = Amount × Rate ÷ 100. Total = Amount + GST.
          </p>
          <p>
            <strong className="text-foreground">GST inclusive:</strong> If your amount already includes tax,
            Net = Amount ÷ (1 + Rate ÷ 100). GST = Amount − Net.
          </p>
          <h3 className="text-xl font-semibold text-foreground">Common GST rates</h3>
          <p>
            0%, 0.25%, 3%, 5%, 12%, 18% and 28% are the standard slabs.
            Use Kampony's HSN/SAC search to find the correct rate for your products.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16 md:py-24 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-4">
          {CALCULATOR_FAQS.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer font-semibold flex items-center justify-between list-none">
                {f.q}
                <span className="text-primary group-open:rotate-45 transition-transform text-xl" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-muted-foreground text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-gradient-hero p-10 md:p-14 text-center text-primary-foreground shadow-xl">
          <ShieldCheck className="h-10 w-10 mx-auto mb-4 opacity-90" aria-hidden />
          <h2 className="text-3xl md:text-4xl font-bold">Bill smarter with Kampony</h2>
          <p className="mt-3 opacity-90">Join thousands of Indian businesses billing smarter with Kampony.</p>
          <div className="mt-6">
            <a
              href={AUTH_URL}
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-white/90 shadow-xl"
            >
              Start Free Today <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-sm opacity-80">No credit card required · 10 free invoices</p>
        </div>
      </section>
    </SiteLayout>
  );
}
