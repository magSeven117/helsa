'use client';

import { getSubscription } from '@helsa/engine/subscription/infrastructure/http-subscription-api';
import { useQuery } from '@tanstack/react-query';
import { ManageSubscription } from './manage-subscription';
import { Usage, UsageSkeleton } from './usage';

const Index = () => {
  const { data: subscription, isPending } = useQuery({
    initialData: {
      customer: null,
      subscription: null,
      meters: [],
    },
    queryKey: ['subscription'],
    queryFn: async () => {
      return getSubscription();
    },
    refetchOnWindowFocus: false,
  });
  if (isPending) {
    return <UsageSkeleton />;
  }
  return (
    <>
      <Usage meters={subscription?.meters ?? []} plan={subscription?.subscription?.metadata.type ?? 'free'} />
      <ManageSubscription userId="" subscription={subscription.subscription} />
    </>
  );
};

export default Index;
