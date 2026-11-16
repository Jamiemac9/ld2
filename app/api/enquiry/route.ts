import { adminDb } from '@/lib/store';
import { str, isEmail, json } from '@/lib/validate';
import { notify } from '@/lib/notify';

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (str(b.website)) return json({ ok: true });
  const email = str(b.email, 120);
  const message = str(b.message, 1500);
  if (!isEmail(email) || !str(b.name) || message.length < 5 || !b.adult) return json({ error: 'Please fill in every field and confirm you are 18 or over.' }, 400);
  const db = adminDb();
  if (db) {
    const { error } = await db.from('enquiries').insert({ listing_id: str(b.listingId, 40), name: str(b.name, 80), email, message, postcode: str(b.postcode, 8).toUpperCase() });
    if (error) return json({ error: 'Could not send your enquiry. Please try again.' }, 500);
  }
  await notify(`New enquiry on ${str(b.listingId)}`, `${str(b.name)} <${email}>\n\n${message}`);
  return json({ ok: true });
}
