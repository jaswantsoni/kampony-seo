import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, Package, Receipt, ShieldCheck, Send, BarChart3,
  Building2, Sparkles, Check, ArrowRight, Zap, Globe, Smartphone, CreditCard,
} from "lucide-react";
import { SEO_PAGES } from "@/data/keywords";

const AUTH_URL = "https://business.kampony.com/auth";

export const metadata: Metadata = {
  title: "Kampony — GST Billing & Business Management Software for Indian MSMEs",
  description: "Create GST-compliant invoices, manage inventory, track payments and run your business from anywhere. Free plan available. Trusted by Indian MSMEs.",
  alternates: { canonical: "https://www.kampony.com" },
};

const features = [
  { icon: FileText, title: "GST Invoices", desc: "Tax invoices, Bill of Supply, Proforma, Credit & Debit notes — all GST-ready.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Package, title: "Inventory & Products", desc: "Stock tracking, low-stock alerts, HSN/SAC codes and bulk Excel upload.", color: "text-accent", bg: "bg-accent/10" },
  { icon: Receipt, title: "E-Way Bills & IRN", desc: "Generate e-way bills, IRN and QR codes directly from your invoice.", color: "text-highlight", bg: "bg-highlight/10" },
  { icon: BarChart3, title: "Reports & Ledgers", desc: "Sales, purchase, profit, GST and customer/supplier ledgers — exportable.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Send, title: "Telegram Bot", desc: "Create invoices, check payments and view products right from Telegram.", color: "text-accent", bg: "bg-accent/10" },
  { icon: ShieldCheck, title: "Secure Cloud", desc: "Email + Google login, multi-user access and automatic cloud backup.", color: "text-highlight", bg: "bg-highlight/10" },
];

const plans = [
  {
    name: "Free", price: "₹0", period: "forever", tagline: "No credit card required", cta: "Start Free",
    features: ["10 free invoices", "Unlimited products & customers", "PDF download & print", "HSN/SAC support", "Tax calculation (CGST/SGST/IGST)", "Single organisation"],
    highlight: false,
  },
  {
    name: "Basic", price: "₹149", period: "/month", yearly: "₹1,199/year — save 33%", tagline: "For growing businesses", cta: "Choose Basic",
    features: ["Create & view invoices", "PDF download & print", "Customer management", "Product management", "HSN/SAC support", "Tax calculation (CGST/SGST/IGST)", "Discount & round-off", "Basic sales reports", "Single organisation"],
    highlight: false,
  },
  {
    name: "Premium", price: "₹299", period: "/month", yearly: "₹2,499/year — save 30%", tagline: "Everything you need", cta: "Go Premium",
    features: ["All Basic features", "Credit & debit notes", "E-Way bills", "GST lookup & HSN search", "Multiple organisations", "Proforma & Bill of Supply", "IRN & QR generation", "Inventory & purchase management", "Advanced reports & ledgers", "WhatsApp sharing & reminders", "UPI QR code", "Multi-user access"],
    highlight: true,
  },
];

const templates = ["Classic", "Modern", "Minimal", "Professional", "Compact", "Elegant"];

// Pick featured SEO pages for internal linking
const featuredTools = SEO_PAGES.filter(p => p.intent === "tool").slice(0, 4);
const featuredGuides = SEO_PAGES.filter(p => p.intent === "informational").slice(0, 4);

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is Kampony GST compliant?", acceptedAnswer: { "@type": "Answer", text: "Yes. Kampony auto-calculates CGST, SGST and IGST, supports HSN/SAC codes, e-way bills, IRN and QR codes — fully aligned with Indian GST rules." } },
      { "@type": "Question", name: "Do I need a credit card to start?", acceptedAnswer: { "@type": "Answer", text: "No. The Free plan gives you 10 invoices and unlimited products and customers — no card required." } },
      { "@type": "Question", name: "Can I use Kampony on mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes. Kampony works on any modern mobile browser, and you can also create invoices from Telegram." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
          <nav className="container flex items-center justify-between py-4" aria-label="Primary">
            <a href="#top" className="flex items-center gap-2 font-bold text-xl">
              <img src="/headerLogo.png" alt="Kampony" className="h-9" />
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
              <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
              <Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link>
              <Link href="/faqs" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm px-3 py-1.5 rounded-md hover:bg-secondary transition-colors">Login</Link>
              <a href={AUTH_URL} className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 shadow-md font-medium">Start Today</a>
            </div>
          </nav>
        </header>

        <main id="top">
          {/* Hero */}
          <section className="relative isolate overflow-hidden min-h-[600px]">
            <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/hero-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-background/35 to-background/70" aria-hidden="true" />
            <div className="container py-20 md:py-32 text-center relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm text-foreground/80 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                GST Billing · Built for Indian MSMEs
              </div>
              <div className="glass-card rounded-3xl p-6 md:p-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  Modern GST Billing,{" "}
                  <span className="text-gradient-hero">Built for India</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Create GST-compliant invoices, manage inventory, generate e-way bills and track payments — from your browser or right inside Telegram.
                </p>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={AUTH_URL} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 shadow-lg text-base">
                  Start Today — Free <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#pricing" className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-border px-6 py-3 rounded-xl font-semibold hover:bg-white text-base">
                  View pricing
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">No credit card required · 10 free invoices</p>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[{ k: "10K+", v: "Invoices generated" }, { k: "1.2K+", v: "Active businesses" }, { k: "6", v: "Invoice templates" }, { k: "100%", v: "GST compliant" }].map((s) => (
                  <div key={s.v} className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary">{s.k}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="container py-20 md:py-28">
            <header className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything to run your business</h2>
              <p className="mt-4 text-muted-foreground text-lg">From invoicing to inventory, payments to reports — Kampony brings it all together.</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="border border-border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl group" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} ${f.color} mb-4 transition-transform group-hover:scale-110`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Templates preview */}
          <section id="templates" className="relative border-y border-border overflow-hidden">
            <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url(/assets/showcase-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-background/92 backdrop-blur-sm" />
            </div>
            <div className="container py-20 md:py-28 relative">
              <header className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">Templates</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">6 beautiful invoice templates</h2>
                <p className="mt-4 text-muted-foreground text-lg">Pick a built-in template or upload your pre-printed letterhead.</p>
              </header>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {templates.map((t, i) => {
                  const bars = ["bg-primary", "bg-accent", "bg-highlight", "bg-primary", "bg-accent", "bg-primary"][i];
                  return (
                    <article key={t} className="group rounded-2xl bg-card border border-border overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                      <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-background p-4 flex flex-col gap-2">
                        <div className={`h-3 w-1/3 rounded ${bars}`} />
                        <div className="h-2 w-1/2 rounded bg-muted" />
                        <div className="mt-2 h-px bg-border" />
                        <div className="space-y-1.5 mt-2">
                          {[...Array(5)].map((_, k) => (
                            <div key={k} className="flex gap-2"><div className="h-2 flex-1 rounded bg-muted" /><div className="h-2 w-10 rounded bg-muted" /></div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-card">
                        <span className="font-medium">{t}</span>
                        <span className="text-xs text-muted-foreground">All plans</span>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link href="/templates" className="text-sm text-primary hover:underline font-medium">View all templates →</Link>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="container py-20 md:py-28">
            <header className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-highlight uppercase tracking-wider mb-3">Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
              <p className="mt-4 text-muted-foreground text-lg">Start free. Upgrade when you grow. Cancel anytime.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((p) => (
                <div key={p.name} className={`relative flex flex-col overflow-hidden rounded-2xl border ${p.highlight ? "border-primary border-2" : "border-border"}`} style={p.highlight ? { boxShadow: "var(--shadow-elegant)" } : { boxShadow: "var(--shadow-card)" }}>
                  {p.highlight && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-hero" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground bg-gradient-hero shadow-md">
                        <Zap className="h-3 w-3" /> Most Popular
                      </div>
                    </>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${p.highlight ? "text-gradient-hero" : ""}`}>{p.price}</span>
                      <span className="text-muted-foreground">{p.period}</span>
                    </div>
                    {p.yearly && <p className="mt-2 text-sm text-accent font-medium">{p.yearly}</p>}
                    <ul className="mt-6 space-y-3 flex-1">
                      {p.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5 shrink-0"><Check className="h-3 w-3" /></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={AUTH_URL} className={`mt-8 w-full text-center py-3 rounded-xl font-semibold transition-opacity ${p.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-secondary"}`}>
                      {p.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Platforms */}
          <section className="bg-secondary/40 border-y border-border">
            <div className="container py-16 md:py-20 grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Globe, title: "Web app", desc: "Works in any browser, on any device.", grad: "bg-gradient-hero" },
                { icon: Smartphone, title: "Telegram bot", desc: "Bill and check payments without opening a browser.", grad: "bg-gradient-emerald" },
                { icon: Building2, title: "Multi-org", desc: "Manage multiple businesses from one account.", grad: "bg-gradient-sunset" },
              ].map((p) => (
                <div key={p.title} className="flex flex-col items-center">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white mb-4 shadow-lg ${p.grad}`}>
                    <p.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* GST Tools — internal linking section */}
          <section className="container py-16 md:py-20">
            <header className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Free Tools</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Popular GST Tools & Guides</h2>
            </header>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {featuredTools.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="p-5 rounded-xl border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Free Tool</div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredGuides.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="p-5 rounded-xl border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Guide</div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/resources" className="text-sm text-primary hover:underline font-medium">View all GST resources →</Link>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="container py-20 md:py-28 max-w-3xl">
            <header className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
            </header>
            <div className="space-y-4">
              {[
                { q: "Is Kampony GST compliant?", a: "Yes. Kampony auto-calculates CGST, SGST and IGST, supports HSN/SAC codes, e-way bills, IRN and QR codes — fully aligned with Indian GST rules." },
                { q: "Do I need a credit card to start?", a: "No. The Free plan gives you 10 invoices and unlimited products and customers — no card required." },
                { q: "Can I use Kampony on mobile?", a: "Yes. Kampony works on any modern mobile browser, and you can also create invoices from Telegram." },
                { q: "Can I switch plans later?", a: "Absolutely. Upgrade or downgrade anytime. Yearly plans save 17% over monthly." },
              ].map((item) => (
                <details key={item.q} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                  <summary className="cursor-pointer font-semibold flex justify-between items-center list-none">
                    {item.q}
                    <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="container pb-20">
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "url(/assets/cta-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-[hsl(var(--primary-glow))]/85" />
              <div className="relative p-10 md:p-16 text-center text-primary-foreground">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold mb-5">
                  <CreditCard className="h-3.5 w-3.5" /> No credit card required
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to simplify your billing?</h2>
                <p className="mt-4 text-base md:text-lg opacity-90 max-w-xl mx-auto">Join thousands of Indian businesses billing smarter with Kampony.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={AUTH_URL} className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold text-base hover:bg-white/90 shadow-xl">
                    Start Today — Free <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={AUTH_URL} className="inline-flex items-center justify-center border border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 text-base">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-footer text-footer-foreground">
          <div className="container py-14 grid md:grid-cols-4 gap-10">
            <div>
              <img src="/footerLogo.png" alt="Kampony" className="h-12 opacity-80 mb-3" />
              <p className="text-sm text-footer-muted leading-relaxed">Cloud-based GST billing & business management built for Indian MSMEs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-footer-heading mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-footer-heading transition-colors">Features</Link></li>
                <li><a href="#pricing" className="hover:text-footer-heading transition-colors">Pricing</a></li>
                <li><Link href="/templates" className="hover:text-footer-heading transition-colors">Templates</Link></li>
                <li><Link href="/resources" className="hover:text-footer-heading transition-colors">GST Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-footer-heading mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-footer-heading transition-colors">Contact</Link></li>
                <li><Link href="/faqs" className="hover:text-footer-heading transition-colors">FAQ</Link></li>
                <li><Link href="/login" className="hover:text-footer-heading transition-colors">Login</Link></li>
                <li><Link href="/terms" className="hover:text-footer-heading transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-footer-heading transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-footer-heading mb-3 text-sm">Get started</h4>
              <a href={AUTH_URL} className="block w-full text-center text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 font-medium">Start Free Today</a>
              <p className="mt-3 text-xs text-footer-muted">Made in India 🇮🇳</p>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="container py-5 text-xs text-footer-muted flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} Kampony. All rights reserved.</span>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-footer-heading transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-footer-heading transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
