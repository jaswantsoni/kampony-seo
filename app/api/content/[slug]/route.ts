/**
 * GET /api/content/[slug]
 * Returns full page content as JSON.
 * Use this to fetch content dynamically or from a CMS in the future.
 */
import { NextResponse } from "next/server";
import { SEO_PAGES } from "@/data/keywords";
import { getPageContent } from "@/data/content";

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const page = SEO_PAGES.find((p) => p.slug === params.slug);

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = getPageContent(page, SEO_PAGES);

  return NextResponse.json({ slug: page.slug, page, content });
}
