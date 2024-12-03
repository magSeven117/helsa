import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/libs/shadcn-ui/components/sheet';
import DoctorAppointment from './book-form';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: {
    doctorId: string;
    name: string;
    image: string;
    specialty: string;
    score: number;
    experience: number;
    days: {
      day: string;
      hours: { hour: string }[];
    }[];
  };
};

const BookSheet = ({ data, isOpen, setOpen }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll">
          <SheetHeader>
            <SheetTitle>Agendar tu cita</SheetTitle>
          </SheetHeader>
          <DoctorAppointment doctor={data!} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookSheet;
