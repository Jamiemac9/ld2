import Link from 'next/link';

export const metadata = { title: 'How it works', description: 'How selling and buying pre-owned dolls works on SellMyDoll.com.' };

export default function How() {
  return (
    <div className="narrow prose" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">How it works</span>
      <h1>A brokerage, not a classifieds board</h1>
      <p className="muted" style={{ fontSize: '1.1rem' }}>We sit between sellers and buyers so neither of you has to share personal details until you're ready. We check every listing and screen every buyer.</p>

      <h2>Selling</h2>
      <h3>1. Submit your doll for free</h3>
      <p>Choose a package, describe your doll and upload 3 to 10 photos. You confirm it has been cleaned and meets our <Link href="/legal/listing-standards">listing standards</Link>.</p>
      <h3>2. We review it, usually within 24 hours</h3>
      <p>A person checks your photos and description and suggests a fair price based on recent sales. If something needs changing, we tell you what.</p>
      <h3>3. Pay once you're approved, then go live</h3>
      <p>We email you a secure payment link. As soon as you've paid, your listing is live. Your name, contact details and exact location are never shown.</p>
      <h3>4. Agree a sale</h3>
      <p><b>Standard:</b> we pass genuine enquiries to you without revealing your email address, and you agree the sale and arrange handover yourself. <b>Brokered:</b> we screen buyers, negotiate for you and confirm the buyer's payment has cleared before handover. <b>Brokered + UK delivery:</b> our courier collects your doll in an unmarked box and delivers it to the buyer.</p>

      <h2>Buying</h2>
      <p>Browse pre-owned dolls, then send an enquiry or make an offer. Sellers have to confirm every doll has been cleaned and sanitised, and that any removable insert is new and sealed. On brokered sales we handle the payment arrangements and delivery for you.</p>
      <p><Link href="/browse" className="btn accent">Browse listings</Link> <Link href="/sell" className="btn ghost">Sell your doll</Link></p>
    </div>
  );
}
