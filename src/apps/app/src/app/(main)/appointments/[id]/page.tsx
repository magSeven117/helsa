import FinishDetails from '@/src/modules/appointment/components/call/sections/finish-details';
import { CallSkeleton } from '@/src/modules/appointment/components/call/sections/skeletons';
import { Button } from '@helsa/ui/components/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div className="w-full h-full flex flex-col justify-between px-5" defaultValue="chat" suppressHydrationWarning>
      <div>
        <Link href={`/appointments`}>
          <Button className="[&_svg]:size-4 gap-2" variant={'outline'}>
            <ArrowLeft />
            <span className="hidden md:inline">Volver</span>
          </Button>
        </Link>
      </div>
      <div className="w-full h-full box-border grid grid-cols-8 max-md:grid-cols-1 py-5  gap-4">
        <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
          <div className=" h-full flex-col flex gap-2">
            <Suspense fallback={<CallSkeleton />}>
              <FinishDetails id={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
