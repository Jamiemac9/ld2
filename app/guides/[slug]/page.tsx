import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES, getGuide, renderMd, headings, AUTHOR } from '@/lib/guides';

type P = Promise<{ slug: string }>;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com';

export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: P }) {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: 'article', title: g.title, description: g.description, url: `${SITE}/guides/${g.slug}`, modifiedTime: g.updated },
  };
}

export default async function GuidePage({ params }: { params: P }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const toc = headings(g.body);
  const related = GUIDES.filter((x) => x.slug !== g.slug).sort((a, b) => Number(b.category === g.category) - Number(a.category === g.category)).slice(0, 3);
  const url = `${SITE}/guides/${g.slug}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: g.title, description: g.description, abstract: g.answer, dateModified: g.updated, datePublished: g.updated, mainEntityOfPage: url,
        author: { '@type': 'Organization', name: AUTHOR, url: SITE }, publisher: { '@type': 'Organization', name: 'SellMyDoll', url: SITE }, inLanguage: 'en-GB',
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer p'] } },
      { '@type': 'FAQPage', mainEntity: g.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
        { '@type': 'ListItem', position: 3, name: g.title, item: url }] },
    ],
  };
  return (
    <article className="narrow prose" style={{ padding: '56px 0 90px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="small muted" aria-label="Breadcrumb"><Link href="/guides">Guides</Link> / {g.category}</nav>
      <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', marginTop: 14 }}>{g.title}</h1>
      <div className="byline"><span>{AUTHOR}</span><span>·</span><span>Updated <time dateTime={g.updated}>{new Date(g.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time></span><span>·</span><span>{g.readMins} min read</span></div>

      <div className="answer"><b className="label">The short answer</b><p>{g.answer}</p></div>

      <nav className="toc" aria-label="Contents"><b>In this guide</b><ol>{toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}<li><a href="#faq">Frequently asked questions</a></li></ol></nav>

      <div dangerouslySetInnerHTML={{ __html: renderMd(g.body) }} />

      <h2 id="faq">Frequently asked questions</h2>
      <div>{g.faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>

      <div className="panel" style={{ marginTop: 40 }}>
        <h3 style={{ marginTop: 0 }}>Thinking of selling?</h3>
        <p className="muted">It's free to list. We check every listing by hand, suggest a fair price, and you pay only once your listing is approved.</p>
        <Link href="/sell" className="btn accent">Value &amp; list my doll</Link>
      </div>

      <h2>Related guides</h2>
      <div className="guide-grid">{related.map((r) => <Link key={r.slug} href={`/guides/${r.slug}`} className="guide-card"><span className="tag">{r.category}</span><h3 style={{ fontSize: '1.05rem' }}>{r.title}</h3></Link>)}</div>
    </article>
  );
}
