/** Sends an internal notification email through Brevo, if BREVO_API_KEY is set. */
export async function notify(subject: string, text: string) {
  const key = process.env.BREVO_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) { console.log('[notify]', subject); return; }
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ sender: { email: to, name: 'SellMyDoll' }, to: [{ email: to }], subject, textContent: text }),
  }).catch(() => {});
}

/** Email a seller (transactional) through Brevo. */
export async function emailSeller(to: string, subject: string, text: string) {
  const key = process.env.BREVO_API_KEY;
  if (!key) { console.log('[emailSeller]', to, subject); return; }
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({ sender: { email: process.env.NOTIFY_EMAIL || 'hello@sellmydoll.com', name: 'SellMyDoll' }, to: [{ email: to }], subject, textContent: text }),
  }).catch(() => {});
}
