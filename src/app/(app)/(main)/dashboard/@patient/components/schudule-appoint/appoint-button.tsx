'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/libs/shadcn-ui/components/sheet';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import CompleteData from './complete-data';
import SearchDoctor from './search-doctor';

const Appoint = () => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    specialty: string;
    rating: number;
    avatar: string;
  } | null>(null);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-none" variant="outline">
          Agendar <Calendar />{' '}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/2 sm:max-w-full overflow-y-scroll styled-scroll focus-visible:outline-none">
        <SheetHeader>
          <SheetTitle>Agenda una cita</SheetTitle>
          <SheetDescription>Encuentra al profesional adecuado para ayudarte</SheetDescription>
        </SheetHeader>
        <div className="w-full">
          <div className="my-3">
            <SearchDoctor setSelectedDoctor={setSelectedDoctor} />
          </div>
          {selectedDoctor && (
            <>
              <div className="flex gap-2 w-full p-2">
                <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="h-[50px] w-[50px] rounded-full" />
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-[1rem]">
                    {selectedDoctor.name} - <span className="font-bold">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="text-xs">
                    <span className="italic">Rate {selectedDoctor.rating}</span>
                  </div>
                </div>
              </div>
              <CompleteData />
            </>
          )}
        </div>

        <SheetFooter>
          <Button onClick={() => setOpen(false)} className="rounded-none" variant="outline">
            Cancelar
          </Button>
          <Button className="rounded-none">Agendar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Appoint;
