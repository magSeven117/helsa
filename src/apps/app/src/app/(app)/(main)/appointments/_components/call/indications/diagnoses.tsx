import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisTypeValues } from '@helsa/engine/diagnostic/domain/diagnosis-type';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { getPathologies, saveDiagnosis } from '@helsa/engine/diagnostic/infrastructure/http-diagnosis-api';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Combobox } from '@helsa/ui/components/combobox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Ellipsis, Loader2, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

type Props = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  diagnoses: Primitives<Diagnostic>[];
};
export const Diagnoses = ({ appointmentId, patientId, doctorId, diagnoses }: Props) => {
  const [creating, setCreating] = useState(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState<Primitives<Diagnostic> | undefined>(undefined);
  const toggle = () => setCreating((current) => !current);
  const editDiagnosis = (diagnosis: Primitives<Diagnostic>) => {
    setEditingDiagnosis(diagnosis);
    setCreating((current) => !current);
  };
  return (
    <>
      {creating ? (
        <DiagnosisForm
          appointmentId={appointmentId}
          doctorId={doctorId}
          patientId={patientId}
          toggle={toggle}
          editingDiagnosis={editingDiagnosis}
        />
      ) : (
        <DiagnosesList diagnoses={diagnoses} toggle={toggle} edit={editDiagnosis} />
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
  edit: (diagnosis: Primitives<Diagnostic>) => void;
};

const DiagnosesList = ({ diagnoses, toggle, edit }: ListProps) => {
  const { data: pathologies } = useQuery({
    initialData: [],
    queryKey: ['pathologies'],
    queryFn: async () => getPathologies(),
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex 2222222222222222222222222 flex-1 flex-col gap-4">
      <div>
        <Button onClick={toggle} variant={'outline'} className="gap-3">
          <Plus className="size-4" />
          Agregar diagnostico
        </Button>
      </div>
      <div className="flex flex-col gap-3 max-h-[650px] overflow-y-scroll no-scroll">
        {diagnoses?.map((diagnosis, index) => (
          <div
            key={`${diagnosis.id}-${index}`}
            className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
          >
            <div className="flex justify-between items-center w-full">
              <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">I70.173</div>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-color-secondary cursor-pointer">
                  <Ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => edit(diagnosis)} className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
    </div>
  );
};

const formSchema = z.object({
  diagnosis: z.string(),
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
  editingDiagnosis?: Primitives<Diagnostic>;
};

const DiagnosisForm = ({ toggle, appointmentId, doctorId, patientId, editingDiagnosis }: FormProps) => {
  const { data: pathologies } = useQuery({
    initialData: [],
    queryKey: ['pathologies'],
    queryFn: async () => getPathologies(),
    refetchOnWindowFocus: false,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: editingDiagnosis ? pathologies.find((c) => c.id === editingDiagnosis.pathologyId)?.name : '',
      type: editingDiagnosis ? editingDiagnosis.type : 'ALLERGY',
      notes: editingDiagnosis ? editingDiagnosis.description : '',
    },
  });
  const { mutateAsync: createDiagnosis } = useMutation({
    mutationFn: async (data: Partial<Primitives<Diagnostic>>) => saveDiagnosis(data),
    onError: (error) => {
      console.error(error);
      toast.error('Error al agregar diagnostico');
    },
    onSuccess: () => {
      toast.success('Diagnostico agregado correctamente');
      toggle();
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = editingDiagnosis ? editingDiagnosis.id : v4();
    await createDiagnosis({
      id,
      type: values.type as DiagnosisTypeValues,
      description: values.notes,
      patientId,
      doctorId,
      appointmentId,
      pathologyId: pathologies.find((d) => d.name === values.diagnosis)?.id!,
    });
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
