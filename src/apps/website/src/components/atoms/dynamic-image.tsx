'use client';

import { cn } from '@helsa/ui/lib/utils';
import type { ImageProps } from 'next/image';

interface DynamicImageProps extends Omit<ImageProps, 'src' | 'className'> {
  lightSrc: ImageProps['src'];
  darkSrc: ImageProps['src'];
  className?: string;
}

export function DynamicImage({ lightSrc, darkSrc, alt, className, ...props }: DynamicImageProps) {
  return (
    <>
      <img src={lightSrc.src} alt={alt} className={cn('dark:hidden', className)} {...props} />
      <img src={darkSrc.src} alt={alt} className={cn('hidden dark:block', className)} {...props} />
    </>
  );
}
