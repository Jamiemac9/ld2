import Link from 'next/link';

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <Link href="/" className="logo">SellMy<span>Doll</span></Link>
        <nav className="nav">
          <Link href="/browse">Browse pre-owned</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/sell" className="btn accent">Sell your doll</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="logo" style={{ marginBottom: 10 }}>SellMy<span>Doll</span></div>
            <p>A discreet UK brokerage for pre-owned dolls. We check every listing before it goes live, and we sell used dolls only.</p>
            <p className="small">For adults 18 and over only.</p>
          </div>
          <div>
            <h4>Buy</h4>
            <Link href="/browse">All pre-owned</Link>
            <Link href="/browse?type=Full+doll">Full dolls</Link>
            <Link href="/browse?type=Torso">Torsos</Link>
            <Link href="/browse?type=Head">Heads</Link>
            <Link href="/buy-new">Buying new</Link>
          </div>
          <div>
            <h4>Sell</h4>
            <Link href="/sell">List your doll</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/legal/listing-standards">Listing standards</Link>
          </div>
          <div>
            <h4>Help</h4>
            <Link href="/guides">Owner guides</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/legal/prohibited-items">Prohibited items</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/affiliate-disclosure">Affiliate disclosure</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <p className="small" style={{ marginTop: 32 }}>© {new Date().getFullYear()} SellMyDoll.com. We are an independent brokerage and are not connected to any manufacturer or to any other doll retailer.</p>
      </div>
    </footer>
  );
}
