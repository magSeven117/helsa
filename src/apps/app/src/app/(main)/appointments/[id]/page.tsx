import Header from '@/src/components/appointment/call/header';
import { CallSkeleton, HeaderSkeleton } from '@/src/components/appointment/call/skeletons';
import CallCHat from '@/src/components/call-chat';
import WrapperCall from '@/src/components/call/wrapper';
import { Suspense } from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between px-5" defaultValue="chat" suppressHydrationWarning>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header id={params.id} />
      </Suspense>
      <div className="w-full h-full box-border grid grid-cols-8 max-md:grid-cols-1 py-5  gap-4">
        <Suspense fallback={<CallSkeleton />}>
          <WrapperCall id={params.id} />
        </Suspense>
        <div className="col-span-2 mt-0 h-full border box-border flex-col justify-end flex gap-2 max-md:col-span-1">
          <CallCHat id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
