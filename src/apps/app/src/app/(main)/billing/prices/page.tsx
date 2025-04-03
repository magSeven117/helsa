import { getDoctor } from '@/src/actions/doctor/get-doctor';
import { TypesTable } from '@/src/components/billing/prices/prices-table';
import { TypesSkeleton } from '@/src/components/billing/prices/prices-table/skeleton';
import { Suspense } from 'react';

const Page = async () => {
  const res = await getDoctor();
  const doctor = res?.data ?? null;
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <Suspense fallback={<TypesSkeleton />}>
          <TypesTable doctorId={doctor?.id ?? ''} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
