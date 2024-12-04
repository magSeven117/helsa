import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/libs/shadcn-ui/components/sheet';
import { AppointmentType } from '@/modules/doctor/domain/appointment-type';
import { Doctor } from '@/modules/doctor/domain/doctor';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import DoctorAppointment from './book-form';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: Primitives<Doctor>;
  types?: Primitives<AppointmentType>[];
};

const BookSheet = ({ data, isOpen, setOpen, types }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll">
          <SheetHeader>
            <SheetTitle>Agendar tu cita</SheetTitle>
          </SheetHeader>
          <DoctorAppointment doctor={data!} types={types ?? []} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookSheet;
