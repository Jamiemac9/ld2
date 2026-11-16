export type Condition = 'Like new' | 'Excellent' | 'Very good' | 'Good' | 'Fair';
export type DollType = 'Full doll' | 'Torso' | 'Head';
export type Material = 'TPE' | 'Silicone' | 'Hybrid (silicone head, TPE body)';

export interface Listing {
  id: string;
  title: string;
  brand: string;
  model?: string;
  type: DollType;
  gender: 'Female' | 'Male';
  material: Material;
  heightCm?: number;
  weightKg?: number;
  body?: 'Slim' | 'Athletic' | 'Curvy' | 'Full-figured';
  condition: Condition;
  monthsOwned: number;
  priceGbp: number;
  originalPriceGbp?: number;
  region: string;
  includes: string[];
  description: string;
  tier: TierId;
  photos: string[];
  createdAt: string;
  status?: 'pending' | 'approved' | 'sold' | 'rejected';
}

export type TierId = 'standard' | 'brokered' | 'delivery';

export const TIERS: {
  id: TierId; name: string; price: number; tagline: string; popular?: boolean; features: string[];
}[] = [
  {
    id: 'standard', name: 'Standard listing', price: 49,
    tagline: 'List it and handle the sale yourself.',
    features: [
      'Live for 60 days, or until it sells',
      'Up to 10 photos',
      'Your listing checked and approved by us',
      'Buyer enquiries passed to you anonymously, so your email and number stay private',
    ],
  },
  {
    id: 'brokered', name: 'Brokered sale', price: 97, popular: true,
    tagline: 'We sell it for you.',
    features: [
      'Everything in Standard, live until sold',
      'We write the listing and edit your photos',
      'Featured on the homepage and in search',
      'We screen buyers, negotiate for you and confirm payment before handover',
    ],
  },
  {
    id: 'delivery', name: 'Brokered + UK delivery', price: 247,
    tagline: 'Everything handled, including collection and delivery.',
    features: [
      'Everything in Brokered sale',
      'Discreet collection from your address',
      'Unmarked, insured delivery to the buyer (mainland UK)',
      'You never meet the buyer',
    ],
  },
];

export const FILTERS = {
  brands: ['WM Doll', 'Irontech', 'JY Doll', 'SE Doll', 'YL Doll', 'DS Doll', 'Starpery', 'Zelex', 'Sino Doll', 'Other'],
  materials: ['TPE', 'Silicone', 'Hybrid (silicone head, TPE body)'] as Material[],
  types: ['Full doll', 'Torso', 'Head'] as DollType[],
  bodies: ['Slim', 'Athletic', 'Curvy', 'Full-figured'],
  conditions: ['Like new', 'Excellent', 'Very good', 'Good', 'Fair'] as Condition[],
  heights: [
    { id: '150-159', label: '150–159 cm', min: 150, max: 159 },
    { id: '160-169', label: '160–169 cm', min: 160, max: 169 },
    { id: '170', label: '170 cm +', min: 170, max: 999 },
  ],
  prices: [
    { id: '500', label: 'Under £500', max: 500 },
    { id: '1000', label: 'Under £1,000', max: 1000 },
    { id: '1500', label: 'Under £1,500', max: 1500 },
  ],
  regions: ['London', 'South East', 'South West', 'Midlands', 'North West', 'North East', 'Yorkshire', 'East of England', 'Wales', 'Scotland', 'Northern Ireland'],
};

/** Minimum standing height for full-body dolls. See /legal/prohibited-items. */
export const MIN_FULL_DOLL_HEIGHT_CM = 150;

/**
 * New dolls are ONLY sold via affiliate partners. Add a partner once you have
 * signed their affiliate programme; set active: true and paste the tracking URL.
 */
export const AFFILIATE_PARTNERS: { name: string; blurb: string; url: string; active: boolean }[] = [
  { name: 'Partner retailer 1', blurb: 'Authorised UK stock of major brands, next-day delivery.', url: '', active: false },
  { name: 'Partner retailer 2', blurb: 'Factory-direct custom builds with worldwide shipping.', url: '', active: false },
];

export const SAMPLE_LISTINGS: Listing[] = [
  { id: 'smd-1042', title: 'WM Doll 166cm, TPE, very lightly used', brand: 'WM Doll', model: '166cm C-cup', type: 'Full doll', gender: 'Female', material: 'TPE', heightCm: 166, weightKg: 36, body: 'Curvy', condition: 'Excellent', monthsOwned: 14, priceGbp: 795, originalPriceGbp: 1449, region: 'Midlands', includes: ['Standing feet', 'Original wig + 1 spare', '2 outfits', 'Unused sealed insert'], description: 'Stored in her original box under a cover the whole time. No tears or stains. Skin has been re-powdered and the doll has been deep-cleaned.', tier: 'brokered', photos: [], createdAt: '2026-11-10' },
  { id: 'smd-1039', title: 'Irontech 165cm, silicone head', brand: 'Irontech', type: 'Full doll', gender: 'Female', material: 'Hybrid (silicone head, TPE body)', heightCm: 165, weightKg: 35, body: 'Athletic', condition: 'Very good', monthsOwned: 22, priceGbp: 950, originalPriceGbp: 1850, region: 'London', includes: ['Hand-painted silicone head', 'Implanted eyebrows', 'Hanging hook'], description: 'Light wear on the fingertips, shown in the photos. Otherwise in great condition. Selling because I am moving house.', tier: 'delivery', photos: [], createdAt: '2026-11-08' },
  { id: 'smd-1035', title: 'DS Doll silicone, Evolution body', brand: 'DS Doll', type: 'Full doll', gender: 'Female', material: 'Silicone', heightCm: 163, weightKg: 39, body: 'Slim', condition: 'Like new', monthsOwned: 6, priceGbp: 1895, originalPriceGbp: 3295, region: 'Scotland', includes: ['Two heads', 'Articulated hands', 'Original paperwork'], description: 'Bought as a display doll and used very little. All original paperwork included.', tier: 'brokered', photos: [], createdAt: '2026-11-05' },
  { id: 'smd-1031', title: 'JY Doll 158cm, budget friendly', brand: 'JY Doll', type: 'Full doll', gender: 'Female', material: 'TPE', heightCm: 158, weightKg: 30, body: 'Slim', condition: 'Good', monthsOwned: 30, priceGbp: 380, originalPriceGbp: 999, region: 'North West', includes: ['Standing feet', 'Wig'], description: 'A small repair to the left wrist has been done professionally. Priced to sell.', tier: 'standard', photos: [], createdAt: '2026-11-02' },
  { id: 'smd-1027', title: 'SE Doll 161cm, full-figured', brand: 'SE Doll', type: 'Full doll', gender: 'Female', material: 'TPE', heightCm: 161, weightKg: 42, body: 'Full-figured', condition: 'Very good', monthsOwned: 18, priceGbp: 720, originalPriceGbp: 1399, region: 'Yorkshire', includes: ['Gel-filled chest', 'Heating system (unused)', '3 outfits'], description: 'Has been deep-cleaned and comes with her cleaning kit.', tier: 'brokered', photos: [], createdAt: '2026-10-29' },
  { id: 'smd-1022', title: 'Male doll 175cm, athletic', brand: 'Sino Doll', type: 'Full doll', gender: 'Male', material: 'Silicone', heightCm: 175, weightKg: 45, body: 'Athletic', condition: 'Excellent', monthsOwned: 12, priceGbp: 1450, originalPriceGbp: 2600, region: 'South East', includes: ['Silicone head', 'Shoulder articulation'], description: 'Excellent condition with no marks. Collection preferred.', tier: 'standard', photos: [], createdAt: '2026-10-26' },
  { id: 'smd-1018', title: 'YL Doll torso, realistic weight', brand: 'YL Doll', type: 'Torso', gender: 'Female', material: 'TPE', weightKg: 16, body: 'Curvy', condition: 'Very good', monthsOwned: 9, priceGbp: 260, originalPriceGbp: 499, region: 'Wales', includes: ['Fixed design, deep-cleaned'], description: 'Easy to store and move. Has been deep-cleaned and dried thoroughly.', tier: 'standard', photos: [], createdAt: '2026-10-20' },
  { id: 'smd-1012', title: 'Zelex silicone head only', brand: 'Zelex', type: 'Head', gender: 'Female', material: 'Silicone', condition: 'Like new', monthsOwned: 3, priceGbp: 340, originalPriceGbp: 590, region: 'East of England', includes: ['M16 neck bolt', 'Implanted hair'], description: 'A spare head that was never fitted. Fits most M16 bodies.', tier: 'standard', photos: [], createdAt: '2026-10-15' },
];
