import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnquiryForm from '@/components/EnquiryForm';
import { getListing } from '@/lib/store';
import { gbp, owned } from '@/lib/format';

type P = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const l = await getListing((await params).id);
  return l ? { title: `${l.title} – ${gbp(l.priceGbp)}`, description: l.description.slice(0, 155) } : {};
}

export default async function ListingPage({ params }: { params: P }) {
  const l = await getListing((await params).id);
  if (!l) notFound();
  const spec: [string, string | undefined][] = [
    ['Brand', l.brand], ['Type', l.type], ['Material', l.material], ['Height', l.heightCm ? `${l.heightCm} cm` : undefined],
    ['Weight', l.weightKg ? `${l.weightKg} kg` : undefined], ['Body type', l.body], ['Condition', l.condition], ['Owned for', owned(l.monthsOwned)],
    ['Location', l.region], ['Listing ref', l.id],
  ];
  return (
    <div className="wrap detail">
      <div>
        <Link href="/browse" className="small muted">← Back to listings</Link>
        <div className="thumb" style={{ borderRadius: 20, marginTop: 16, aspectRatio: '4/4.4' }}>
          {l.photos[0] ? <img src={l.photos[0]} alt={l.title} /> : <span>{l.brand}</span>}
        </div>
        {l.photos.length > 1 && <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginTop: 12, gap: 10 }}>{l.photos.slice(1, 9).map((p) => <img key={p} src={p} alt="" style={{ borderRadius: 10, aspectRatio: '1', objectFit: 'cover' }} />)}</div>}
      </div>
      <div>
        <span className="eyebrow">{l.tier === 'standard' ? 'Private seller' : 'Brokered by SellMyDoll'}</span>
        <h1 style={{ fontSize: '2.2rem' }}>{l.title}</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--display)', fontSize: '2.2rem' }}>{gbp(l.priceGbp)}</span>
          {l.originalPriceGbp && <span className="muted">{gbp(l.originalPriceGbp)} new, so you save {gbp(l.originalPriceGbp - l.priceGbp)}</span>}
        </div>
        <div className="specs">{spec.filter(([, v]) => v).map(([k, v]) => <div key={k}><span>{k}</span>{v}</div>)}</div>
        <p>{l.description}</p>
        {l.includes.length > 0 && (<><h3>What's included</h3><ul>{l.includes.map((i) => <li key={i}>{i}</li>)}</ul></>)}
        <div className="notice" style={{ margin: '18px 0' }}>The seller has confirmed this doll has been cleaned and sanitised, and that any removable insert included is new and sealed. {l.tier === 'delivery' ? 'It will be collected and delivered in an unmarked box (mainland UK).' : 'Delivery or collection can be arranged when you agree the sale.'}</div>
        <div className="panel">
          <h3>Make an enquiry or offer</h3>
          <EnquiryForm listingId={l.id} />
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>Is something wrong with this listing? <Link href={`/report?listing=${l.id}`}>Report it</Link>.</p>
      </div>
    </div>
  );
}
