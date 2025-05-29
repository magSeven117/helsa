'use client';

import { Button } from '@helsa/ui/components/button';
import { Card } from '@helsa/ui/components/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ManageSubscription({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Subscription</h2>

      <Card className="flex justify-between p-4 rounded-none">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Current plan</p>
          <p className="text-lg font-medium">Pro</p>
        </div>

        <div className="mt-auto">
          <Link
            href={`/api/portal?id=${userId}`}
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => setIsLoading(true)}
          >
            <Button variant="secondary" className="h-9 hover:bg-primary hover:text-secondary">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Manage subscription'}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
