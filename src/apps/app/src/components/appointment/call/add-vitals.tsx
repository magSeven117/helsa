/* eslint-disable react/jsx-no-undef */
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { ReceiptText } from 'lucide-react';
import Vitals from './vitals';

const AddVitals = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Add Vitals
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
          <Vitals />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddVitals;
