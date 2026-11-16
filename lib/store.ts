import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Listing, SAMPLE_LISTINGS, FILTERS } from './data';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasDb = Boolean(url && anon);
export const publicDb = (): SupabaseClient | null => (url && anon ? createClient(url, anon) : null);
/** Server-only client. Never import from a client component. */
export const adminDb = (): SupabaseClient | null => (url && service ? createClient(url, service, { auth: { persistSession: false } }) : null);

type Row = Record<string, any>;
const fromRow = (r: Row): Listing => ({
  id: r.id, title: r.title, brand: r.brand, model: r.model ?? undefined, type: r.type, gender: r.gender,
  material: r.material, heightCm: r.height_cm ?? undefined, weightKg: r.weight_kg ?? undefined, body: r.body,
  condition: r.condition, monthsOwned: r.months_owned, priceGbp: r.price_gbp, originalPriceGbp: r.original_price_gbp ?? undefined,
  region: r.region, includes: r.includes ?? [], description: r.description, tier: r.tier,
  photos: r.photos ?? [], createdAt: r.created_at, status: r.status,
});

export interface Query {
  brand?: string; material?: string; type?: string; body?: string; condition?: string;
  height?: string; price?: string; region?: string; gender?: string; sort?: string;
}

export async function getListings(q: Query = {}): Promise<Listing[]> {
  let items: Listing[];
  const db = publicDb();
  if (db) {
    const { data, error } = await db.from('listings').select('*').eq('status', 'approved').order('created_at', { ascending: false });
    items = error || !data ? [] : data.map(fromRow);
  } else {
    items = SAMPLE_LISTINGS;
  }
  const h = FILTERS.heights.find((x) => x.id === q.height);
  const p = FILTERS.prices.find((x) => x.id === q.price);
  items = items.filter((l) =>
    (!q.brand || l.brand === q.brand) && (!q.material || l.material === q.material) && (!q.type || l.type === q.type) &&
    (!q.body || l.body === q.body) && (!q.condition || l.condition === q.condition) && (!q.region || l.region === q.region) &&
    (!q.gender || l.gender === q.gender) && (!h || (l.heightCm !== undefined && l.heightCm >= h.min && l.heightCm <= h.max)) &&
    (!p || l.priceGbp <= p.max));
  const featuredFirst = (a: Listing, b: Listing) => Number(b.tier !== 'standard') - Number(a.tier !== 'standard');
  if (q.sort === 'price-asc') items = [...items].sort((a, b) => a.priceGbp - b.priceGbp);
  else if (q.sort === 'price-desc') items = [...items].sort((a, b) => b.priceGbp - a.priceGbp);
  else if (q.sort !== 'newest') items = [...items].sort(featuredFirst);
  return items;
}

export async function getListing(id: string): Promise<Listing | null> {
  const db = publicDb();
  if (db) {
    const { data } = await db.from('listings').select('*').eq('id', id).eq('status', 'approved').maybeSingle();
    return data ? fromRow(data) : null;
  }
  return SAMPLE_LISTINGS.find((l) => l.id === id) ?? null;
}

export async function getPending(): Promise<Row[]> {
  const db = adminDb();
  if (!db) return [];
  const { data } = await db.from('listings').select('*, sellers(email, name, phone)').eq('status', 'pending').order('created_at');
  return data ?? [];
}
