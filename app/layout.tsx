import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const siteUrlRaw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://kesfetmugla.com";

const siteUrl = siteUrlRaw.startsWith("http")
  ? siteUrlRaw
  : `https://${siteUrlRaw}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Keşfet Muğla - Muğla Gezi ve Turizm Rehberi",
  description:
    "Muğla bölgesinin en kapsamlı gezi rehberi. Bodrum, Fethiye, Marmaris, Datça ve daha fazlası için plajlar, restoranlar, oteller ve aktiviteler hakkında bilgi edinin.",
  keywords:
    "Muğla, Bodrum, Fethiye, Marmaris, Ölüdeniz, Dalyan, tatil, gezi rehberi, plajlar, oteller, keşfet muğla",
  openGraph: {
    title: "Keşfet Muğla - Muğla Gezi ve Turizm Rehberi",
    description: "Muğla bölgesinin en kapsamlı gezi rehberi",
    images: ["/og-image.png"],
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Keşfet Muğla - Muğla Gezi ve Turizm Rehberi",
    description: "Muğla bölgesinin en kapsamlı gezi rehberi",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  // ✅ AdSense doğrulama
  other: {
    "google-adsense-account": "ca-pub-9872386753585488",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${fraunces.variable} font-sans`}>

        {/* ✅ AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9872386753585488"
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        />

        {/* 🔥 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SKR8WPDV78"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SKR8WPDV78');
          `}
        </Script>

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}