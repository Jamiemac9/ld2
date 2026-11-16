import { adminDb } from '@/lib/store';
import { FILTERS, MIN_FULL_DOLL_HEIGHT_CM, TIERS } from '@/lib/data';
import { str, num, isEmail, bool, json } from '@/lib/validate';
import { notify } from '@/lib/notify';

const OK_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: Request) {
  const fd = await req.formData();
  if (str(fd.get('website'))) return json({ ref: 'smd-received' }); // honeypot

  const tier = str(fd.get('tier'));
  const type = str(fd.get('type'));
  const material = str(fd.get('material'));
  const height = num(fd.get('height_cm'));
  const price = num(fd.get('price_gbp'));
  const email = str(fd.get('email'), 120);
  const description = str(fd.get('description'), 3000);
  const decl = ['decl_owner', 'decl_adult_appearance', 'decl_cleaned', 'decl_inserts', 'decl_accurate'].map((k) => bool(fd.get(k)));

  if (!TIERS.some((t) => t.id === tier)) return json({ error: 'Please choose a package.' }, 400);
  if (!FILTERS.types.includes(type as any)) return json({ error: 'Please choose a doll type.' }, 400);
  if (!FILTERS.materials.includes(material as any)) return json({ error: 'Please choose a material.' }, 400);
  if (type === 'Full doll' && (!height || height < MIN_FULL_DOLL_HEIGHT_CM))
    return json({ error: `We only accept full-body dolls ${MIN_FULL_DOLL_HEIGHT_CM} cm or taller.` }, 400);
  if (!price || price < 50) return json({ error: 'Please enter an asking price of £50 or more.' }, 400);
  if (!isEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (description.length < 40) return json({ error: 'Please write a longer description (at least 40 characters).' }, 400);
  if (decl.includes(false)) return json({ error: 'Please tick all of the declarations.' }, 400);

  const photos = fd.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  if (photos.length < 3 || photos.length > 10) return json({ error: 'Please upload between 3 and 10 photos.' }, 400);
  if (photos.some((p) => !OK_TYPES.includes(p.type) || p.size > 8 * 1024 * 1024)) return json({ error: 'Photos must be JPG, PNG or WebP files under 8 MB each.' }, 400);

  const db = adminDb();
  if (!db) return json({ ref: 'smd-demo', demo: true }); // no database configured yet

  const { data: seller, error: se } = await db.from('sellers').insert({
    email, name: str(fd.get('name'), 80), phone: str(fd.get('phone'), 20) || null,
    postcode: str(fd.get('postcode'), 8).toUpperCase(), marketing_opt_in: bool(fd.get('marketing_opt_in')),
  }).select('id').single();
  if (se || !seller) return json({ error: 'Could not save your details. Please try again.' }, 500);

  const urls: string[] = [];
  for (const p of photos) {
    const ext = p.type.split('/')[1];
    const path = `${seller.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await db.storage.from('listing-photos').upload(path, p, { contentType: p.type });
    if (!error) urls.push(db.storage.from('listing-photos').getPublicUrl(path).data.publicUrl);
  }

  const brand = str(fd.get('brand'), 60);
  const model = str(fd.get('model'), 80);
  const { data: listing, error: le } = await db.from('listings').insert({
    seller_id: seller.id, tier, type, material, brand, model: model || null,
    gender: str(fd.get('gender')) === 'Male' ? 'Male' : 'Female',
    title: [brand, model, height ? `${height}cm` : '', type !== 'Full doll' ? type.toLowerCase() : ''].filter(Boolean).join(' '),
    height_cm: height, weight_kg: num(fd.get('weight_kg')), body: str(fd.get('body'), 30),
    condition: str(fd.get('condition'), 20), months_owned: num(fd.get('months_owned')) ?? 0,
    price_gbp: Math.round(price), original_price_gbp: num(fd.get('original_price_gbp')),
    region: str(fd.get('region'), 40),
    includes: str(fd.get('includes'), 600).split('\n').map((s) => s.trim()).filter(Boolean),
    description, photos: urls,
    decl_owner: true, decl_adult_appearance: true, decl_cleaned: true, decl_inserts: true, decl_accurate: true,
  }).select('id').single();
  if (le || !listing) return json({ error: 'Could not save your listing. Please try again.' }, 500);

  await notify(`New listing for review: ${listing.id} (${tier})`, `${brand} ${model}, ${type}, £${price}\nReview: ${process.env.NEXT_PUBLIC_SITE_URL}/admin`);
  return json({ ref: listing.id });
}
