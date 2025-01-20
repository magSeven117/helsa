/* eslint-disable react/jsx-no-undef */
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@helsa/ui/components/sheet';
import {  ReceiptText } from 'lucide-react';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import Vitals from '../../onboard/vitals';



const addVitals = () => {

    return (

    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Add Vitals
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:w-1/3 sm:max-w-full p-4 border-none focus-visible:outline-none'>
        <Vitals />
      </SheetContent>
    </Sheet>
    );
};

export default addVitals;