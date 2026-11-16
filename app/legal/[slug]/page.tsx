import { notFound } from 'next/navigation';
import { LEGAL } from '@/lib/legal';

type P = Promise<{ slug: string }>;
export const generateStaticParams = () => Object.keys(LEGAL).map((slug) => ({ slug }));
export async function generateMetadata({ params }: { params: P }) { const d = LEGAL[(await params).slug]; return d ? { title: d.title } : {}; }

// minimal markdown: ## headings, - bullets, **bold**, *italic*, paragraphs
function md(src: string) {
  const inline = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
  const out: string[] = []; let list = false;
  for (const line of src.trim().split('\n')) {
    if (line.startsWith('- ')) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(line.slice(2))}</li>`); continue; }
    if (list) { out.push('</ul>'); list = false; }
    if (line.startsWith('## ')) out.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push('</ul>');
  return out.join('');
}

export default async function Legal({ params }: { params: P }) {
  const d = LEGAL[(await params).slug];
  if (!d) notFound();
  return (
    <div className="narrow prose" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">Policies</span>
      <h1>{d.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md(d.body) }} />
    </div>
  );
}
