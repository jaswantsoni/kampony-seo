import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "./ProductGrid";

const API = process.env.API_URL ?? "http://localhost:3000";
const SITE_URL = "https://www.kampony.com";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/api/organisations/public`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map((org: { seoSlug: string }) => ({ slug: org.seoSlug }));
  } catch {
    return [];
  }
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  taxRate: number;
  taxInclusive: boolean;
  unit: string;
  hsnCode?: string;
  images: string[];
  stockQuantity: number;
  brand?: string;
  condition?: string;
  googleCategory?: string;
  mpn?: string;
  gtin?: string;
}

interface OrgData {
  id: string;
  name: string;
  tradeName?: string;
  city?: string;
  state?: string;
  email: string;
  phone: string;
  logo?: string;
  showcaseTagline?: string;
  seoSlug: string;
  products: Product[];
}

async function fetchOrg(slug: string): Promise<OrgData | null> {
  try {
    const res = await fetch(`${API}/api/organisations/public/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const org = await fetchOrg(params.slug);
  if (!org) return { robots: { index: false } };

  const displayName = org.tradeName || org.name;
  const location = [org.city, org.state].filter(Boolean).join(", ");
  const title = `${displayName} — Products & Services${location ? ` in ${location}` : ""}`;
  const description =
    org.showcaseTagline ||
    `Explore products and services from ${displayName}${location ? ` based in ${location}` : ""}. Verified business on Kampony.`;
  const url = `${SITE_URL}/org/${org.seoSlug}`;

  // Use first product image or org logo as OG image
  const firstProductImage = org.products.find((p) => p.images[0])?.images[0];
  const ogImage = firstProductImage || org.logo || `${SITE_URL}/og-image.png`;

  // Keywords from product names
  const productKeywords = org.products.slice(0, 8).map((p) => p.name).join(", ");

  return {
    title,
    description,
    keywords: `${displayName}, ${location}, ${productKeywords}`.replace(/^,\s*|,\s*$/g, ""),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${displayName} products` }],
      siteName: "Kampony",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function OrgShowcasePage({ params }: Props) {
  const org = await fetchOrg(params.slug);
  if (!org) notFound();

  const displayName = org.tradeName || org.name;
  const location = [org.city, org.state].filter(Boolean).join(", ");
  const url = `${SITE_URL}/org/${org.seoSlug}`;

  // LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: displayName,
    url,
    telephone: org.phone,
    email: org.email,
    ...(location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: org.city,
        addressRegion: org.state,
        addressCountry: "IN",
      },
    }),
    ...(org.logo && { image: org.logo }),
    ...(org.showcaseTagline && { description: org.showcaseTagline }),
    ...(org.products.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${displayName} Products`,
        itemListElement: org.products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: p.name, description: p.description },
            price: p.price,
            priceCurrency: "INR",
          },
        })),
      },
    }),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Business Directory", item: `${SITE_URL}/businesses` },
      { "@type": "ListItem", position: 3, name: displayName, item: url },
    ],
  };

  // Per-product structured data for Google Shopping
  const productSchemas = org.products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description || p.name,
    sku: p.id,
    ...(p.images.length > 0 && { image: p.images }),
    ...(p.brand
      ? { brand: { "@type": "Brand", name: p.brand } }
      : { brand: { "@type": "Brand", name: displayName } }),
    ...(p.gtin && { gtin: p.gtin }),
    ...(p.mpn && { mpn: p.mpn }),
    ...(p.googleCategory && { category: p.googleCategory }),
    ...(p.hsnCode && !p.mpn && { mpn: p.hsnCode }),
    itemCondition: `https://schema.org/${p.condition === "used" ? "Used" : p.condition === "refurbished" ? "Refurbished" : "New"}Condition`,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: p.price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: p.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: displayName },
    },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {productSchemas.map((ps, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ps) }} />
      ))}

      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/assets/header-logo.png" alt="Kampony" width={140} height={48} priority />
            </Link>
            <a href="https://business.kampony.com/auth" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Start Free
            </a>
          </div>
        </header>

        <main>
          {/* Business hero */}
          <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">

              {/* Breadcrumb — visible + semantic */}
              <nav className="text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" className="hover:text-indigo-600" itemProp="item"><span itemProp="name">Home</span></Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <span className="mx-1">/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span itemProp="name">Business</span>
                    <meta itemProp="position" content="2" />
                  </li>
                  <span className="mx-1">/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span className="text-gray-700" itemProp="name">{displayName}</span>
                    <meta itemProp="position" content="3" />
                  </li>
                </ol>
              </nav>

              {org.logo && (
                <div className="flex justify-center mb-6">
                  <img
                    src={org.logo}
                    alt={`${displayName} logo`}
                    width={80}
                    height={80}
                    className="h-20 w-auto object-contain rounded-xl border border-gray-100 p-2 bg-white shadow-sm"
                  />
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{displayName}</h1>
              {location && (
                <p className="mt-2 text-gray-500 text-sm">
                  <span aria-label="Location">📍</span> {location}
                </p>
              )}
              {org.showcaseTagline && (
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{org.showcaseTagline}</p>
              )}

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href={`mailto:${org.email}`} className="hover:text-indigo-600" rel="nofollow">✉️ {org.email}</a>
                <a href={`tel:${org.phone}`} className="hover:text-indigo-600" rel="nofollow">📞 {org.phone}</a>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="py-16 max-w-6xl mx-auto px-4" aria-label={`Products and services by ${displayName}`}>
            <h2 className="text-2xl font-bold mb-2">
              Products &amp; Services
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              {org.products.length} product{org.products.length !== 1 ? "s" : ""} listed
              {location ? ` · ${location}` : ""}
            </p>

            <ProductGrid
              products={org.products}
              orgName={displayName}
              orgEmail={org.email}
              orgPhone={org.phone}
            />
          </section>

          {/* CTA */}
          <section className="py-12 bg-indigo-600 text-white text-center">
            <p className="text-lg font-semibold">Are you a business? List your products on Kampony for free.</p>
            <a href="https://business.kampony.com/auth" className="mt-4 inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Get Your Free Page →
            </a>
          </section>
        </main>

        <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Kampony · <a href={SITE_URL} className="hover:text-indigo-600">kampony.com</a> · Made in India 🇮🇳</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href={`${SITE_URL}/terms`} className="hover:text-indigo-600">Terms</a>
            <a href={`${SITE_URL}/privacy`} className="hover:text-indigo-600">Privacy</a>
          </div>
        </footer>
      </div>
    </>
  );
}
