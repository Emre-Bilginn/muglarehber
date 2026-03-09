'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/images/placeholder.svg';

function isSvgSource(src: string) {
  return src.toLowerCase().split('?')[0].endsWith('.svg');
}

export default function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className,
  fill,
  style,
  sizes,
  ...props
}: ImageWithFallbackProps) {
  const resolvedSrc = src && src.trim() ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(src && src.trim() ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  const shouldUseNativeImage = useMemo(() => isSvgSource(currentSrc), [currentSrc]);

  if (shouldUseNativeImage) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        sizes={sizes}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
        style={
          fill
            ? {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                ...(style ?? {}),
              }
            : style
        }
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      style={style}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
