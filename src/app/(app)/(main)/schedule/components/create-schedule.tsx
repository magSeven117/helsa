'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { DialogTitle } from '@/libs/shadcn-ui/components/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/libs/shadcn-ui/components/sheet';
import { useState } from 'react';
import DoctorSchedule from './doctor-schedule';

type DaySchedule = {
  [key: string]: string[];
};

export default function DoctorScheduleModal({ doctorId }: { doctorId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Doctor Schedule</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/2 sm:max-w-full p-0 h-full flex flex-col overflow-y-scroll styled-scroll pb-3">
        <SheetHeader className="py-5 px-10">
          <DialogTitle className="my-3 text-xl">Modifica y establece tu disponibilidad</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Establece tu disponibilidad para cada dia de la semana. Puedes agregar horas a tu dia y establecer tu
            horario de trabajo.
          </p>
        </SheetHeader>
        <DoctorSchedule doctorId={doctorId} />
      </SheetContent>
    </Sheet>
  );
}
