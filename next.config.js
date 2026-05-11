const path = require('path');
const { remoteImagePatterns } = require('./lib/image-config');

function getConfiguredSiteRemotePatterns() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    'https://kesfetmugla.com',
    'https://www.kesfetmugla.com',
  ].filter(Boolean);

  const seen = new Set();

  return candidates.flatMap((value) => {
    try {
      const preparedValue = value.startsWith('http') ? value : `https://${value}`;
      const url = new URL(preparedValue);
      const key = `${url.protocol}//${url.hostname}`;

      if (seen.has(key)) {
        return [];
      }

      seen.add(key);

      return [
        {
          protocol: url.protocol.replace(':', ''),
          hostname: url.hostname,
          pathname: '/**',
        },
      ];
    } catch {
      return [];
    }
  });
}

const configuredBasePath = process.env.NEXT_BASE_PATH?.trim();
const normalizedBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';
const configuredAssetPrefix = process.env.NEXT_ASSET_PREFIX?.trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  assetPrefix: configuredAssetPrefix || undefined,
  basePath: normalizedBasePath,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === 'true',
    remotePatterns: [...remoteImagePatterns, ...getConfiguredSiteRemotePatterns()],
  },
};

module.exports = nextConfig;
