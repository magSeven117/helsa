'use client';
import {
  appointmentInitialData,
  getAppointment,
} from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { useQuery } from '@tanstack/react-query';
import Buttons from './buttons';
import { HeaderSkeleton } from './skeletons';
import Title from './title';

const Header = ({ id }: { id: string }) => {
  const {
    data: appointment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointment', id],
    initialData: appointmentInitialData,
    queryFn: async () =>
      getAppointment(id, {
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
      }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col justify-between px-5">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500">Error loading appointment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 gap-3 max-md:grid-cols-1">
      <Title appointment={appointment} />
      <Buttons appointment={appointment} />
    </div>
  );
};

export default Header;
