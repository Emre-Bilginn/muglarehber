'use client';

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultImageFallbackSrc } from "@/lib/image-config";
import { isSvgImage, logImageDebug, resolveImageSource } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

const DEFAULT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3NTAiIHZpZXdCb3g9IjAgMCAxMjAwIDc1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI3NTAiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=";

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
  debugLabel?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = defaultImageFallbackSrc,
  alt,
  className,
  fill,
  sizes,
  style,
  showSkeleton = true,
  skeletonClassName,
  debugLabel,
  onError,
  onLoad,
  onLoadingComplete,
  placeholder,
  blurDataURL,
  ...props
}: SafeImageProps) {
  const initialSource = resolveImageSource(src, fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState(initialSource.src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const resolvedFallback = resolveImageSource(fallbackSrc, fallbackSrc).src;

  useEffect(() => {
    const nextSource = resolveImageSource(src, fallbackSrc);

    setCurrentSrc(nextSource.src);
    setIsLoaded(false);
    setHasFailed(false);

    if (nextSource.reason) {
      logImageDebug("safe-image:resolved", {
        label: debugLabel,
        reason: nextSource.reason,
        originalSrc: nextSource.originalSrc,
        resolvedSrc: nextSource.src,
      });
    }
  }, [debugLabel, fallbackSrc, src]);

  useEffect(() => {
    const imageElement = imageRef.current;

    if (!imageElement || !imageElement.complete) {
      return;
    }

    if (imageElement.naturalWidth > 0 || isSvgImage(currentSrc)) {
      setIsLoaded(true);
      setHasFailed(false);
      return;
    }

    if (currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
      setIsLoaded(false);
      setHasFailed(false);
      return;
    }

    setHasFailed(true);
    setIsLoaded(true);
  }, [currentSrc, resolvedFallback]);

  return (
    <>
      {showSkeleton ? (
        <Skeleton
          aria-hidden="true"
          className={cn(
            fill ? "absolute inset-0 rounded-none bg-slate-200/80" : "h-full w-full bg-slate-200/80",
            isLoaded ? "opacity-0 transition-opacity duration-300" : "opacity-100",
            skeletonClassName,
          )}
        />
      ) : null}

      <Image
        {...props}
        alt={alt ?? ""}
        className={cn(
          "transition-opacity duration-300",
          !isLoaded && "opacity-0",
          hasFailed && "opacity-0",
          className,
        )}
        fill={fill}
        ref={imageRef}
        sizes={sizes}
        style={style}
        src={currentSrc}
        blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
        placeholder={placeholder ?? (isSvgImage(currentSrc) ? "empty" : "blur")}
        unoptimized={props.unoptimized ?? isSvgImage(currentSrc)}
        onLoad={(event) => {
          setIsLoaded(true);
          setHasFailed(false);
          onLoad?.(event);
        }}
        onLoadingComplete={(imageElement) => {
          imageRef.current = imageElement;
          setIsLoaded(true);
          setHasFailed(false);
          onLoadingComplete?.(imageElement);
        }}
        onError={(event) => {
          logImageDebug("safe-image:error", {
            label: debugLabel,
            attemptedSrc: currentSrc,
            fallbackSrc: resolvedFallback,
          });

          if (currentSrc !== resolvedFallback) {
            setCurrentSrc(resolvedFallback);
            setIsLoaded(false);
            setHasFailed(false);
          } else {
            setHasFailed(true);
            setIsLoaded(true);
          }

          onError?.(event);
        }}
      />

      {hasFailed ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-100/90 px-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          Gorsel yuklenemedi
        </span>
      ) : null}
    </>
  );
}
