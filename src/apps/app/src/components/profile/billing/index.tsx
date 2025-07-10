'use client';

import { useSubscription } from '../../../modules/profile/hooks/use-subcription';
import { ManageSubscription } from './manage-subscription';
import { Usage, UsageSkeleton } from './usage';

const Index = () => {
  const { subscription, isPending } = useSubscription();
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
