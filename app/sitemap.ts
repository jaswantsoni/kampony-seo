import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { SEO_PAGES, STATIC_PAGES } from "@/data/keywords";

const SITE_URL = "https://www.kampony.com";
const API = process.env.API_URL ?? "http://localhost:3000";

const PRIORITY: Record<string, number> = {
  tool: 1.0,
  comparison: 0.9,
  usecase: 0.8,
  informational: 0.7,
};

// Stable per deploy — reflects the actual last commit date automatically
function getBuildDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
    return new Date(iso);
  } catch {
    return new Date("2025-01-15"); // fallback if git unavailable
  }
}

const STATIC_LAST_MODIFIED = getBuildDate();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static marketing pages
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: p.changefreq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: parseFloat(p.priority),
  }));

  // Dynamic SEO pages
  const dynamicEntries: MetadataRoute.Sitemap = SEO_PAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: PRIORITY[p.intent] ?? 0.7,
  }));

  // Dedicated tool pages + resources index
  const toolPageEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/resources`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/free-gst-calculator`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/gst-invoice-generator-free`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];

  // Org showcase pages — fetched live from DB via API
  let orgEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API}/api/organisations/public`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      orgEntries = (json.data ?? []).map((org: { seoSlug: string; updatedAt: string }) => ({
        url: `${SITE_URL}/org/${org.seoSlug}`,
        lastModified: new Date(org.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // non-fatal: org pages omitted from sitemap if API unreachable
  }

  return [...staticEntries, ...toolPageEntries, ...dynamicEntries, ...orgEntries];
}
