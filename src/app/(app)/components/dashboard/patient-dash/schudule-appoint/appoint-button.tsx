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
import ListDoctors from './list-doctors';
import SearchDoctor from './search-doctor';

const Appoint = () => {
  const [open, setOpen] = useState(false);
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
          <SearchDoctor />
        </div>
        <ListDoctors />
      </SheetContent>
    </Sheet>
  );
};

export default Appoint;
