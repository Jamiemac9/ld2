import { adminDb } from '@/lib/store';
import { str, json } from '@/lib/validate';
import { notify } from '@/lib/notify';

export async function POST(req: Request) {
  const fd = await req.formData();
  const listing = str(fd.get('listing'), 40);
  const reason = str(fd.get('reason'), 1500);
  if (!reason) return json({ error: 'Please tell us what is wrong.' }, 400);
  const db = adminDb();
  if (db) await db.from('reports').insert({ listing_id: listing || null, reason });
  await notify(`URGENT listing report: ${listing}`, reason);
  return Response.redirect(new URL('/report?sent=1', req.url), 303);
}
