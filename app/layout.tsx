import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Script from "next/script";


export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Keşfet Muğla - Muğla Gezi ve Turizm Rehberi',
  description:
    'Muğla bölgesinin en kapsamlı gezi rehberi. Bodrum, Fethiye, Marmaris, Datça ve daha fazlası için plajlar, restoranlar, oteller ve aktiviteler hakkında bilgi edinin.',
  keywords:
    'Muğla, Bodrum, Fethiye, Marmaris, Ölüdeniz, Dalyan, tatil, gezi rehberi, plajlar, oteller, keşfet muğla',
  openGraph: {
    title: 'Keşfet Muğla - Muğla Gezi ve Turizm Rehberi',
    description: 'Muğla bölgesinin en kapsamlı gezi rehberi',
    images: ['/og-image.png'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="tr">
    <head>
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9872386753585488"
        crossOrigin="anonymous"
      />
    </head>

    <body className={inter.className}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </body>
  </html>
);

}
