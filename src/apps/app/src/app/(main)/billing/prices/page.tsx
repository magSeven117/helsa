import { TypesTable } from '@/src/modules/billing/components/prices/prices-table';
import { TypesSkeleton } from '@/src/modules/billing/components/prices/prices-table/skeleton';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <Suspense fallback={<TypesSkeleton />}>
          <TypesTable />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
