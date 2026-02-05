const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
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
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.bizevdeyokuz.com' },
      { protocol: 'https', hostname: 'trthaberstatic.cdn.wp.trt.com.tr' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.guneyegeturkiye.com' },
      { protocol: 'https', hostname: 'www.muglam.com.tr' },
      { protocol: 'https', hostname: 'cdn2.enuygun.com' },
      { protocol: 'https', hostname: 'lookaside.instagram.com' },
      { protocol: 'https', hostname: 'artuncotel.com' },
      { protocol: 'https', hostname: 'fethiyeturfiyatlari.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

module.exports = nextConfig;
