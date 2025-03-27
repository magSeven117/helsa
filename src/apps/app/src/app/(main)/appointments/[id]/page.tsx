import Header from '@/src/components/appointment/call/header';
import { CallSkeleton, HeaderSkeleton } from '@/src/components/appointment/call/skeletons';
import WrapperCall from '@/src/components/call/wrapper';
import { Suspense } from 'react';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div className="w-full h-full flex flex-col justify-between px-5" defaultValue="chat" suppressHydrationWarning>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header id={params.id} />
      </Suspense>
      <div className="w-full h-full box-border grid grid-cols-8 max-md:grid-cols-1 py-5  gap-4">
        <Suspense fallback={<CallSkeleton />}>
          <WrapperCall id={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
