import { TypesTable } from '@/app/(client)/components/profile/appointments/appointments-table';
import { TypesSkeleton } from '@/app/(client)/components/profile/appointments/appointments-table/skeleton';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <Suspense fallback={<TypesSkeleton />}>
          <TypesTable />
        </Suspense>
      </div>
    </div>
  );
}
