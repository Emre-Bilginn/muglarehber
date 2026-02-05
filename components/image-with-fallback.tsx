'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/images/placeholder.svg';

export default function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}: ImageWithFallbackProps) {
  const resolvedSrc = src && src.trim() ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(src && src.trim() ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
