'use client';
import { VideoCall } from '@/src/modules/call/components';
import { useStream } from '../../hooks/use-stream';
import { CallSkeleton } from './sections/skeletons';

const Appointment = ({ id }: { id: string }) => {
  const { token, isFetching } = useStream(id);

  if (isFetching) {
    return <CallSkeleton />;
  }
  return (
    <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
      <div className=" h-full flex-col flex gap-2 border rounded-xl">
        <VideoCall id={id} token={token ?? ''} />
      </div>
    </div>
  );
};

export default Appointment;
