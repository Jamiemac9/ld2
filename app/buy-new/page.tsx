import Link from 'next/link';
import { AFFILIATE_PARTNERS } from '@/lib/data';

export const metadata = { title: 'Buying a new doll', description: 'We sell pre-owned dolls only. To buy a new doll, use our partner retailers.' };

export default function BuyNew() {
  const live = AFFILIATE_PARTNERS.filter((p) => p.active && p.url);
  return (
    <div className="wrap" style={{ padding: '64px 0 90px' }}>
      <div style={{ maxWidth: 680 }}>
        <span className="eyebrow">Buying new</span>
        <h1>We sell pre-owned dolls only</h1>
        <p className="muted" style={{ fontSize: '1.08rem' }}>We don't stock or sell new dolls. If you'd prefer a new one, the retailers below sell new dolls directly. Your order, payment and warranty are with them, not with us.</p>
        <div className="notice small" style={{ margin: '18px 0 30px' }}><b>Affiliate disclosure:</b> some links on this page are affiliate links. If you buy through one, we may earn a commission at no extra cost to you. <Link href="/legal/affiliate-disclosure">More details</Link></div>
      </div>
      {live.length ? (
        <div className="grid">
          {live.map((p) => (
            <div key={p.name} className="panel">
              <h3>{p.name}</h3>
              <p className="muted small">{p.blurb}</p>
              <a className="btn" href={p.url} target="_blank" rel="sponsored nofollow noopener">Visit {p.name} ↗</a>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel" style={{ maxWidth: 680 }}>
          <h3>New-doll partners are coming soon</h3>
          <p className="muted">In the meantime, check our <Link href="/browse">pre-owned listings</Link>. Most are in excellent condition and cost far less than new.</p>
        </div>
      )}
    </div>
  );
}
