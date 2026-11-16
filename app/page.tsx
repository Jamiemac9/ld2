import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import Tiers from '@/components/Tiers';
import Reveal from '@/components/Reveal';
import StoryImg from '@/components/StoryImg';
import { getListings } from '@/lib/store';
import { GUIDES } from '@/lib/guides';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com';
const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'SellMyDoll', url: SITE, description: 'A UK brokerage for pre-owned dolls. Every listing is checked by hand, sellers stay anonymous and listing fees are charged only after approval.', areaServed: 'GB' },
    { '@type': 'WebSite', '@id': `${SITE}/#site`, url: SITE, name: 'SellMyDoll', publisher: { '@id': `${SITE}/#org` } },
    { '@type': 'Service', name: 'Pre-owned doll brokerage', provider: { '@id': `${SITE}/#org` }, areaServed: 'GB',
      offers: [{ '@type': 'Offer', name: 'Standard listing', price: 49, priceCurrency: 'GBP' }, { '@type': 'Offer', name: 'Brokered sale', price: 97, priceCurrency: 'GBP' }, { '@type': 'Offer', name: 'Brokered sale with UK delivery', price: 247, priceCurrency: 'GBP' }] },
  ],
};

export default async function Home() {
  const listings = (await getListings()).slice(0, 4);
  return (
    <div className="cine">
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />

      <section className="cine-hero" style={{ padding: 0 }}>
        <StoryImg name="next-chapter" alt="A doll looking out over the water at sunset" eager pos="70% 30%" />
        <div className="wrap" data-reveal>
          <span className="eyebrow">UK pre-owned doll brokerage</span>
          <h1>Every doll has a story. Let's write the next chapter.</h1>
          <p>We find your doll a new owner privately and discreetly. Every buyer is checked, and you pay nothing until your listing is approved.</p>
          <div className="cta">
            <Link href="/sell" className="btn light">Sell your doll</Link>
            <Link href="/browse" className="btn outline-light">Browse pre-owned</Link>
          </div>
        </div>
        <span className="scrollcue">Her story</span>
      </section>

      <section className="chapter" style={{ padding: 0 }}>
        <div className="ch-media"><StoryImg name="arrival" alt="A doll with long pink hair sitting on a bed in a black knit top" /></div>
        <div className="ch-text" data-reveal>
          <div className="ch-num">I</div>
          <span className="eyebrow">The arrival</span>
          <h2>She arrived in a plain brown box.</h2>
          <p>It was weeks of waiting and hours of choosing, from her face and hair to her height and skin tone. Then one morning the courier knocked, and she was home.</p>
          <p>For most owners, that first day still stands out years later.</p>
        </div>
      </section>

      <section className="chapter flip" style={{ padding: 0 }}>
        <div className="ch-media"><StoryImg name="home" alt="A doll in a white top and red scarf sitting in a leather armchair" pos="50% 20%" /></div>
        <div className="ch-text" data-reveal>
          <div className="ch-num">II</div>
          <span className="eyebrow">The years together</span>
          <h2>She was looked after.</h2>
          <p>Powdered, dressed and stored with care. There were new wigs, new outfits and a favourite chair. Like anything you value, she took a little work, and you were glad to do it.</p>
          <p className="pull">The care you put in is exactly what the next owner is looking for.</p>
        </div>
      </section>

      <section className="interlude">
        <div data-reveal>
          <p>Then, as it does, life moved on.</p>
          <span>A new home · a new partner · less space · an upgrade</span>
        </div>
      </section>

      <section className="chapter" style={{ padding: 0 }}>
        <div className="ch-media"><StoryImg name="moving-on" alt="A doll in a white top on a boat, with mountains and water behind her" pos="50% 25%" /></div>
        <div className="ch-text" data-reveal>
          <div className="ch-num">III</div>
          <span className="eyebrow">Moving on</span>
          <h2>None of that means she wasn't loved.</h2>
          <p>Owners sell for all sorts of reasons: moving house, moving in with someone, or wanting a different model. The hard part is usually not the decision but the selling. Who do you trust? How do you keep it private? How do you get a doll that weighs 35 kg to a stranger?</p>
          <p>That's what we're here for.</p>
        </div>
      </section>

      <section className="chapter flip" style={{ padding: 0 }}>
        <div className="ch-media"><StoryImg name="next-chapter" alt="A doll seen from behind, looking out over sunlit water" pos="60% 40%" /></div>
        <div className="ch-text" data-reveal>
          <div className="ch-num">IV</div>
          <span className="eyebrow">The next chapter</span>
          <h2>We find her the right next owner.</h2>
          <p>Send us her details and photos, free of charge. We check your listing by hand, suggest a fair price and screen every buyer. Your name, email and address are never shown.</p>
          <p>If you'd like, we collect her and deliver her in an unmarked box, so you never meet the buyer.</p>
          <div><Link href="/sell" className="btn light">Start her listing, free</Link></div>
        </div>
      </section>

      <div className="promise">
        <div><b>Checked by a person</b><span>We review every listing and every photo before anything goes live.</span></div>
        <div><b>Pay once approved</b><span>If we can't list her, you pay nothing.</span></div>
        <div><b>Stays private</b><span>Buyers reach you through us. Your details are never shown.</span></div>
        <div><b>Pre-owned only</b><span>We don't sell new stock. We're a brokerage.</span></div>
      </div>

      <section>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, flexWrap: 'wrap', marginBottom: 24 }} data-reveal>
            <div><span className="eyebrow">Looking for a new home</span><h2 style={{ margin: 0, color: '#fff' }}>Recently listed</h2></div>
            <Link href="/browse" className="btn outline-light">See all listings</Link>
          </div>
          <div className="grid" style={{ color: 'var(--ink)' }}>{listings.map((l) => <ListingCard key={l.id} l={l} />)}</div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div style={{ maxWidth: 640, marginBottom: 36 }} data-reveal>
            <span className="eyebrow">Pricing</span>
            <h2 style={{ color: '#fff' }}>One fee. No commission. Nothing up front.</h2>
            <p style={{ color: '#a89e96' }}>Choose how much you want us to handle. Whatever she sells for, you keep all of it.</p>
          </div>
          <div style={{ color: 'var(--ink)' }}><Tiers /></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: 24 }}><span className="eyebrow">Owner guides</span><h2 style={{ color: '#fff' }}>Everything you need to know about buying, caring for and selling a pre-owned doll</h2></div>
          <div className="guide-grid">
            {GUIDES.slice(0, 6).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="guide-card">
                <span className="tag">{g.category}</span>
                <h3>{g.title}</h3>
                <p className="muted small" style={{ margin: 0 }}>{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="finale">
        <StoryImg name="arrival" alt="" pos="50% 20%" />
        <div data-reveal>
          <span className="eyebrow">Her next chapter starts here</span>
          <h2>It's free to list, and nothing goes live until you're happy.</h2>
          <p>Most listings are reviewed within 24 hours. You pay nothing unless we approve your listing, and you can withdraw at any time.</p>
          <Link href="/sell" className="btn light">Value &amp; list my doll</Link>
        </div>
      </section>
    </div>
  );
}
