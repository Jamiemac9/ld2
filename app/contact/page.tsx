export const metadata = { title: 'Contact' };
export default async function Contact({ searchParams }: { searchParams: Promise<{ joined?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="narrow" style={{ padding: '64px 0 90px' }}>
      <span className="eyebrow">Contact</span>
      <h1>Talk to us</h1>
      <p className="muted">Email <a href="mailto:hello@sellmydoll.com">hello@sellmydoll.com</a>. We reply within one working day.</p>
      <div className="panel" style={{ marginTop: 28 }}>
        <h3>Not ready to list yet?</h3>
        <p className="muted">Leave your email and we'll send you selling tips and let you know about launch offers. Nothing else, and you can unsubscribe at any time.</p>
        {sp.joined ? <div className="notice ok">You're on the list. Thank you.</div> : (
          <form className="stack" method="post" action="/api/waitlist">
            <div className="row2">
              <input name="email" type="email" required placeholder="you@example.com" />
              <select name="interest"><option value="selling">I want to sell</option><option value="buying">I want to buy</option></select>
            </div>
            <button className="btn">Keep me posted</button>
          </form>
        )}
      </div>
    </div>
  );
}
