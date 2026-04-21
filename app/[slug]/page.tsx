import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_PAGES, SEO_KEYWORDS } from "@/data/keywords";
import { getPageContent } from "@/data/content";
import SeoPageTemplate from "@/components/SeoPageTemplate";

const SITE_URL = "https://www.kampony.com";

// These are handled by their own app/ directories — don't let [slug] catch them
const RESERVED = new Set([
  "features", "templates", "faqs", "faq", "contact",
  "login", "signin", "signup", "terms", "privacy",
  "resources", "api", "sitemap.xml", "robots.txt",
  "sitemap-pages.xml", "sitemap-dynamic.xml",
]);

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return SEO_KEYWORDS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = SEO_PAGES.find((p) => p.slug === params.slug);
  if (!page) return {};
  const canonical = `${SITE_URL}/${page.slug}`;
  return {
    title: `${page.title} | Kampony`,
    description: page.description,
    alternates: { canonical },
    openGraph: { title: page.title, description: page.description, url: canonical, type: "article" },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}

export default function SlugPage({ params }: Props) {
  const { slug } = params;

  // Block reserved routes
  if (RESERVED.has(slug)) notFound();

  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const content = getPageContent(page, SEO_PAGES);
  return <SeoPageTemplate page={page} content={content} />;
}
