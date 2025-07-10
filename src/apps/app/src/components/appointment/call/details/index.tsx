'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { getPathologies, patientDiagnoses } from '@helsa/engine/diagnostic/infrastructure/http-diagnosis-api';
import { TreatmentStatusValues } from '@helsa/engine/treatment/domain/treatment-status';
import { patientTreatments } from '@helsa/engine/treatment/infrastructure/http-treatment-api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@helsa/ui/components/sheet';
import { cn } from '@helsa/ui/lib/utils';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Ellipsis, Pill, ReceiptText, Stethoscope } from 'lucide-react';
import { HeaderDoctor, HeaderPatient } from './headers';

const typesDiagnosis = {
  ALLERGY: 'Alergia',
  DISEASE: 'Enfermedad',
  CHRONIC_DISEASE: 'Enfermedad crónica',
  SYMPTOM: 'Síntomas',
};

const typesTreatments = {
  MEDICATION: 'Medicamento',
  THERAPY: 'Terapia',
  PROCEDURE: 'Procedimiento',
};

const DetailsSheet = ({ data, user }: { data: Primitives<Appointment>; user: any }) => {
  const { diagnoses, loading, treatments } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['diagnoses'],
        queryFn: async () => patientDiagnoses(data.patientId),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['treatments'],
        queryFn: async () => patientTreatments(data.patientId),
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [diagnoses, treatments] = results;
      return {
        diagnoses: diagnoses.data,
        treatments: treatments.data,
        loading: diagnoses.isLoading || treatments.isLoading,
      };
    },
  });
  if (loading) {
    <Button className="gap-2" variant={'outline'}>
      <ReceiptText className="size-4" />
      Detalles
    </Button>;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Detalles
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 rounded-xl">
          {user.role === 'DOCTOR' && <HeaderDoctor data={data} />}
          {user.role === 'PATIENT' && <HeaderPatient data={data} />}

          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Detalles</p>
            <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
          </div>
          <Accordion type="multiple" defaultValue={['notes']} className="w-full px-1">
            <AccordionItem value="diagnoses">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Diagnósticos del paciente <Stethoscope className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <DiagnosesList diagnoses={diagnoses} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="treatments">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Tratamientos del paciente <Pill className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {treatments?.map((treatment, index) => (
                  <div
                    key={`${treatment.id}-${index}`}
                    className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start items-center gap-2">
                        <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">
                          {typesTreatments[treatment.type]}
                        </div>
                        <div
                          className={cn('text-xs py-1 px-2 rounded-sm', {
                            'bg-green-600': treatment.status === TreatmentStatusValues.IN_PROGRESS,
                            'bg-blue-600': treatment.status === TreatmentStatusValues.COMPLETED,
                          })}
                        >
                          {treatment.type === 'MEDICATION' && treatment.medication?.name}
                          {treatment.type === 'THERAPY' && treatment.therapy?.description}
                          {treatment.type === 'PROCEDURE' && treatment.procedure?.description}
                        </div>
                        <div>
                          <span className="text-sm font-bold">
                            {new Date(treatment.endDate).toLocaleDateString()}
                            {treatment.type !== 'PROCEDURE' &&
                              ' - ' + new Date(treatment.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Ellipsis className="size-4" />
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;

const DiagnosesList = ({ diagnoses }: { diagnoses: Primitives<Diagnostic>[] }) => {
  const { data: pathologies } = useQuery({
    initialData: [],
    queryKey: ['pathologies'],
    queryFn: async () => getPathologies(),
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {diagnoses?.map((diagnosis, index) => (
        <div
          key={`${diagnosis.id}-${index}`}
          className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
        >
          <div className="flex justify-between items-center w-full">
            <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">I70.173</div>
            <Ellipsis className="size-4" />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm">{pathologies.find((c) => c.id === diagnosis.pathologyId)?.name!}</p>
            <Badge className="" variant={'default'}>
              {typesDiagnosis[diagnosis.type]}
            </Badge>
          </div>
        </div>
      ))}
    </>
  );
};
