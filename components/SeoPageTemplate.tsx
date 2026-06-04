import Link from "next/link";
import type { SeoPage } from "@/data/keywords";
import type { PageContent } from "@/data/content";

const AUTH_URL = "https://business.kampony.com/auth";
const SITE_URL = "https://www.kampony.com";

interface Props {
  page: SeoPage;
  content: PageContent;
}

export default function SeoPageTemplate({ page, content }: Props) {
  // ── FAQ Schema (rich results) ──────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  // ── SoftwareApplication Schema ─────────────────────────────────────────────
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kampony",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: "GST billing and business management software for Indian MSMEs.",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "INR" },
      { "@type": "Offer", name: "Basic", price: "149", priceCurrency: "INR" },
      { "@type": "Offer", name: "Premium", price: "299", priceCurrency: "INR" },
    ],
  };

  // ── Intent badge ───────────────────────────────────────────────────────────
  const intentBadge: Record<SeoPage["intent"], string> = {
    tool: "🛠 Free Tool",
    comparison: "⚖️ Comparison",
    usecase: "🏢 Use Case",
    informational: "📖 Guide",
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">K</span>
              Kampony
            </Link>
            <div className="flex items-center gap-3">
              <a href={AUTH_URL} className="text-sm text-gray-600 hover:text-gray-900">Login</a>
              <a href={AUTH_URL} className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Start Free
              </a>
            </div>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              {/* Breadcrumb */}
              <nav className="text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-indigo-600">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{page.title}</span>
              </nav>

              {/* Intent badge */}
              <span className="inline-block text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 mb-4">
                {intentBadge[page.intent]}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                {content.h1}
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {content.intro}
              </p>

              {/* Tool hook — prominent CTA for tool/comparison pages */}
              {content.toolHook && (
                <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm font-semibold text-amber-800">
                  <span>⚡</span>
                  <Link href={content.toolHook.href} className="hover:underline">
                    {content.toolHook.label}
                  </Link>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={AUTH_URL}
                  className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  Start Free — No Credit Card →
                </a>
                <a
                  href={`${SITE_URL}/#pricing`}
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  View Pricing
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-400">10 free invoices · No credit card required</p>
            </div>
          </section>

          {/* Rich article content (page-specific long-form guide) */}
          {content.richContent && (
            <section className="py-12 md:py-16 max-w-4xl mx-auto px-4">
              <div
                className="prose prose-lg prose-indigo max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-ul:text-gray-700 prose-li:my-1
                  prose-table:text-sm prose-table:w-full
                  prose-th:bg-indigo-50 prose-th:text-indigo-800 prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-indigo-100
                  prose-td:p-3 prose-td:border prose-td:border-gray-200
                  prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: content.richContent }}
              />
            </section>
          )}

          {/* Features */}
          <section className="py-16 md:py-20 max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Everything you need — <span className="text-indigo-600">all in one platform</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.features.map((f) => (
                <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <span className="text-indigo-600 font-bold">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>
              <div className="space-y-6">
                {content.steps.map((s) => (
                  <div key={s.step} className="flex gap-6 items-start bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ with schema */}
          <section className="py-16 md:py-20 max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-indigo-300 transition-colors"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 flex justify-between items-center list-none">
                    {faq.q}
                    <span className="text-indigo-600 group-open:rotate-45 transition-transform text-xl leading-none ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-20 bg-indigo-600">
            <div className="max-w-3xl mx-auto px-4 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold">{page.title}</h2>
              <p className="mt-4 text-indigo-100 text-lg">
                Join thousands of Indian businesses billing smarter with Kampony.
              </p>
              <a
                href={AUTH_URL}
                className="mt-8 inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
              >
                Start Free Today →
              </a>
              <p className="mt-3 text-xs text-indigo-200">No credit card required · 10 free invoices</p>
            </div>
          </section>

          {/* Internal linking — related pages */}
          {content.relatedPages.length > 0 && (
            <section className="py-12 max-w-4xl mx-auto px-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">Related Topics</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {content.relatedPages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-100 rounded-xl px-4 py-3 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                    >
                      <span className="text-indigo-400">→</span>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Kampony ·{" "}
            <a href={SITE_URL} className="hover:text-indigo-600">kampony.com</a> · Made in India 🇮🇳
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href={`${SITE_URL}/terms`} className="hover:text-indigo-600">Terms</a>
            <a href={`${SITE_URL}/privacy`} className="hover:text-indigo-600">Privacy</a>
            <a href={`${SITE_URL}/contact`} className="hover:text-indigo-600">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}
