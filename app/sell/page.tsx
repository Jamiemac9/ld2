import SellForm from '@/components/SellForm';
import { TierId } from '@/lib/data';

export const metadata = { title: 'Sell your doll', description: 'List your pre-owned doll in a few minutes. Free to submit, and you pay only once we approve your listing.' };

export default async function Sell({ searchParams }: { searchParams: Promise<{ tier?: string }> }) {
  const t = (await searchParams).tier;
  const tier: TierId = t === 'standard' || t === 'delivery' ? t : 'brokered';
  return (
    <div className="narrow" style={{ padding: '56px 0 90px' }}>
      <span className="eyebrow">Sell your doll</span>
      <h1 style={{ fontSize: '2.6rem' }}>List your doll in about five minutes</h1>
      <p className="muted" style={{ fontSize: '1.08rem' }}>It's free to submit. We review every listing by hand and email you within 24 hours. You pay only once your listing is approved, and we never store your doll.</p>
      <div style={{ marginTop: 28 }}><SellForm initialTier={tier} /></div>
    </div>
  );
}
