import { adminDb, hasDb } from '@/lib/store';
import { gbp } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false } };

export default async function Admin() {
  const db = adminDb();
  if (!db) return <div className="narrow" style={{ padding: 60 }}><h1>Admin</h1><p>Connect Supabase (see README) to start reviewing listings. {hasDb ? 'The service role key is missing.' : ''}</p></div>;
  const [{ data: pending }, { data: awaiting }, { data: reports }, { data: enquiries }] = await Promise.all([
    db.from('listings').select('*, sellers(email, name, postcode)').eq('status', 'pending').order('created_at'),
    db.from('listings').select('id, title, tier, created_at, sellers(email)').eq('status', 'awaiting_payment').order('created_at'),
    db.from('reports').select('*').order('created_at', { ascending: false }).limit(20),
    db.from('enquiries').select('*').eq('status', 'new').order('created_at', { ascending: false }).limit(50),
  ]);
  return (
    <div className="wrap" style={{ padding: '40px 0 90px', display: 'grid', gap: 40 }}>
      <h1 style={{ fontSize: '2.2rem' }}>Moderation</h1>

      {reports && reports.length > 0 && <div className="notice err"><b>{reports.length} report(s).</b> {reports.map((r) => `${r.listing_id}: ${r.reason}`).join(' · ')}</div>}

      <section style={{ padding: 0 }}>
        <h2>Awaiting review ({pending?.length ?? 0})</h2>
        <div style={{ display: 'grid', gap: 18 }}>
          {pending?.map((l) => (
            <div key={l.id} className="panel" style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <b>{l.id} · {l.title} · {gbp(l.price_gbp)} · {l.tier}</b>
                <span className="small muted">{l.sellers?.name} · {l.sellers?.email} · {l.sellers?.postcode}</span>
              </div>
              <div className="small muted">{l.type} · {l.gender} · {l.material} · {l.height_cm ?? '-'} cm · {l.condition} · owned {l.months_owned} months · {l.region}</div>
              <p style={{ margin: 0 }}>{l.description}</p>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>{(l.photos as string[]).map((p) => <a key={p} href={p} target="_blank"><img src={p} alt="" style={{ height: 140, borderRadius: 8 }} /></a>)}</div>
              <div className="notice small">Check: does the doll clearly look adult in its face, body, styling and description? Is a full-body doll at least 150 cm? Are the photos non-explicit, with nothing identifying the seller? Are wear and repairs disclosed? Is the price realistic?</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <form method="post" action="/api/admin"><input type="hidden" name="id" value={l.id} /><input type="hidden" name="action" value="approve" /><button className="btn accent">Approve &amp; send payment link</button></form>
                <form method="post" action="/api/admin" style={{ display: 'flex', gap: 8, flex: 1, minWidth: 300 }}><input type="hidden" name="id" value={l.id} /><input type="hidden" name="action" value="reject" /><input name="reason" placeholder="Reason for rejection (sent to seller)" required /><button className="btn ghost">Reject</button></form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 0 }}>
        <h2>Approved, awaiting payment ({awaiting?.length ?? 0})</h2>
        <table className="table"><tbody>
          {awaiting?.map((l: any) => (
            <tr key={l.id}><td>{l.id}</td><td>{l.title}</td><td>{l.tier}</td><td>{l.sellers?.email}</td>
              <td><form method="post" action="/api/admin"><input type="hidden" name="id" value={l.id} /><input type="hidden" name="action" value="paid" /><button className="btn">Mark paid &amp; publish</button></form></td></tr>
          ))}
        </tbody></table>
      </section>

      <section style={{ padding: 0 }}>
        <h2>New enquiries ({enquiries?.length ?? 0})</h2>
        <table className="table"><thead><tr><th>Listing</th><th>From</th><th>Postcode</th><th>Message</th></tr></thead><tbody>
          {enquiries?.map((e) => <tr key={e.id}><td>{e.listing_id}</td><td>{e.name}<br /><span className="small muted">{e.email}</span></td><td>{e.postcode}</td><td>{e.message}</td></tr>)}
        </tbody></table>
      </section>
    </div>
  );
}
