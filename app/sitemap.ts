import { getListings } from '@/lib/store';
import { LEGAL } from '@/lib/legal';
import { GUIDES } from '@/lib/guides';
export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com';
  const pages = ['', '/browse', '/sell', '/pricing', '/how-it-works', '/buy-new', '/faq', '/contact', '/guides', ...Object.keys(LEGAL).map((s) => `/legal/${s}`)];
  const listings = await getListings();
  return [...pages.map((p) => ({ url: base + p })), ...GUIDES.map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: g.updated, priority: 0.8 })), ...listings.map((l) => ({ url: `${base}/listing/${l.id}` }))];
}
