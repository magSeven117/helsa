import { cn } from '@/src/components/chat/utils';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { TreatmentStatusValues } from '@helsa/engine/treatment/domain/treatment-status';
import { TreatmentTypeValues } from '@helsa/engine/treatment/domain/treatment-type';
import { saveTreatment } from '@helsa/engine/treatment/infrastructure/http-treatment-api';
import { Button } from '@helsa/ui/components/button';
import { DatePicker } from '@helsa/ui/components/date-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { InputSelect } from '@helsa/ui/components/internal/input-select';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Ellipsis, Loader2, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

const treatmentTypes = {
  MEDICATION: 'Medicamento',
  THERAPY: 'Terapia',
  PROCEDURE: 'Procedimiento',
};

type Props = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  treatments: Primitives<Treatment>[];
};

export const Treatments = ({ appointmentId, doctorId, patientId, treatments }: Props) => {
  const [editing, setEditing] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Primitives<Treatment> | undefined>(undefined);
  const toggle = () => setEditing((current) => !current);
  const editTreatment = (treatment: Primitives<Treatment>) => {
    setEditingTreatment(treatment);
    setEditing((current) => !current);
  };
  return (
    <>
      {!editing && <TreatmentList treatments={treatments} toggle={toggle} edit={editTreatment} />}
      {editing && (
        <TreatmentForm
          appointmentId={appointmentId}
          doctorId={doctorId}
          patientId={patientId}
          toggle={toggle}
          editingTreatment={editingTreatment}
        />
      )}
    </>
  );
};

type ListProps = {
  toggle: VoidFunction;
  treatments: Primitives<Treatment>[];
  edit: (treatment: Primitives<Treatment>) => void;
};

const TreatmentList = ({ toggle, treatments, edit }: ListProps) => {
  return (
    <div className="flex justify-between flex-col gap-4 flex-1">
      <div>
        <Button onClick={toggle} variant={'outline'} className="gap-2">
          <Plus className="size-4" />
          Agregar tratamiento
        </Button>
      </div>
      <div className="flex flex-col gap-3 grow max-h-[650px] overflow-y-scroll no-scroll">
        {treatments?.map((treatment, index) => (
          <div
            key={`${treatment.id}-${index}`}
            className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">
                  {treatmentTypes[treatment.type]}
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
                    {treatment.type !== 'PROCEDURE' && ' - ' + new Date(treatment.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-color-secondary cursor-pointer">
                  <Ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => edit(treatment)} className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formSchema = z.object({
  description: z.string(),
  type: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  medication: z
    .object({
      name: z.string(),
      dose: z.string(),
      frequency: z.string(),
      presentation: z.string(),
    })
    .optional(),
  therapy: z
    .object({
      description: z.string(),
    })
    .optional(),
  procedure: z
    .object({
      description: z.string(),
    })
    .optional(),
});

type FormProps = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  toggle: VoidFunction;
  editingTreatment?: Primitives<Treatment>;
};

const TreatmentForm = ({ appointmentId, doctorId, patientId, toggle, editingTreatment }: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: editingTreatment ? editingTreatment.description : '',
      type: editingTreatment ? editingTreatment.type : 'MEDICATION',
      startDate: editingTreatment ? new Date(editingTreatment.startDate) : new Date(),
      endDate: editingTreatment ? new Date(editingTreatment.endDate) : new Date(),
      medication: editingTreatment
        ? editingTreatment.medication
        : {
            name: '',
            dose: '',
            frequency: '',
            presentation: '',
          },
      therapy: editingTreatment
        ? editingTreatment.therapy
        : {
            description: '',
          },
      procedure: editingTreatment
        ? editingTreatment.procedure
        : {
            description: '',
          },
    },
  });
  const { mutateAsync: createTreatment } = useMutation({
    mutationFn: async (data: any) => saveTreatment(data),
    onError: (error) => {
      console.error(error);
      toast.error('Error al guardar el tratamiento');
    },
    onSuccess: () => {
      toast.success('Tratamiento guardado correctamente');
      toggle();
    },
  });
  const submit = async (values: z.infer<typeof formSchema>) => {
    await createTreatment({
      appointmentId: appointmentId,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      type: values.type as TreatmentTypeValues,
      medication: values.medication,
      therapy: values.therapy,
      procedure: values.procedure,
      doctorId: doctorId,
      patientId: patientId,
      status: TreatmentStatusValues.IN_PROGRESS,
      id: editingTreatment ? editingTreatment.id : v4(),
    });
  };
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (errors) => console.log(errors))}
        className="flex flex-col gap-4 justify-between flex-1"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Tipo de tratamiento</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between items-center"
                  >
                    <FormItem className="flex  items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="MEDICATION" />
                      </FormControl>
                      <FormLabel className="font-normal">Medicina</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="THERAPY" />
                      </FormControl>
                      <FormLabel className="font-normal">Terapia</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="PROCEDURE" />
                      </FormControl>
                      <FormLabel className="font-normal">Procedimiento</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('type') === 'MEDICATION' && (
            <>
              <FormField
                control={form.control}
                name="medication.name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Nombre de la medicina</FormLabel>
                    <FormControl>
                      <Input {...field} className=""></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medication.dose"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Dosis</FormLabel>
                    <FormControl>
                      <InputSelect onChange={field.onChange} options={['mg', 'ml']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medication.presentation"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Via</FormLabel>
                    <FormControl>
                      <InputSelect onChange={field.onChange} options={['Oral', 'Inyección', 'Crema']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medication.frequency"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Frecuencia</FormLabel>
                    <FormControl>
                      <InputSelect onChange={field.onChange} options={['H', 'D', 'S', 'M']} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {form.watch('type') === 'THERAPY' && (
            <>
              <FormField
                control={form.control}
                name="therapy.description"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Descripción de la terapia</FormLabel>
                    <FormControl>
                      <Textarea {...field} className=" resize-none"></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {form.watch('type') === 'PROCEDURE' && (
            <>
              <FormField
                control={form.control}
                name="procedure.description"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm">Descripción del procedimiento</FormLabel>
                    <FormControl>
                      <Textarea {...field} className=" resize-none"></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Instrucciones</FormLabel>
                <FormControl>
                  <Textarea {...field} className=" resize-none"></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 justify-between items-center">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">Fecha de inicio</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value} onSelect={field.onChange} placeholder="Selecciona una fecha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">Fecha de finalización</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value} onSelect={field.onChange} placeholder="Selecciona una fecha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <Button onClick={() => toggle()} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className=" flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar diagnostico'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
