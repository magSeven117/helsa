'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { DialogTitle } from '@/libs/shadcn-ui/components/dialog';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/libs/shadcn-ui/components/sheet';
import { useState } from 'react';
import DoctorSchedule from './doctor-schedule';

type DaySchedule = {
  [key: string]: string[];
};

export default function DoctorScheduleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Doctor Schedule</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/2 sm:max-w-full p-0 h-full flex flex-col">
        <SheetHeader className="border-b px-10">
          <DialogTitle className="my-3 text-xl">Modifica y establece tu disponibilidad</DialogTitle>
        </SheetHeader>
        <DoctorSchedule />
        <SheetFooter className="px-10 py-5">
          <Button className="mt-4 w-full" onClick={() => setIsOpen(false)}>
            Save Schedule
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
