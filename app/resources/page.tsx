import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { SEO_PAGES } from "@/data/keywords";

export const metadata: Metadata = {
  title: "GST Resources — Free Tools, Guides & Calculators | Kampony",
  description: "Browse all GST billing guides, invoice formats, calculators and compliance resources for Indian businesses. Free tools by Kampony.",
  alternates: { canonical: "https://www.kampony.com/resources" },
};

const byIntent = {
  tool: SEO_PAGES.filter(p => p.intent === "tool"),
  comparison: SEO_PAGES.filter(p => p.intent === "comparison"),
  usecase: SEO_PAGES.filter(p => p.intent === "usecase"),
  informational: SEO_PAGES.filter(p => p.intent === "informational"),
};

const labels = { tool: "🛠 Free Tools", comparison: "⚖️ Comparisons", usecase: "🏢 By Industry", informational: "📖 Guides" };

export default function ResourcesPage() {
  return (
    <SiteLayout>
      <div className="container py-16 md:py-24">
        <header className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Resources</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">GST Tools & Guides</h1>
          <p className="mt-4 text-muted-foreground text-lg">Free resources for GST-compliant billing in India.</p>
        </header>

        {(Object.entries(byIntent) as [keyof typeof byIntent, typeof SEO_PAGES][]).map(([intent, pages]) => (
          <section key={intent} className="mb-14">
            <h2 className="text-xl font-bold mb-6">{labels[intent]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="p-5 rounded-xl border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
