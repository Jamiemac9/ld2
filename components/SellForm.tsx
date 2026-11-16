'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TIERS, FILTERS, MIN_FULL_DOLL_HEIGHT_CM, TierId } from '@/lib/data';
import { gbp } from '@/lib/format';

const RESALE: Record<string, [number, number]> = { 'Like new': [0.55, 0.7], Excellent: [0.45, 0.6], 'Very good': [0.38, 0.5], Good: [0.28, 0.4], Fair: [0.15, 0.28] };

export default function SellForm({ initialTier }: { initialTier: TierId }) {
  const [tier, setTier] = useState<TierId>(initialTier);
  const [type, setType] = useState('Full doll');
  const [orig, setOrig] = useState('');
  const [cond, setCond] = useState('Excellent');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const r = RESALE[cond];
  const o = Number(orig);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const files = fd.getAll('photos').filter((f) => f instanceof File && f.size > 0) as File[];
    if (files.length < 3) { setMsg('Please add at least 3 photos.'); setState('error'); return; }
    if (files.length > 10) { setMsg('Please add no more than 10 photos.'); setState('error'); return; }
    if (files.some((f) => f.size > 8 * 1024 * 1024)) { setMsg('Each photo must be under 8 MB.'); setState('error'); return; }
    setState('sending');
    const res = await fetch('/api/listing', { method: 'POST', body: fd });
    const j = await res.json().catch(() => ({}));
    if (res.ok) { setState('sent'); setMsg(j.ref || ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else { setMsg(j.error || 'Something went wrong. Please try again.'); setState('error'); }
  }

  if (state === 'sent') return (
    <div className="panel">
      <span className="eyebrow">Received</span>
      <h2>Thanks, your listing is with us for review</h2>
      <p>Your reference is <b>{msg}</b>. We check every listing by hand and will email you within 24 hours. You'll either get a link to pay the {gbp(TIERS.find((t) => t.id === tier)!.price)} fee and go live, or a note explaining what needs to change.</p>
      <p className="muted">You haven't been charged, and you won't be unless we approve your listing.</p>
      <Link href="/" className="btn ghost">Back to home</Link>
    </div>
  );

  return (
    <form className="stack" onSubmit={submit} encType="multipart/form-data">
      <fieldset>
        <legend>1. Choose your package</legend>
        <div className="tierpick">
          {TIERS.map((t) => (
            <label key={t.id}>
              <span><input type="radio" name="tier" value={t.id} checked={tier === t.id} onChange={() => setTier(t.id)} /> <b>{t.name}</b></span>
              <span style={{ fontFamily: 'var(--display)', fontSize: '1.5rem' }}>{gbp(t.price)}</span>
              <span className="small muted">{t.tagline}</span>
            </label>
          ))}
        </div>
        <p className="small muted" style={{ margin: 0 }}>You pay only after we approve your listing. You can change package before then.</p>
      </fieldset>

      <fieldset>
        <legend>2. About your doll</legend>
        <div className="row3">
          <label className="field">Type<select name="type" value={type} onChange={(e) => setType(e.target.value)}>{FILTERS.types.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="field">Gender<select name="gender">{['Female', 'Male'].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="field">Brand<select name="brand" required>{FILTERS.brands.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        <div className="row3">
          <label className="field">Model / name <small>optional</small><input name="model" maxLength={80} /></label>
          <label className="field">Material<select name="material">{FILTERS.materials.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="field">Body type<select name="body">{FILTERS.bodies.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        <div className="row3">
          <label className="field">Height (cm) {type === 'Full doll' && <small>at least {MIN_FULL_DOLL_HEIGHT_CM} cm</small>}
            <input name="height_cm" type="number" min={type === 'Full doll' ? MIN_FULL_DOLL_HEIGHT_CM : 0} max={200} required={type === 'Full doll'} />
          </label>
          <label className="field">Weight (kg) <small>approximate</small><input name="weight_kg" type="number" step="0.5" min={0} max={80} /></label>
          <label className="field">How long have you owned it? (months)<input name="months_owned" type="number" min={0} max={240} required /></label>
        </div>
        <div className="row3">
          <label className="field">Condition<select name="condition" value={cond} onChange={(e) => setCond(e.target.value)}>{FILTERS.conditions.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="field">Price paid new (£)<input name="original_price_gbp" type="number" min={0} value={orig} onChange={(e) => setOrig(e.target.value)} /></label>
          <label className="field">Your asking price (£)<input name="price_gbp" type="number" min={50} required /></label>
        </div>
        {o > 0 && <div className="notice">Pre-owned dolls in <b>{cond.toLowerCase()}</b> condition usually sell for <b>{gbp(o * r[0])}–{gbp(o * r[1])}</b>. Pricing within that range helps it sell faster.</div>}
        <label className="field">Location<select name="region">{FILTERS.regions.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="field">What's included <small>One item per line, such as wigs, outfits, a spare head or standing feet</small><textarea name="includes" rows={3} maxLength={600} /></label>
        <label className="field">Description <small>Describe any wear, repairs or marks honestly. Listings that describe flaws clearly sell faster.</small><textarea name="description" rows={5} required minLength={40} maxLength={3000} /></label>
      </fieldset>

      <fieldset>
        <legend>3. Photos</legend>
        <p className="small muted" style={{ margin: 0 }}>Add 3 to 10 clear photos in good light, with the doll clothed or tastefully posed. Include close-ups of any wear. Photos must not show you, your home address or anything that identifies you. We'll reject explicit images.</p>
        <input type="file" name="photos" accept="image/jpeg,image/png,image/webp" multiple required />
      </fieldset>

      <fieldset>
        <legend>4. Your details <span className="small muted">(never shown publicly)</span></legend>
        <div className="row2">
          <label className="field">Name<input name="name" required maxLength={80} /></label>
          <label className="field">Email<input name="email" type="email" required maxLength={120} /></label>
        </div>
        <div className="row2">
          <label className="field">Phone <small>optional</small><input name="phone" type="tel" maxLength={20} /></label>
          <label className="field">Postcode<input name="postcode" required maxLength={8} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>5. Declarations</legend>
        <label className="check"><input type="checkbox" name="decl_owner" required /><span>I am 18 or over, I own this doll and I have the right to sell it.</span></label>
        <label className="check"><input type="checkbox" name="decl_adult_appearance" required /><span>The doll is designed, styled and described as an adult. I understand that anything with a childlike appearance will be refused and may be reported to the authorities. <Link href="/legal/prohibited-items">Prohibited items</Link></span></label>
        <label className="check"><input type="checkbox" name="decl_cleaned" required /><span>The doll has been thoroughly cleaned and sanitised, and will be again before handover.</span></label>
        <label className="check"><input type="checkbox" name="decl_inserts" required /><span>Any removable insert included is new and sealed. If not, I will leave it out of the sale.</span></label>
        <label className="check"><input type="checkbox" name="decl_accurate" required /><span>My description and photos are accurate, and I agree to the <Link href="/legal/terms">terms</Link> and <Link href="/legal/listing-standards">listing standards</Link>.</span></label>
        <label className="check"><input type="checkbox" name="marketing_opt_in" /><span>Email me occasional SellMyDoll updates (optional; you can unsubscribe at any time).</span></label>
      </fieldset>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden />
      {state === 'error' && <div className="notice err">{msg}</div>}
      <button className="btn accent block" disabled={state === 'sending'}>{state === 'sending' ? 'Uploading…' : 'Submit for review (free)'}</button>
    </form>
  );
}
