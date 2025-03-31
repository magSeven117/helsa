'use client';
import { getAppointmentDiagnoses } from '@/src/actions/diagnostic/get-appointment-diagnoses';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import { getAppointmentOrders } from '@/src/actions/order/get-appointment-orders';
import { getAppointmentTreatments } from '@/src/actions/treatment/get-appointment-treatments';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { Order } from '@helsa/engine/order/domain/order';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Loader2, Paperclip, Pill, Stethoscope } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const typesOrders = {
  TEST: 'Exámenes',
  REMITTANCE: 'Remisión',
};

const Indications = ({ data: appointment }: { data: Primitives<Appointment> }) => {
  const [data, setData] = useState<{
    diagnoses: Primitives<Diagnostic>[];
    pathologies: Primitives<Pathology>[];
    treatments: Primitives<Treatment>[];
    orders: Primitives<Order>[];
  }>({
    diagnoses: [],
    pathologies: [],
    treatments: [],
    orders: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [diagnosesResponse, pathologiesResponse, treatmentsResponse, ordersResponse] = await Promise.all([
        getAppointmentDiagnoses({ appointmentId: appointment.id }),
        getPathologies(),
        getAppointmentTreatments({ appointmentId: appointment.id }),
        getAppointmentOrders({ appointmentId: appointment.id }),
      ]);

      setData({
        diagnoses: diagnosesResponse?.data ?? [],
        pathologies: pathologiesResponse?.data ?? [],
        treatments: treatmentsResponse?.data ?? [],
        orders: ordersResponse?.data ?? [],
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <Accordion type="multiple" defaultValue={[]} className="w-full px-1">
      <AccordionItem value="diagnoses">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Diagnósticos <Stethoscope className="size-4" />
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {data.diagnoses?.map((diagnosis, index) => (
            <div
              key={`${diagnosis.id}-${index}`}
              className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
            >
              <div className="flex justify-between items-center w-full">
                <p className="text-sm">{data.pathologies.find((c) => c.id === diagnosis.pathologyId)?.name!}</p>
                <Badge className="" variant={'default'}>
                  {typesDiagnosis[diagnosis.type]}
                </Badge>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="treatments">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Treatments <Pill className="size-4" />
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {data.treatments?.map((treatment, index) => (
            <div
              key={`${treatment.id}-${index}`}
              className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
            >
              <div className="flex justify-between items-center w-full">
                <p className="text-sm">
                  {treatment.medication?.name} / {treatment.medication?.dose} cada {treatment.medication?.frequency}
                </p>
                <Badge variant={'default'}>{typesTreatments[treatment.type]}</Badge>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="orders">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Ordenes <Paperclip className="size-4" />
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {data.orders?.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
            >
              <div className="flex justify-between items-center w-full">
                <p className="text-sm">{order.description}</p>
                <Badge variant={'default'}>{typesOrders[order.type]}</Badge>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Indications;
