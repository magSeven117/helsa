'use client';
import { getAppointmentDiagnoses } from '@/src/actions/diagnostic/get-appointment-diagnoses';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import { getAppointmentTreatments } from '@/src/actions/treatment/get-appointment-treatments';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Ellipsis, Stethoscope } from 'lucide-react';
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

const Indications = ({ data: appointment }: { data: Primitives<Appointment> }) => {
  const [data, setData] = useState<{
    diagnoses: Primitives<Diagnostic>[];
    pathologies: Primitives<Pathology>[];
    treatments: Primitives<Treatment>[];
  }>({
    diagnoses: [],
    pathologies: [],
    treatments: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [diagnosesResponse, pathologiesResponse, treatmentsResponse] = await Promise.all([
        getAppointmentDiagnoses({ appointmentId: appointment.id }),
        getPathologies(),
        getAppointmentTreatments({ appointmentId: appointment.id }),
      ]);

      setData({
        diagnoses: diagnosesResponse?.data ?? [],
        pathologies: pathologiesResponse?.data ?? [],
        treatments: treatmentsResponse?.data ?? [],
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <Accordion type="multiple" defaultValue={[]} className="w-full px-1">
      <AccordionItem value="diagnoses">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Diagnósticos del paciente <Stethoscope className="size-4" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {data.diagnoses?.map((diagnosis, index) => (
            <div
              key={`${diagnosis.id}-${index}`}
              className="flex flex-col items-start justify-between p-3 gap-2 border rounded-none"
            >
              <div className="flex justify-between items-center w-full">
                <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">I70.173</div>
                <Ellipsis className="size-4" />
              </div>
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
    </Accordion>
  );
};

export default Indications;
