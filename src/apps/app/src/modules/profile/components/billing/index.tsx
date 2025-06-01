'use client';

import { useSubscription } from '../../hooks/use-subcription';
import { ManageSubscription } from './manage-subscription';
import { Usage, UsageSkeleton } from './usage';

const Index = () => {
  const { subscription, isPending } = useSubscription();
  if (isPending) {
    return <UsageSkeleton />;
  }
  return (
    <>
      <Usage
        data={{
          total_document_size: 0,
          number_of_users: 6,
          number_of_bank_connections: 2,
          inbox_created_this_month: 36,
          invoices_created_this_month: 28,
        }}
        plan={subscription?.subscription?.product?.id ?? 'free'}
      />
      <ManageSubscription userId="" subscription={subscription.subscription} />
    </>
  );
};

export default Index;
