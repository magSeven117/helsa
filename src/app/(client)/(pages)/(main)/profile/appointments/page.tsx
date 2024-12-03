import { TypesTable } from '@/app/(client)/components/profile/appointments/appointments-table';
import { TypesSkeleton } from '@/app/(client)/components/profile/appointments/appointments-table/skeleton';
import { getDoctor } from '@/app/(server)/actions/doctor/get-doctor';
import { getSession } from '@/modules/shared/infrastructure/auth/better-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  const session = await getSession();
  const user = session?.user ?? null;
  if (!user) return redirect('/sign-in');
  const res = await getDoctor({ userId: user.id });
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
}
