'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Button } from '@helsa/ui/components/button';
import { DialogTitle } from '@helsa/ui/components/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@helsa/ui/components/sheet';
import { useState } from 'react';
import DoctorSchedule from './doctor-schedule';

export default function DoctorScheduleModal({ doctor }: { doctor: Primitives<Doctor> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Horarios</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/4 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-hidden">
          <SheetHeader className="py-5">
            <DialogTitle className="my-3 text-xl">Modifica y establece tu disponibilidad</DialogTitle>
            <p className="text-xs text-muted-foreground">
              Establece tu disponibilidad para cada dia de la semana. Puedes agregar horas a tu dia y establecer tu
              horario de trabajo.
            </p>
          </SheetHeader>
          <DoctorSchedule doctorId={doctor.id} schedule={doctor.schedule!} setIsOpen={setIsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
