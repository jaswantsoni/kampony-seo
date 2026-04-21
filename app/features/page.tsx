import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import { FileText, Package, Receipt, ShieldCheck, Send, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — GST Billing, Inventory & E-Way Bills | Kampony",
  description: "Explore Kampony features: GST invoices, inventory, e-way bills, IRN/QR, reports, Telegram bot and secure cloud — built for Indian MSMEs.",
  alternates: { canonical: "https://www.kampony.com/features" },
};

const features = [
  { icon: FileText, title: "GST Invoices", desc: "Tax invoices, Bill of Supply, Proforma, Credit & Debit notes — all GST-ready.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Package, title: "Inventory & Products", desc: "Stock tracking, low-stock alerts, HSN/SAC codes and bulk Excel upload.", color: "text-accent", bg: "bg-accent/10" },
  { icon: Receipt, title: "E-Way Bills & IRN", desc: "Generate e-way bills, IRN and QR codes directly from your invoice.", color: "text-highlight", bg: "bg-highlight/10" },
  { icon: BarChart3, title: "Reports & Ledgers", desc: "Sales, purchase, profit, GST and customer/supplier ledgers — exportable.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Send, title: "Telegram Bot", desc: "Create invoices, check payments and view products right from Telegram.", color: "text-accent", bg: "bg-accent/10" },
  { icon: ShieldCheck, title: "Secure Cloud", desc: "Email + Google login, multi-user access and automatic cloud backup.", color: "text-highlight", bg: "bg-highlight/10" },
];

export default function FeaturesPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/features-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/35 to-background/75" />
        <div className="container relative z-10 py-16 md:py-24">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</span>
            <div className="glass-card rounded-3xl p-6 md:p-10 inline-block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Everything to <span className="text-gradient-hero">run your business</span></h1>
              <p className="mt-4 text-muted-foreground text-lg">From invoicing to inventory, payments to reports — Kampony brings it all together.</p>
            </div>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border border-border/80 bg-card/88 backdrop-blur-sm rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl group" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} ${f.color} mb-4 transition-transform group-hover:scale-110`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h2 className="font-semibold text-lg">{f.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
