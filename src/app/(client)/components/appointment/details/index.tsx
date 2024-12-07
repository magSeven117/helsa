import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/libs/shadcn-ui/components/sheet';
import { Appointment } from '@/modules/appointment/domain/appointment';
import { AppointmentType } from '@/modules/doctor/domain/appointment-type';
import { Primitives } from '@/modules/shared/domain/types/primitives';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: Primitives<Appointment>;
  types?: Primitives<AppointmentType>[];
};

const AppointmentDetailsSheet = ({ data, isOpen, setOpen, types }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll">
          <SheetHeader>
            <SheetTitle>Agendar tu cita</SheetTitle>
          </SheetHeader>
          {JSON.stringify(data)}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
