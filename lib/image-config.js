const defaultImageFallbackSrc = '/images/placeholder.svg';

const remoteImagePatterns = [
  { protocol: 'https', hostname: 'www.bizevdeyokuz.com', pathname: '/**' },
  { protocol: 'https', hostname: 'trthaberstatic.cdn.wp.trt.com.tr', pathname: '/**' },
  { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
  { protocol: 'https', hostname: 'www.guneyegeturkiye.com', pathname: '/**' },
  { protocol: 'https', hostname: 'www.muglam.com.tr', pathname: '/**' },
  { protocol: 'https', hostname: 'cdn2.enuygun.com', pathname: '/**' },
  { protocol: 'https', hostname: 'lookaside.instagram.com', pathname: '/**' },
  { protocol: 'https', hostname: 'artuncotel.com', pathname: '/**' },
  { protocol: 'https', hostname: 'fethiyeturfiyatlari.com', pathname: '/**' },
  { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
];

const remoteImageHosts = remoteImagePatterns.map((pattern) => pattern.hostname);

module.exports = {
  defaultImageFallbackSrc,
  remoteImageHosts,
  remoteImagePatterns,
};
