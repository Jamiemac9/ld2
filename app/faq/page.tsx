export const metadata = { title: 'FAQ' };

const QA: [string, string][] = [
  ['Is it really free to submit a listing?', 'Yes. You only pay once we have approved your listing. If we cannot list it, you pay nothing.'],
  ['Do you store dolls?', 'No. Your doll stays with you until it sells. With the delivery package, our courier collects it and takes it straight to the buyer.'],
  ['Will anyone see my name or address?', 'No. Listings show only the general region, such as "Midlands". Buyers contact you through us. With a brokered sale, the buyer never deals with you directly.'],
  ['How do you make sure used dolls are hygienic?', 'Every seller must confirm the doll has been thoroughly cleaned and sanitised. Any removable insert sold with the doll must be new and sealed; otherwise it is left out of the sale. We reject listings whose photos suggest a doll has not been properly cared for.'],
  ['What happens to my payment as a buyer?', 'On brokered sales we confirm your payment has cleared before the doll is released and agree the handover or delivery with you. On standard listings you agree payment directly with the seller. Never pay anyone who asks you to arrange things outside SellMyDoll.'],
  ['Do you sell new dolls?', 'No, we sell pre-owned dolls only. Our Buying New page links to partner retailers, and we may earn a commission if you buy through those links.'],
  ['Which dolls will you not accept?', 'We do not accept any doll with a childlike appearance, any full-body doll under 150 cm tall, damaged or unsafe dolls, or listings with explicit photos. See our prohibited items policy for the full list.'],
  ['How long does it take to sell?', 'It depends on brand, condition and price. Dolls from well-known brands in good condition, priced at around 40–60% of the new price, tend to sell fastest. We suggest a price when we review your listing.'],
  ['Can I delete my listing?', 'Yes, at any time. Email us or reply to any of our emails. Listing fees are not refundable once a listing has gone live.'],
];

export default function FAQ() {
  return (
    <div className="narrow" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">Help</span>
      <h1>Frequently asked questions</h1>
      <div style={{ marginTop: 24 }}>{QA.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </div>
  );
}
