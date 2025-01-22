import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Pill } from 'lucide-react';

const Treatment = ({ name }: { name: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <Pill className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none right-1/3">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Agregar tratamiento</SheetTitle>
                <p className="text-muted-foreground text-xs">
                  Agrega un tratamiento para el diagnostico <span className="font-bold capitalize">{name}</span>
                </p>
              </div>
            </div>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Treatment;
