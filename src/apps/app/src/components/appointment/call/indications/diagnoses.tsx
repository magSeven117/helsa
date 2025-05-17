import { usePathologies } from '@/src/hooks/use-pathologies';
import { useSymptoms } from '@/src/hooks/use-symptoms';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisTypeValues } from '@helsa/engine/diagnostic/domain/diagnosis-type';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Combobox } from '@helsa/ui/components/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardMinus, Ellipsis, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';
import { useAddIndications } from './use-indications';

type Props = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  diagnoses: Primitives<Diagnostic>[];
};
export const Diagnoses = ({ appointmentId, patientId, doctorId, diagnoses }: Props) => {
  const [editing, setEditing] = useState(false);
  const toggle = () => setEditing((current) => !current);
  return (
    <>
      {editing ? (
        <DiagnosisForm appointmentId={appointmentId} doctorId={doctorId} patientId={patientId} toggle={toggle} />
      ) : (
        <DiagnosesList diagnoses={diagnoses} toggle={toggle} />
      )}
    </>
  );
};

const typesDiagnosis = {
  ALLERGY: 'Alergia',
  DISEASE: 'Enfermedad',
  CHRONIC_DISEASE: 'Enfermedad crónica',
  SYMPTOM: 'Síntomas',
};

type ListProps = {
  diagnoses: Primitives<Diagnostic>[];
  toggle: VoidFunction;
};

const DiagnosesList = ({ diagnoses, toggle }: ListProps) => {
  const { pathologies } = usePathologies();
  return (
    <div className="flex justify-between flex-col gap-4 flex-1">
      <div className="flex flex-col gap-3">
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
              <p className="text-sm">{pathologies.find((c) => c.id === diagnosis.pathologyId)?.name ?? '-'}</p>
              <Badge className="" variant={'default'}>
                {typesDiagnosis[diagnosis.type]}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={toggle}>
        <ClipboardMinus className="size-4" />
        Agregar diagnostico
      </Button>
    </div>
  );
};

const formSchema = z.object({
  diagnosis: z.string(),
  symptoms: z.string(),
  notes: z.string(),
  type: z.enum(['ALLERGY', 'DISEASE', 'CHRONIC_DISEASE', 'SYMPTOM']),
});

function transformOption(specialty: { id: string; name: string }) {
  return {
    value: specialty.name,
    label: specialty.name,
  };
}

type FormProps = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  toggle: VoidFunction;
};

const DiagnosisForm = ({ toggle, appointmentId, doctorId, patientId }: FormProps) => {
  const { pathologies } = usePathologies();
  const { symptoms } = useSymptoms();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: '',
      symptoms: '',
      notes: '',
    },
  });
  const { createDiagnosis } = useAddIndications();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = v4();
      await createDiagnosis({
        id,
        type: values.type as DiagnosisTypeValues,
        description: values.notes,
        patientId,
        doctorId,
        appointmentId,
        pathologyId: pathologies.find((d) => d.name === values.diagnosis)?.id!,
      });
      toast.success('Diagnostico agregado correctamente');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error al agregar diagnostico');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between flex-1">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Tipo de diagnostico</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between items-center"
                  >
                    <FormItem className="flex  items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="ALLERGY" />
                      </FormControl>
                      <FormLabel className="font-normal">Alergia</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="DISEASE" />
                      </FormControl>
                      <FormLabel className="font-normal">Enfermedad</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="CHRONIC_DISEASE" />
                      </FormControl>
                      <FormLabel className="font-normal">Crónica</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Combobox
            onChange={(v) => {
              const value = v as string;
              const symptom = symptoms?.find((s) => s.name == value);
              if (!symptom) return;
              setSelectedSymptoms((current) =>
                current.includes(symptom.name) ? current.filter((s) => s !== symptom.name) : [...current, symptom.name],
              );
            }}
            options={(symptoms || []).map(transformOption)}
            placeholder="Síntomas presentes relacionados"
          />
          <div className="flex items-center gap-2 flex-wrap my-3">
            {selectedSymptoms.map((symptom, index) => (
              <Button
                key={index}
                className="rounded-full h-8 px-3 bg-secondary hover:bg-secondary font-normal text-[#878787] flex justify-start group "
                onClick={() => setSelectedSymptoms((current) => current.filter((s) => s !== symptom))}
              >
                <X className="scale-0 group-hover:scale-100 transition-all w-0 group-hover:w-4" />
                <span>{symptom}</span>
              </Button>
            ))}
          </div>
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Diagnostico</FormLabel>
                <FormControl>
                  <Combobox
                    onChange={(v) => {
                      field.onChange({ target: { value: v } });
                    }}
                    options={pathologies.map(transformOption)}
                    placeholder="Diagnostico"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Notas adicionales</FormLabel>
                <FormControl>
                  <Textarea {...field} className=""></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <Button onClick={toggle} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className="flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar diagnostico'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
