import Tiers from '@/components/Tiers';

export const metadata = { title: 'Pricing', description: 'Pay one fee to sell your pre-owned doll, from £49. There is no commission, and you pay only once your listing is approved.' };

export default function Pricing() {
  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">Pricing</span>
        <h1>One fee. No commission.</h1>
        <p className="muted" style={{ maxWidth: 620, fontSize: '1.08rem' }}>Every listing is free to submit. Once we approve it, you pay one fixed fee, and you keep 100% of the sale price.</p>
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}><Tiers /></div>
      <section style={{ paddingTop: 30 }}>
        <div className="narrow prose">
          <h2>Good to know</h2>
          <ul>
            <li><b>We never store your doll.</b> It stays with you until it sells. With the delivery package, our courier collects it from you and takes it straight to the buyer.</li>
            <li><b>Upgrade at any time.</b> Pay only the difference to move from Standard to Brokered, or from Brokered to Brokered + UK delivery.</li>
            <li><b>If it hasn't sold after 60 days</b> on a Standard listing, renew for £19. Brokered listings stay live until they sell.</li>
            <li><b>Delivery is mainland UK only.</b> For the Highlands, islands and Northern Ireland, contact us for a quote.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
