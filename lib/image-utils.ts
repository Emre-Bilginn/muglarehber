import { defaultImageFallbackSrc, remoteImageHosts } from "@/lib/image-config";
import { siteConfig, siteUrl } from "@/lib/site-config";

type ImageIssueReason =
  | "missing-src"
  | "normalized-relative-src"
  | "same-origin-absolute-src"
  | "remote-host-not-allowlisted"
  | "upgraded-insecure-protocol";

type ResolvedImageSource = {
  originalSrc: string | null;
  src: string;
  fallbackSrc: string;
  isRemote: boolean;
  isSvg: boolean;
  reason: ImageIssueReason | null;
};

const categoryCoverImages: Record<string, string> = {
  "gezilecek-yerler": "/images/guides/gezilecek-yerler-cover.svg",
  plajlar: "/images/guides/plajlar-cover.svg",
  "kamp-alanlari": "/images/guides/kamp-alanlari-cover.svg",
  "yeme-icme": "/images/guides/yeme-icme-cover.svg",
  "tarihi-yerler": "/images/guides/tarihi-yerler-cover.svg",
  "doga-rotalari": "/images/guides/doga-rotalari-cover.svg",
  ilceler: "/images/guides/ilceler-cover.svg",
};

const categoryFallbackImages: Record<string, string> = {
  "gezilecek-yerler": "/images/fallback-places.jpg",
  plajlar: "/images/fallback-beaches.jpg",
  "kamp-alanlari": "/images/fallback-camping.jpg",
  "yeme-icme": "/images/fallback-food.jpg",
  "tarihi-yerler": "/images/fallback-history.jpg",
  "doga-rotalari": "/images/fallback-nature.jpg",
  ilceler: "/images/fallback-mugla.jpg",
  aktiviteler: "/images/fallback-nature.jpg",
  "restoranlar-kafeler": "/images/fallback-food.jpg",
  "oteller-konaklama": "/images/fallback-mugla.jpg",
  "gece-hayati": "/images/fallback-mugla.jpg",
  "ulasim-rehberi": "/images/fallback-mugla.jpg",
};

const articleImageFieldOrder = [
  "image",
  "coverImage",
  "thumbnail",
  "imageUrl",
  "featuredImage",
] as const;

type ArticleImageField = (typeof articleImageFieldOrder)[number];

export type ArticleImageInput = {
  title?: string | null;
  categorySlug?: string | null;
  categoryName?: string | null;
  image?: string | null;
  coverImage?: string | null;
  thumbnail?: string | null;
  imageUrl?: string | null;
  featuredImage?: string | null;
  imageAlt?: string | null;
  coverImageAlt?: string | null;
  thumbnailAlt?: string | null;
  featuredImageAlt?: string | null;
};

export type ResolvedArticleImage = ResolvedImageSource & {
  alt: string;
  sourceField: ArticleImageField | null;
};

const configuredOrigins = new Set(
  [
    siteUrl,
    `https://${siteConfig.domain}`,
    `https://www.${siteConfig.domain}`,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
  ]
    .map(normalizeOrigin)
    .filter((value): value is string => Boolean(value)),
);

function normalizeOrigin(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const preparedValue = value.startsWith("http") ? value : `https://${value}`;
    return new URL(preparedValue).origin;
  } catch {
    return null;
  }
}

function getDebugEnabled() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_IMAGE_DEBUG === "true" ||
    process.env.IMAGE_DEBUG === "true" ||
    process.env.DB_DEBUG === "true"
  );
}

function normalizeRelativeImagePath(value: string) {
  if (value.startsWith("/")) {
    return { src: value, normalized: false };
  }

  if (value.startsWith("images/")) {
    return { src: `/${value}`, normalized: true };
  }

  if (value.startsWith("./images/")) {
    return { src: `/${value.slice(2)}`, normalized: true };
  }

  if (value.startsWith("public/")) {
    return { src: `/${value.slice("public/".length)}`, normalized: true };
  }

  return null;
}

function getArticleImageAltValue(input: ArticleImageInput, sourceField: ArticleImageField | null) {
  switch (sourceField) {
    case "coverImage":
      return input.coverImageAlt;
    case "thumbnail":
      return input.thumbnailAlt;
    case "featuredImage":
      return input.featuredImageAlt;
    default:
      return input.imageAlt;
  }
}

function getArticleImageDefaultAlt(input: ArticleImageInput) {
  const title = input.title?.trim();
  if (title) {
    return `${title} kapak görseli`;
  }

  const categoryName = input.categoryName?.trim();
  if (categoryName) {
    return `${categoryName} için fallback görsel`;
  }

  return "Muğla rehber görseli";
}

export function logImageDebug(message: string, details: Record<string, unknown>) {
  if (!getDebugEnabled()) {
    return;
  }

  console.log(`[image-debug] ${message}`, details);
}

export function isRemoteImageSrc(src?: string | null) {
  const value = typeof src === "string" ? src.trim() : "";
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("//");
}

export function isLocalImageSrc(src?: string | null) {
  return normalizeImageSrc(src, "").startsWith("/");
}

export function isSvgImage(src?: string | null) {
  const normalizedSrc = normalizeImageSrc(src, "");
  return normalizedSrc.toLowerCase().split("?")[0].endsWith(".svg");
}

export function normalizeImageSrc(
  src?: string | null,
  fallbackSrc = defaultImageFallbackSrc,
) {
  const trimmedSrc = typeof src === "string" ? src.trim() : "";

  if (!trimmedSrc) {
    return fallbackSrc;
  }

  if (trimmedSrc.startsWith("data:") || trimmedSrc.startsWith("blob:")) {
    return trimmedSrc;
  }

  if (trimmedSrc.startsWith("//")) {
    return `https:${trimmedSrc}`;
  }

  const relativeMatch = normalizeRelativeImagePath(trimmedSrc);
  if (relativeMatch) {
    return relativeMatch.src;
  }

  try {
    const url = new URL(trimmedSrc);

    if (configuredOrigins.has(url.origin)) {
      return `${url.pathname}${url.search}`;
    }

    if (url.protocol === "http:" && remoteImageHosts.includes(url.hostname)) {
      url.protocol = "https:";
      return url.toString();
    }

    if (url.protocol !== "https:") {
      return fallbackSrc;
    }

    return url.toString();
  } catch {
    return fallbackSrc;
  }
}

export function isAllowedRemoteImage(src?: string | null) {
  const normalizedSrc = normalizeImageSrc(src, "");
  if (!isRemoteImageSrc(normalizedSrc)) {
    return true;
  }

  try {
    const url = new URL(normalizedSrc);
    return configuredOrigins.has(url.origin) || (
      url.protocol === "https:" && remoteImageHosts.includes(url.hostname)
    );
  } catch {
    return false;
  }
}

export function resolveImageSource(
  src?: string | null,
  fallbackSrc = defaultImageFallbackSrc,
): ResolvedImageSource {
  const trimmedSrc = typeof src === "string" ? src.trim() : "";

  if (!trimmedSrc) {
    return {
      originalSrc: null,
      src: fallbackSrc,
      fallbackSrc,
      isRemote: false,
      isSvg: isSvgImage(fallbackSrc),
      reason: "missing-src",
    };
  }

  if (isRemoteImageSrc(trimmedSrc)) {
    try {
      const preparedRemoteSrc = trimmedSrc.startsWith("//") ? `https:${trimmedSrc}` : trimmedSrc;
      const remoteUrl = new URL(preparedRemoteSrc);

      if (!configuredOrigins.has(remoteUrl.origin) && !remoteImageHosts.includes(remoteUrl.hostname)) {
        return {
          originalSrc: trimmedSrc,
          src: fallbackSrc,
          fallbackSrc,
          isRemote: true,
          isSvg: isSvgImage(fallbackSrc),
          reason: "remote-host-not-allowlisted",
        };
      }
    } catch {
      return {
        originalSrc: trimmedSrc,
        src: fallbackSrc,
        fallbackSrc,
        isRemote: true,
        isSvg: isSvgImage(fallbackSrc),
        reason: "remote-host-not-allowlisted",
      };
    }
  }

  const relativeMatch = normalizeRelativeImagePath(trimmedSrc);
  const normalizedSrc = normalizeImageSrc(trimmedSrc, fallbackSrc);

  if (isRemoteImageSrc(normalizedSrc) && !isAllowedRemoteImage(normalizedSrc)) {
    return {
      originalSrc: trimmedSrc,
      src: fallbackSrc,
      fallbackSrc,
      isRemote: true,
      isSvg: isSvgImage(fallbackSrc),
      reason: "remote-host-not-allowlisted",
    };
  }

  const reason =
    relativeMatch?.normalized
      ? "normalized-relative-src"
      : trimmedSrc.startsWith("http://") && normalizedSrc.startsWith("https://")
        ? "upgraded-insecure-protocol"
        : isRemoteImageSrc(trimmedSrc) && normalizedSrc.startsWith("/")
          ? "same-origin-absolute-src"
          : null;

  return {
    originalSrc: trimmedSrc,
    src: normalizedSrc,
    fallbackSrc,
    isRemote: isRemoteImageSrc(normalizedSrc),
    isSvg: isSvgImage(normalizedSrc),
    reason,
  };
}

export function getCategoryFallbackImage(slug?: string | null) {
  const normalizedSlug = slug?.trim().toLocaleLowerCase("tr");
  if (!normalizedSlug) {
    return defaultImageFallbackSrc;
  }

  return categoryFallbackImages[normalizedSlug] ?? defaultImageFallbackSrc;
}

export function getCategoryCoverImage(slug: string) {
  return categoryCoverImages[slug] ?? getCategoryFallbackImage(slug);
}

export function getCategoryCoverAlt(name: string) {
  return `${name} kategori kapak görseli`;
}

export function resolveArticleImageData(input: ArticleImageInput): ResolvedArticleImage {
  let sourceField: ArticleImageField | null = null;
  let candidateSrc: string | null = null;

  for (const field of articleImageFieldOrder) {
    const candidate = input[field];

    if (typeof candidate === "string" && candidate.trim()) {
      sourceField = field;
      candidateSrc = candidate.trim();
      break;
    }
  }

  const fallbackSrc = getCategoryFallbackImage(input.categorySlug);
  const alt = getArticleImageAltValue(input, sourceField)?.trim() || getArticleImageDefaultAlt(input);

  return {
    ...resolveImageSource(candidateSrc, fallbackSrc),
    alt,
    sourceField,
  };
}
