'use client';
import { VideoCall } from '@/src/components/call';
import { getAppointmentRoom } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { useQuery } from '@tanstack/react-query';
import { CallSkeleton } from './sections/skeletons';

const Appointment = ({ id }: { id: string }) => {
  const { data: token, isFetching } = useQuery({
    queryKey: ['stream', id],
    queryFn: async () => getAppointmentRoom(id),
    refetchOnWindowFocus: false,
    enabled: () => !!id,
  });

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
