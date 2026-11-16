# SellMyDoll.com

A UK brokerage for pre-owned dolls, built with Next.js 15 and Supabase, deployed to **Cloudflare Workers** with the OpenNext adapter.
The site sells **used dolls only**. New dolls appear only as affiliate links on `/buy-new`.

## Run locally
```bash
npm install
cp .env.example .env.local   # leave it blank to run on sample listings
npm run dev                  # http://localhost:3000
```
If Supabase isn't configured, the site shows `SAMPLE_LISTINGS` from `lib/data.ts`. As soon as the Supabase keys are set, it shows only real, approved listings.

## Deploy to Cloudflare (Workers, not static Pages)
This is a server-rendered Next.js app (API routes, admin, middleware), so it runs as a **Cloudflare Worker**. A static Pages upload won't serve it, and uploading the zip to GitHub won't work either. The repo needs these source files at its root.

1. Push this folder's contents to the root of the GitHub repo (`package.json` at the top level).
2. In Cloudflare, go to **Workers & Pages → Create → Import a repository**, and pick the repo.
3. Build settings:
   - Build command: `npm run cf-build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
4. Under **Settings → Variables and secrets**:
   - Build variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`. These are baked in at build time.
   - Runtime secrets: `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USER`, `ADMIN_PASSWORD`, `BREVO_API_KEY`, `NOTIFY_EMAIL`, `PAYMENT_LINK_*`.
5. Add the custom domain sellmydoll.com under **Settings → Domains & Routes**.
6. For AI search visibility (GEO), go to **Security → Bots** and make sure "Block AI bots" / AI crawl control isn't blocking the crawlers allowed in `robots.ts`.

Test locally on the Workers runtime: `npm run preview` (http://localhost:8787).

## Content: owner guides
Long-form guides live in `content/guides/*.md`, with a JSON header holding the title, description, category, a short answer and FAQs. `npm run guides` (run automatically before every build) compiles them into `lib/guides-data.ts`. Each guide page outputs:
- A "short answer" box for answer engines and featured snippets (AEO)
- `Article`, `FAQPage` and `BreadcrumbList` JSON-LD
- A table of contents with anchored headings, plus related-guide links
- An entry in `/sitemap.xml` and `/llms.txt`, a plain-text summary for AI assistants (GEO/AIO)

To add a guide, copy an existing `.md` file, edit it, and redeploy.

## Story images
The homepage story uses `public/story/*-800.webp` and `*-1600.webp`. Replace them with images you have the rights to, using the same file names.

## What's included
| Area | Where |
|---|---|
| Home, browse (filters for brand, material, height, body type, condition, price and region), listing pages | `app/page.tsx`, `app/browse`, `app/listing/[id]` |
| Sell flow: package choice, valuation hint, photo upload, declarations | `components/SellForm.tsx`, `app/api/listing` |
| Enquiries passed on anonymously, report-a-listing, waitlist | `app/api/enquiry`, `app/api/report`, `app/api/waitlist` |
| Moderation: approve (sends payment link), mark paid (goes live), reject (with reason) | `app/admin`, `app/api/admin` (protected by HTTP basic auth in `middleware.ts`) |
| Packages and prices | `TIERS` in `lib/data.ts` |
| Affiliate partners for new dolls | `AFFILIATE_PARTNERS` in `lib/data.ts` (set `active: true` and add the URL) |
| Policies | `lib/legal.ts` → `/legal/*` |
| Database schema, RLS and storage bucket | `supabase/migrations/001_init.sql` |

## Listing lifecycle
`pending` → (admin approves, seller is emailed a payment link) → `awaiting_payment` → (admin marks paid) → `approved` (live) → `sold` / `expired`.
Sellers are never charged for a listing you reject.

## Launch checklist
1. **Buy sellmydoll.com.** Add it to Netlify and set `NEXT_PUBLIC_SITE_URL`.
2. **Company admin:** register the new Ltd, register with the ICO (data protection fee), then fill the company name, number and address into `lib/legal.ts`. Have a solicitor review the terms and privacy notice.
3. **Supabase:** create a project in the London (eu-west-2) region, run `001_init.sql`, then set the three Supabase env vars.
4. **Payments:** open an account with an adult-friendly processor such as CCBill, Segpay or Verotel. Stripe, PayPal and Shopify Payments generally won't accept adult goods. Create three hosted payment links and set `PAYMENT_LINK_*`. Later, a payment webhook can mark listings as paid automatically.
5. **Brokered sales and buyer money:** if you take buyers' payments and pass them on to sellers, take advice on whether you fall under the FCA's commercial agent exclusion, or use a marketplace payment product that holds funds for you. Until that's settled, confirm the buyer has paid the seller before handover rather than holding the money yourself.
6. **Courier:** agree a rate with a discreet courier for 30–45 kg boxed items, mainland UK. Your £150 delivery margin depends on that rate.
7. **Email:** set up Brevo transactional email with SPF, DKIM and DMARC on sellmydoll.com, then set `BREVO_API_KEY` and `NOTIFY_EMAIL`.
8. **Admin:** set `ADMIN_USER` and a strong `ADMIN_PASSWORD`.
9. **Cloudflare:** set the env vars and deploy (see above).
10. **Seed listings:** list the first sellers from the opt-in campaign as Brokered, at the founding-seller price, so the site launches with real stock.

## Moderation rules (enforced in the form, the API and the database)
- Full-body dolls must be at least 150 cm (database constraint `full_doll_min_height`).
- All five seller declarations are required.
- 3–10 photos (JPG, PNG or WebP, 8 MB each at most).
- **A person reviews every listing.** Reject anything with a childlike appearance, whatever its stated height. Keep the record and report it to the police or the IWF where appropriate.
