import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { getListings, Query } from '@/lib/store';
import { FILTERS } from '@/lib/data';

export const metadata = { title: 'Browse pre-owned dolls', description: 'Pre-owned TPE and silicone dolls for sale across the UK. Every listing is checked before it goes live.' };

type SP = Promise<Record<string, string | undefined>>;

function Sel({ name, label, opts, v }: { name: string; label: string; opts: { v: string; l: string }[]; v?: string }) {
  return (
    <label>{label}
      <select name={name} defaultValue={v ?? ''}>
        <option value="">Any</option>
        {opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </label>
  );
}
const s = (a: readonly string[]) => a.map((x) => ({ v: x, l: x }));

export default async function Browse({ searchParams }: { searchParams: SP }) {
  const q = (await searchParams) as Query;
  const items = await getListings(q);
  return (
    <div className="wrap browse">
      <form className="filters" method="get">
        <h3 style={{ margin: 0, gridColumn: '1/-1' }}>Filter</h3>
        <Sel name="type" label="Type" opts={s(FILTERS.types)} v={q.type} />
        <Sel name="gender" label="Gender" opts={s(['Female', 'Male'])} v={q.gender} />
        <Sel name="brand" label="Brand" opts={s(FILTERS.brands)} v={q.brand} />
        <Sel name="material" label="Material" opts={s(FILTERS.materials)} v={q.material} />
        <Sel name="height" label="Height" opts={FILTERS.heights.map((h) => ({ v: h.id, l: h.label }))} v={q.height} />
        <Sel name="body" label="Body type" opts={s(FILTERS.bodies)} v={q.body} />
        <Sel name="condition" label="Condition" opts={s(FILTERS.conditions)} v={q.condition} />
        <Sel name="price" label="Price" opts={FILTERS.prices.map((p) => ({ v: p.id, l: p.label }))} v={q.price} />
        <Sel name="region" label="Location" opts={s(FILTERS.regions)} v={q.region} />
        <Sel name="sort" label="Sort" opts={[{ v: 'newest', l: 'Newest' }, { v: 'price-asc', l: 'Price, low to high' }, { v: 'price-desc', l: 'Price, high to low' }]} v={q.sort} />
        <button className="btn block" type="submit">Apply filters</button>
        <Link href="/browse" className="small muted" style={{ textAlign: 'center' }}>Clear all</Link>
      </form>
      <div>
        <span className="eyebrow">Pre-owned only</span>
        <h1 style={{ fontSize: '2.4rem' }}>Browse pre-owned dolls</h1>
        <p className="muted">{items.length} listing{items.length === 1 ? '' : 's'}. We check every one before it goes live, and sellers have to confirm their doll has been cleaned and sanitised.</p>
        {items.length ? (
          <div className="grid" style={{ marginTop: 24 }}>{items.map((l) => <ListingCard key={l.id} l={l} />)}</div>
        ) : (
          <div className="panel" style={{ marginTop: 24 }}>
            <h3>Nothing matches those filters yet</h3>
            <p className="muted">New listings come in every week. Try removing some filters, or see our new-doll partners.</p>
            <Link href="/buy-new" className="btn ghost">Shop new from partners</Link>
          </div>
        )}
      </div>
    </div>
  );
}
