import { adminDb } from '@/lib/store';
import { str, isEmail, json } from '@/lib/validate';

export async function POST(req: Request) {
  const fd = await req.formData();
  const email = str(fd.get('email'), 120).toLowerCase();
  if (!isEmail(email)) return json({ error: 'Please enter a valid email.' }, 400);
  const db = adminDb();
  if (db) await db.from('waitlist').upsert({ email, interest: str(fd.get('interest'), 20) || 'selling' });
  return Response.redirect(new URL('/contact?joined=1', req.url), 303);
}
