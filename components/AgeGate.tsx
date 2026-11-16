'use client';
import { useEffect, useState } from 'react';

export default function AgeGate() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ok = document.cookie.includes('smd_age=1');
    try { ok = ok || localStorage.getItem('smd_age') === '1'; } catch {}
    setShow(!ok);
  }, []);
  if (!show) return null;
  const accept = () => {
    document.cookie = 'smd_age=1; max-age=2592000; path=/; samesite=lax';
    try { localStorage.setItem('smd_age', '1'); } catch {}
    setShow(false);
  };
  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="box">
        <span className="eyebrow">Adults only</span>
        <h2 id="gate-title">You must be 18 or over to enter</h2>
        <p className="muted">SellMyDoll.com is a marketplace for pre-owned adult products. By entering, you confirm you are 18 or over and that viewing this content is legal where you live.</p>
        <div className="btns">
          <button className="btn accent" onClick={accept}>I am 18 or over</button>
          <a className="btn ghost" href="https://www.google.co.uk">Leave</a>
        </div>
      </div>
    </div>
  );
}
