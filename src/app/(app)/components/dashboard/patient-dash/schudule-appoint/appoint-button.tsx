import { Button } from '@/libs/shadcn-ui/components/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/libs/shadcn-ui/components/sheet';
import { Calendar } from 'lucide-react';
import SearchDoctor from './search-doctor';

const Appoint = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-none" variant="outline">
          Agendar <Calendar />{' '}
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:w-[700px] sm:max-w-full'>
        <SheetHeader>
          <SheetTitle>Agenda una cita</SheetTitle>
          <SheetDescription>Encuentra al profesional adecuado para ayudarte</SheetDescription>
        </SheetHeader>
        <div>
          <SearchDoctor/>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Appoint;
