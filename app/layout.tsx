import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { iconQuery } from "@/lib/icon-config";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { siteConfig, siteUrl } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.shortName,
  manifest: `/manifest.webmanifest${iconQuery}`,
  icons: {
    icon: [
      {
        url: `/favicon.svg${iconQuery}`,
        type: "image/svg+xml",
      },
      {
        url: `/favicon.ico${iconQuery}`,
        type: "image/x-icon",
      },
      {
        url: `/icon.png${iconQuery}`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: `/favicon.ico${iconQuery}`,
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: `/apple-icon.png${iconQuery}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
  ...buildMetadata({
    title: "Keşfet Muğla | Muğla gezi rehberi, rota önerileri ve yerel içerikler",
    description:
      "Muğla'nın ilçeleri, plajları, kamp alanları, doğa rotaları, tarihi durakları ve yerel lezzetleri için hazırlanmış derinlikli rehber içerikler.",
    path: "/",
    keywords: [
      "Muğla gezi rehberi",
      "Muğla plaj önerileri",
      "Muğla kamp alanları",
      "Muğla tarihi yerler",
      "kesfetmugla.com",
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${manrope.variable} ${fraunces.variable} bg-stone-50 font-sans text-slate-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
