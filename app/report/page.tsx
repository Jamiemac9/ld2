export const metadata = { title: 'Report a listing', robots: { index: false } };
export default async function Report({ searchParams }: { searchParams: Promise<{ listing?: string; sent?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="narrow" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">Trust &amp; safety</span>
      <h1>Report a listing</h1>
      {sp.sent ? <div className="notice ok">Thank you. We've received your report and will review it urgently. We may take the listing down while we look into it.</div> : (
        <form className="stack" method="post" action="/api/report">
          <label className="field">Listing reference<input name="listing" defaultValue={sp.listing} /></label>
          <label className="field">What's wrong?<textarea name="reason" rows={5} required /></label>
          <button className="btn accent">Send report</button>
          <p className="small muted">If you think a child may be at risk, report it to the police on 999 or 101, or to CEOP at ceop.police.uk.</p>
        </form>
      )}
    </div>
  );
}
