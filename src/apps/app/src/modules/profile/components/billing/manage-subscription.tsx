'use client';

import { Button } from '@helsa/ui/components/button';
import { Card } from '@helsa/ui/components/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Prices from './prices';

export function ManageSubscription({ userId, subscription }: { userId: string; subscription?: any }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Suscripción</h2>

      <Card className="flex justify-between p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Plan actual</p>
          <p className="text-lg font-medium">{subscription?.product?.name ?? ''}</p>
        </div>

        <div className="mt-auto">
          {subscription ? (
            <Link
              href={`/api/v1/payment/portal`}
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setIsLoading(true)}
            >
              <Button variant="secondary" className="h-9 hover:bg-primary hover:text-secondary">
                {isLoading ? <Loader2 className="animate-spin" /> : 'Administra tu suscripción'}
              </Button>
            </Link>
          ) : (
            <Prices />
          )}
        </div>
      </Card>
    </div>
  );
}
