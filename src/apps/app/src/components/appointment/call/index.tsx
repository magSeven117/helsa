'use client';
import DailyVideoCall from '@/src/components/call/daily-video-call';
import { getAppointmentRoom } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { useQuery } from '@tanstack/react-query';
import { CallSkeleton } from './sections/skeletons';

const Appointment = ({ id }: { id: string }) => {
  const { data: roomData, isFetching } = useQuery({
    queryKey: ['daily-room', id],
    queryFn: async () => getAppointmentRoom(id),
    refetchOnWindowFocus: false,
    enabled: () => !!id,
  });

  if (isFetching) {
    return <CallSkeleton />;
  }

  // roomData ahora contiene { token, roomUrl }
  const { token, roomUrl } = roomData || {};

  return (
    <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
      <div className=" h-full flex-col flex gap-2 border rounded-xl">
        <DailyVideoCall 
          roomUrl={roomUrl || ''} 
          token={token} 
          appointmentId={id} 
        />
      </div>
    </div>
  );
};

export default Appointment;
