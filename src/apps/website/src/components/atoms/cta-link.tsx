'use client';

import { cn } from '@helsa/ui/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function CtaLink({ text, className }: { text: string; className?: string }) {
  return (
    <Link
      href="https://app.midday.ai"
      className={cn(
        'font-medium text-sm flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200  xl:flex',
        className,
      )}
    >
      <span>{text}</span>
      <ExternalLink />
    </Link>
  );
}
