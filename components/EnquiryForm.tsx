'use client';
import { useState } from 'react';

export default function EnquiryForm({ listingId }: { listingId: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...body, listingId }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) setState('sent'); else { setErr(j.error || 'Something went wrong. Please try again.'); setState('error'); }
  }
  if (state === 'sent') return <div className="notice ok">Thanks, we've received your enquiry and will pass it to the seller. We usually reply within 24 hours. We never share your contact details until you agree to a sale.</div>;
  return (
    <form className="stack" onSubmit={submit}>
      <div className="row2">
        <label className="field">Name<input name="name" required maxLength={80} /></label>
        <label className="field">Email<input name="email" type="email" required maxLength={120} /></label>
      </div>
      <label className="field">Postcode area <small>For example B91. We use this to quote delivery.</small><input name="postcode" maxLength={8} /></label>
      <label className="field">Message<textarea name="message" rows={4} required maxLength={1500} placeholder="Ask about condition or what's included, or make an offer." /></label>
      <label className="check"><input type="checkbox" name="adult" required /><span>I confirm I am 18 or over.</span></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden />
      {state === 'error' && <div className="notice err">{err}</div>}
      <button className="btn accent block" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
    </form>
  );
}
