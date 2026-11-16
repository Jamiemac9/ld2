import Link from 'next/link';
import { TIERS } from '@/lib/data';
import { gbp } from '@/lib/format';

export default function Tiers() {
  return (
    <div className="tiers">
      {TIERS.map((t) => (
        <div key={t.id} className={`tier${t.popular ? ' pop' : ''}`}>
          {t.popular && <span className="badge">Most chosen</span>}
          <h3>{t.name}</h3>
          <div className="price">{gbp(t.price)}</div>
          <p className="muted small">{t.tagline} One fee, and nothing to pay until your listing is approved.</p>
          <ul>{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <Link href={`/sell?tier=${t.id}`} className={`btn block ${t.popular ? 'accent' : 'ghost'}`}>Choose {t.name}</Link>
        </div>
      ))}
    </div>
  );
}
