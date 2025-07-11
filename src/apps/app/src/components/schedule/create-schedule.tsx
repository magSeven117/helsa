'use client';

import { useSession } from '@/src/components/auth/session-provider';
import { getDoctorSchedule } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { Button } from '@helsa/ui/components/button';
import { DialogTitle } from '@helsa/ui/components/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@helsa/ui/components/sheet';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DoctorSchedule from './doctor-schedule';

export default function DoctorScheduleModal() {
  const { profile } = useSession();
  const { data: schedule, isPending } = useQuery({
    initialData: {
      id: '',
      days: [],
      appointmentDuration: 0,
      maxAppointmentsPerDay: 0,
    },
    queryFn: async () => getDoctorSchedule(profile.id),
    queryKey: ['schedule'],
    enabled: () => !!profile.id,
    refetchOnWindowFocus: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return (
      <Button variant="outline" disabled>
        Horarios
      </Button>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Horarios</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-hidden rounded-xl">
          <SheetHeader className="py-5 px-0">
            <DialogTitle className="my-3 text-xl">Modifica y establece tu disponibilidad</DialogTitle>
            <p className="text-xs text-muted-foreground">
              Establece tu disponibilidad para cada dia de la semana. Puedes agregar horas a tu dia y establecer tu
              horario de trabajo.
            </p>
          </SheetHeader>
          <DoctorSchedule doctorId={profile.id} schedule={schedule} setIsOpen={setIsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
