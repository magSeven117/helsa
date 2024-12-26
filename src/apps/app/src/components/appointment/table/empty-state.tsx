'use client';
import { Button } from '@helsa/ui/components/button';
import { BookMarked } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  hasFilters?: boolean;
};

export function NoResults({ hasFilters }: Props) {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-300px)] flex items-center justify-center w-full">
      <div className="flex flex-col items-center">
        <BookMarked className="mb-4 size-10" />
        <div className="text-center mb-6 space-y-2">
          <h2 className="font-medium text-lg">No results</h2>
          <p className="text-[#606060] text-sm">
            {hasFilters ? 'Try another search, or adjusting the filters' : 'There are no appointments booked yet'}
          </p>
        </div>

        {hasFilters && (
          <Button variant="outline" onClick={() => router.push('/transactions')}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
