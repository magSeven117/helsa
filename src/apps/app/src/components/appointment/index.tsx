'use client';
import { VideoCallOld } from '@/src/components/call/stream';
import { CallSkeleton } from './call/sections/skeletons';
import { useStream } from './use-stream';

const Appointment = ({ id }: { id: string }) => {
  const { token, isFetching } = useStream(id);

  if (isFetching) {
    return <CallSkeleton />;
  }
  return (
    <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
      <div className=" h-full flex-col flex gap-2 border rounded-xl">
        <VideoCallOld id={id} token={token ?? ''} />
      </div>
    </div>
  );
};

export default Appointment;
