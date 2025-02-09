'use client';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { ReceiptText } from 'lucide-react';
import { useState } from 'react';
import VitalsForm from './form';
import VitalsInfo from './info';
type Props = {
  appointment: Primitives<Appointment>;
};
const Vitals = ({ appointment }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Signos vitales
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 border-none focus-visible:outline-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Signos vitales</SheetTitle>
                <p className="text-muted-foreground text-xs">Agregue o modifique los signos vitales del paciente</p>
              </div>
            </div>
          </SheetHeader>
          {!isEditing && <VitalsInfo toggle={() => setIsEditing((current) => !current)} appointment={appointment} />}
          {isEditing && <VitalsForm appointment={appointment} toggle={() => setIsEditing((current) => !current)} />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Vitals;
