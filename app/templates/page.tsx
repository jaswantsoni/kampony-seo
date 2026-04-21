import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Invoice Templates — 6 GST-Ready Designs | Kampony",
  description: "Choose from 6 professional GST invoice templates — Classic, Modern, Minimal, Professional, Compact and Elegant. Customize and brand your invoices.",
  alternates: { canonical: "https://www.kampony.com/templates" },
};

const templates = [
  { name: "Classic", accent: "Reliable blue-ledger layout" },
  { name: "Modern", accent: "Contemporary dual-tone format" },
  { name: "Minimal", accent: "Clean whitespace-first styling" },
  { name: "Professional", accent: "Corporate GST-ready presentation" },
  { name: "Compact", accent: "Dense line-item friendly layout" },
  { name: "Elegant", accent: "Premium border-led stationery look" },
];

const bars = ["bg-primary", "bg-accent", "bg-highlight", "bg-primary", "bg-accent", "bg-primary"];

export default function TemplatesPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/templates-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-background/68" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/25 to-background/60" />
        <div className="container relative z-10 py-16 md:py-24">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">Templates</span>
            <div className="glass-card rounded-3xl p-6 md:p-10 inline-block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">6 beautiful <span className="text-gradient-hero">invoice templates</span></h1>
              <p className="mt-4 text-muted-foreground text-lg">Pick a built-in template or upload your pre-printed letterhead and drag fields to exact positions.</p>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {templates.map((t, i) => (
              <article key={t.name} className="group rounded-2xl bg-card/90 backdrop-blur-sm border border-border/80 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-background p-4 flex flex-col gap-2">
                  <div className={`h-3 w-1/3 rounded ${bars[i]}`} />
                  <div className="h-2 w-1/2 rounded bg-muted" />
                  <div className="mt-2 h-px bg-border" />
                  <div className="space-y-1.5 mt-2">
                    {[...Array(5)].map((_, k) => (
                      <div key={k} className="flex gap-2"><div className="h-2 flex-1 rounded bg-muted" /><div className="h-2 w-10 rounded bg-muted" /></div>
                    ))}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between bg-card/95">
                  <div>
                    <h2 className="font-medium text-base">{t.name}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{t.accent}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">All plans</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
