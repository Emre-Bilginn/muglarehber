export const siteConfig = {
  name: "Keşfet Muğla",
  shortName: "Keşfet Muğla",
  domain: "kesfetmugla.com",
  description:
    "Muğla'nın ilçeleri, plajları, kamp alanları, doğa rotaları ve yerel lezzetleri için derinlikli gezi rehberleri sunan içerik platformu.",
  defaultTitle:
    "Keşfet Muğla | Muğla gezi rehberi, rota önerileri ve yerel içerikler",
  email: "editor@kesfetmugla.com",
  contactEmail: "iletisim@kesfetmugla.com",
  ogImage: "/og-image.png",
  locale: "tr_TR",
  country: "TR",
};

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://kesfetmugla.com";

export const siteUrl = configuredUrl.startsWith("http")
  ? configuredUrl.replace(/\/$/, "")
  : `https://${configuredUrl.replace(/\/$/, "")}`;

export function absoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalizedPath}`;
}

