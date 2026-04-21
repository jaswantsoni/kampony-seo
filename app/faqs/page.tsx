import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "FAQs — GST Billing Software Questions Answered | Kampony",
  description: "Answers to common questions about Kampony GST billing — pricing, GST compliance, mobile support, multi-business and security.",
  alternates: { canonical: "https://www.kampony.com/faqs" },
};

const faqs = [
  { q: "Is Kampony GST compliant?", a: "Yes. Kampony auto-calculates CGST, SGST and IGST, supports HSN/SAC codes, e-way bills, IRN and QR codes — fully aligned with Indian GST rules." },
  { q: "Do I need a credit card to start?", a: "No. The Free plan gives you 10 invoices and unlimited products and customers — no card required." },
  { q: "Can I use Kampony on mobile?", a: "Yes. Kampony works on any modern mobile browser, and you can also create invoices from Telegram." },
  { q: "Can I switch plans later?", a: "Absolutely. Upgrade or downgrade anytime. Yearly plans save 17% over monthly." },
  { q: "Does Kampony support multiple businesses?", a: "Yes — Premium plan users can manage multiple organisations from a single account." },
  { q: "Is my data secure?", a: "Your data is encrypted in transit and stored securely on managed cloud infrastructure with automatic backups." },
];

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/faqs-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-background/60" />
        <div className="container relative z-10 max-w-3xl py-16 md:py-24">
          <header className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</span>
            <div className="glass-card rounded-3xl p-6 md:p-10 inline-block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently asked <span className="text-gradient-hero">questions</span></h1>
            </div>
          </header>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-xl border border-border/80 bg-card/88 backdrop-blur-sm p-5 transition-colors hover:border-primary/40">
                <summary className="cursor-pointer font-semibold flex justify-between items-center list-none">
                  {item.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
