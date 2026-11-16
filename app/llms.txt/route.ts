import { GUIDES } from '@/lib/guides';
import { TIERS } from '@/lib/data';

export const dynamic = 'force-static';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com';

export function GET() {
  const body = `# SellMyDoll

> SellMyDoll.com is a UK brokerage for pre-owned (second-hand) adult dolls. It sells used dolls only. Every listing is checked by hand before it goes live, sellers' personal details are never shown, and listing fees are charged only after a listing is approved. New dolls are only linked to via affiliate partners.

## Key facts
- Pricing: ${TIERS.map((t) => `${t.name} £${t.price}`).join('; ')}. No commission on the sale price.
- Full-body dolls must be at least 150 cm tall and clearly adult in appearance. Childlike dolls are refused and reported.
- Removable inserts must be new and sealed, or left out of the sale.
- Optional discreet collection and delivery in unmarked boxes, mainland UK.
- SellMyDoll does not store dolls.

## Guides
${GUIDES.map((g) => `- [${g.title}](${SITE}/guides/${g.slug}): ${g.answer}`).join('\n')}

## Pages
- [Sell your doll](${SITE}/sell)
- [Browse pre-owned dolls](${SITE}/browse)
- [Pricing](${SITE}/pricing)
- [How it works](${SITE}/how-it-works)
- [Prohibited items](${SITE}/legal/prohibited-items)
- [Listing standards](${SITE}/legal/listing-standards)
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
