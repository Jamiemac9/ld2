import Link from 'next/link';
import { Listing } from '@/lib/data';
import { gbp } from '@/lib/format';

export default function ListingCard({ l }: { l: Listing }) {
  return (
    <Link href={`/listing/${l.id}`} className="card">
      <div className="thumb">
        {l.photos[0] ? <img src={l.photos[0]} alt={l.title} loading="lazy" /> : <span>{l.brand}</span>}
        <span className="flag">{l.tier === 'standard' ? l.condition : 'Brokered · ' + l.condition}</span>
      </div>
      <div className="body">
        <div className="t">{l.title}</div>
        <div className="meta">{[l.type, l.material.split(' ')[0], l.heightCm && `${l.heightCm} cm`, l.region].filter(Boolean).join(' · ')}</div>
        <div className="p"><b>{gbp(l.priceGbp)}</b>{l.originalPriceGbp && <s>{gbp(l.originalPriceGbp)} new</s>}</div>
      </div>
    </Link>
  );
}
