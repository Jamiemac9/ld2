import { adminDb } from '@/lib/store';
import { str } from '@/lib/validate';
import { emailSeller } from '@/lib/notify';
import { TIERS } from '@/lib/data';

const LINKS: Record<string, string | undefined> = {
  standard: process.env.PAYMENT_LINK_STANDARD, brokered: process.env.PAYMENT_LINK_BROKERED, delivery: process.env.PAYMENT_LINK_DELIVERY,
};

export async function POST(req: Request) {
  const fd = await req.formData();
  const id = str(fd.get('id'), 40), action = str(fd.get('action'), 20), reason = str(fd.get('reason'), 800);
  const db = adminDb();
  if (!db) return new Response('No database configured', { status: 503 });
  const { data: l } = await db.from('listings').select('*, sellers(email, name)').eq('id', id).single();
  if (!l) return new Response('Not found', { status: 404 });
  const seller = l.sellers as { email: string; name: string };
  const tier = TIERS.find((t) => t.id === l.tier)!;
  const now = new Date().toISOString();

  if (action === 'approve') {
    await db.from('listings').update({ status: 'awaiting_payment', reviewed_at: now, reviewed_by: 'admin' }).eq('id', id);
    const link = LINKS[l.tier] ? `${LINKS[l.tier]}?ref=${encodeURIComponent(id)}` : '[payment link]';
    await emailSeller(seller.email, `Your listing ${id} is approved`, `Hi ${seller.name},\n\nGood news: your ${l.title} listing has been approved.\n\nTo put it live, pay the one-off ${tier.name} fee of £${tier.price} here:\n${link}\n\nYour listing goes live as soon as payment comes through.\n\nSellMyDoll.com`);
  } else if (action === 'paid') {
    const days = l.tier === 'standard' ? 60 : 365;
    await db.from('listings').update({ status: 'approved', paid_at: now, expires_at: new Date(Date.now() + days * 864e5).toISOString() }).eq('id', id);
    await emailSeller(seller.email, `Your listing ${id} is live`, `Hi ${seller.name},\n\nYour listing is now live: ${process.env.NEXT_PUBLIC_SITE_URL}/listing/${id}\n\nWe'll pass any enquiries to you without sharing your details.\n\nSellMyDoll.com`);
  } else if (action === 'reject') {
    await db.from('listings').update({ status: 'rejected', rejection_reason: reason, reviewed_at: now, reviewed_by: 'admin' }).eq('id', id);
    await emailSeller(seller.email, `About your listing ${id}`, `Hi ${seller.name},\n\nThanks for submitting your listing. Unfortunately we can't approve it as it stands:\n\n${reason || 'It does not meet our listing standards.'}\n\nYou have not been charged. You're welcome to resubmit with these changes.\n\nSellMyDoll.com`);
  } else if (action === 'sold') {
    await db.from('listings').update({ status: 'sold' }).eq('id', id);
  }
  return Response.redirect(new URL('/admin', req.url), 303);
}
