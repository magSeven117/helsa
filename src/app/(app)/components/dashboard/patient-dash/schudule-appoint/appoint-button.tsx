'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/libs/shadcn-ui/components/sheet';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import SearchDoctor from './search-doctor';

const Appoint = () => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-none" variant="outline">
          Agendar <Calendar />{' '}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/2 sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Agenda una cita</SheetTitle>
          <SheetDescription>Encuentra al profesional adecuado para ayudarte</SheetDescription>
        </SheetHeader>
        <div className="my-3">
          <SearchDoctor setSelectedDoctor={setSelectedDoctor}/>
        </div>
        {selectedDoctor && (
          <div className="flex gap-2 w-full p-2 cursor-pointer hover:bg-border border">
            <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="h-[50px] w-[50px] rounded-full" />
            <div className="flex flex-col justify-center">
              <div className="font-bold text-[1rem]">
                {selectedDoctor.name} - <span className="font-bold">{selectedDoctor.specialty}</span>
              </div>
              <div className="text-xs">
                {selectedDoctor.availability} - <span className="italic">Rate {selectedDoctor.rating}</span>
              </div>
            </div>
          </div>
        )}
        
      </SheetContent>
    </Sheet>
  );
};

export default Appoint;
