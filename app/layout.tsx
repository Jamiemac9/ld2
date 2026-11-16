import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import './globals.css';
import { Header, Footer } from '@/components/Chrome';
import AgeGate from '@/components/AgeGate';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sellmydoll.com'),
  title: { default: 'SellMyDoll.com | Sell or buy a pre-owned doll in the UK', template: '%s | SellMyDoll.com' },
  description: 'A discreet UK brokerage for pre-owned dolls. Every listing is checked before it goes live, buyers are screened, and you only pay once your listing is approved.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head><meta name="rating" content="adult" /><meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" /></head>
      <body>
        <AgeGate />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
