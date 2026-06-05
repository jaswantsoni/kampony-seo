import type { MetadataRoute } from "next";
import { SEO_PAGES, STATIC_PAGES } from "@/data/keywords";

const SITE_URL = "https://www.kampony.com";

const PRIORITY: Record<string, number> = {
  tool: 1.0,
  comparison: 0.9,
  usecase: 0.8,
  informational: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static marketing pages
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: parseFloat(p.priority),
  }));

  // Dynamic SEO pages
  const dynamicEntries: MetadataRoute.Sitemap = SEO_PAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: PRIORITY[p.intent] ?? 0.7,
  }));

  // Dedicated tool pages + resources index
  const toolPageEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/free-gst-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/gst-invoice-generator-free`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  return [...staticEntries, ...toolPageEntries, ...dynamicEntries];
}
