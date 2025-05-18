'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { ClipboardMinus, Loader2, Pill, ReceiptText, ScrollText } from 'lucide-react';
import { Diagnoses } from './diagnoses';
import { Orders } from './orders';
import { Treatments } from './treatments';
import { useIndications } from './use-indications';

const treatmentTypes = {
  MEDICATION: 'Medicamento',
  THERAPY: 'Terapia',
  PROCEDURE: 'Procedimiento',
};

const typesDiagnosis = {
  ALLERGY: 'Alergia',
  DISEASE: 'Enfermedad',
  CHRONIC_DISEASE: 'Enfermedad crónica',
  SYMPTOM: 'Síntomas',
};

const Indications = ({ appointment }: { appointment: Primitives<Appointment> }) => {
  const { diagnosis, orders, treatments, pending } = useIndications(appointment.id);
  if (pending) {
    return <IndicationsSkeleton />;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText />
          <span className="text-sm">Indicaciones</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader>
            <SheetTitle>Indicaciones</SheetTitle>
          </SheetHeader>
          <Tabs defaultValue="orders" className="flex flex-col flex-1 h-max">
            <TabsList className="bg-transparent border-b-2 border-b-border rounded-none w-full justify-start">
              <TabsTrigger value="orders" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
                <ScrollText className="size-4" /> Ordenes
              </TabsTrigger>
              <TabsTrigger value="treatments" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
                <Pill className="size-4" />
                Tratamientos
              </TabsTrigger>
              <TabsTrigger value="diagnosis" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
                <ClipboardMinus className="size-4" />
                Diagnósticos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="flex flex-col grow">
              <Orders orders={orders} appointmentId={appointment.id} patientId={appointment.patientId} />
            </TabsContent>
            <TabsContent value="treatments">
              <Treatments
                treatments={treatments}
                appointmentId={appointment.id}
                patientId={appointment.patientId}
                doctorId={appointment.doctorId}
              />
            </TabsContent>
            <TabsContent value="diagnosis" className="flex flex-col grow">
              <Diagnoses
                diagnoses={diagnosis}
                appointmentId={appointment.id}
                patientId={appointment.patientId}
                doctorId={appointment.doctorId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const IndicationsSkeleton = () => {
  return (
    <Button className="gap-2" variant={'outline'} disabled>
      <Loader2 className="animate-spin" />
      <span className="text-sm">Indications</span>
    </Button>
  );
};

export default Indications;
