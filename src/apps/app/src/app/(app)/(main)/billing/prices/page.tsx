import { TypesTable } from '@/src/app/(app)/(main)/billing/_components/prices/prices-table';
import { TypesSkeleton } from '@/src/app/(app)/(main)/billing/_components/prices/prices-table/skeleton';
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
