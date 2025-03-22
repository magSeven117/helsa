import { ManageSubscription } from '@/src/components/profile/billing/manage-subscription';
import { Plans } from '@/src/components/profile/billing/plans';
import { UsageSkeleton } from '@/src/components/profile/billing/usage';
import { UsageServer } from '@/src/components/profile/billing/usage.server';
import { Suspense } from 'react';

const Page = async ({ searchParams }: { searchParams: Promise<{ plan: 'free' | 'standard' | 'pro' }> }) => {
  const { plan } = await searchParams;
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        {plan !== 'free' && <ManageSubscription userId="" />}
        {plan === 'free' && (
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Plans</h2>
            <Plans />
          </div>
        )}
        <Suspense fallback={<UsageSkeleton />}>
          <UsageServer plan={plan} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
