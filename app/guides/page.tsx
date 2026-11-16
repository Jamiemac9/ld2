import Link from 'next/link';
import { GUIDES } from '@/lib/guides';

export const metadata = {
  title: 'Owner guides: buying, caring for and selling a pre-owned doll',
  description: 'Practical, honest guides to buying a second-hand doll in the UK, TPE vs silicone, cleaning, storage, valuing and listing your doll.',
  alternates: { canonical: '/guides' },
};

export default function Guides() {
  const cats = Array.from(new Set(GUIDES.map((g) => g.category)));
  return (
    <div className="wrap" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">Owner guides</span>
      <h1 style={{ maxWidth: '18ch' }}>Everything you need to know about pre-owned dolls</h1>
      <p className="muted" style={{ maxWidth: 640, fontSize: '1.08rem' }}>Honest, practical guides written for UK owners, whether you're buying your first pre-owned doll, looking after one, or getting ready to sell.</p>
      {cats.map((c) => (
        <section key={c} style={{ padding: '36px 0 0' }}>
          <h2 style={{ fontSize: '1.5rem' }}>{c}</h2>
          <div className="guide-grid">
            {GUIDES.filter((g) => g.category === c).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                <span className="tag">{g.readMins} min read</span>
                <h3>{g.title}</h3>
                <p className="muted small" style={{ margin: 0 }}>{g.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
