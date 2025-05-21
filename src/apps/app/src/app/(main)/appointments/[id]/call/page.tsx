import Appointment from '@/src/components/appointment';
import Header from '@/src/components/appointment/call/sections/header';
import { CallSkeleton } from '@/src/components/appointment/call/sections/skeletons';
import { Suspense } from 'react';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div className="w-full h-full flex flex-col justify-between px-5" defaultValue="chat" suppressHydrationWarning>
      <Header id={params.id} />
      <div className="w-full h-full box-border grid grid-cols-8 max-md:grid-cols-1 py-5  gap-4">
        <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
          <div className=" h-full flex-col flex gap-2">
            <Suspense fallback={<CallSkeleton />}>
              <Appointment id={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
