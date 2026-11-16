import { GUIDE_DATA } from './guides-data';

export interface Guide {
  slug: string; title: string; description: string; category: string; readMins: number;
  answer: string; faqs: readonly (readonly [string, string])[]; body: string; updated: string;
}
export const GUIDES = GUIDE_DATA as unknown as Guide[];
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const AUTHOR = 'The SellMyDoll team';

export const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s: string) => esc(s)
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}"${u.startsWith('http') ? ' rel="noopener" target="_blank"' : ''}>${t}</a>`)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<i>$2</i>');

/** Headings (h2) for a table of contents. */
export const headings = (md: string) => md.split('\n').filter((l) => l.startsWith('## ')).map((l) => ({ text: l.slice(3).trim(), id: slugify(l.slice(3)) }));

/** Small markdown renderer: ##/###, paragraphs, ul/ol, tables, blockquotes, bold/italic, links. */
export function renderMd(md: string): string {
  const lines = md.split('\n'); const out: string[] = []; let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (l.startsWith('### ')) { out.push(`<h3 id="${slugify(l.slice(4))}">${inline(l.slice(4))}</h3>`); i++; continue; }
    if (l.startsWith('## ')) { out.push(`<h2 id="${slugify(l.slice(3))}">${inline(l.slice(3))}</h2>`); i++; continue; }
    if (l.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) { if (!/^\|[\s|:-]+\|$/.test(lines[i])) rows.push(lines[i].split('|').slice(1, -1).map((c) => c.trim())); i++; }
      const [h, ...b] = rows;
      out.push(`<div style="overflow-x:auto"><table><thead><tr>${h.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${b.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (l.startsWith('> ')) { const q: string[] = []; while (i < lines.length && lines[i].startsWith('>')) { q.push(inline(lines[i].replace(/^>\s?/, ''))); i++; } out.push(`<blockquote class="answer" style="font-size:.95rem">${q.join('<br/>')}</blockquote>`); continue; }
    if (/^- /.test(l)) { const it: string[] = []; while (i < lines.length && /^- /.test(lines[i])) { it.push(`<li>${inline(lines[i].slice(2))}</li>`); i++; } out.push(`<ul>${it.join('')}</ul>`); continue; }
    if (/^\d+\. /.test(l)) { const it: string[] = []; while (i < lines.length && /^\d+\. /.test(lines[i])) { it.push(`<li>${inline(lines[i].replace(/^\d+\. /, ''))}</li>`); i++; } out.push(`<ol>${it.join('')}</ol>`); continue; }
    const p: string[] = []; while (i < lines.length && lines[i].trim() && !/^(#|\||>|- |\d+\. )/.test(lines[i])) { p.push(lines[i]); i++; }
    out.push(`<p>${inline(p.join(' '))}</p>`);
  }
  return out.join('\n');
}
