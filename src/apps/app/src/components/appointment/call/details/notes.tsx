'use client';
import { createAppointmentNote } from '@/src/actions/appointment/create-appointment-note';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { AppointmentNote } from '@helsa/engine/appointment/domain/note';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardMinus, Loader2, StickyNote } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const NoteList = ({
  notes,
  toggle,
  patient,
}: {
  notes: Primitives<AppointmentNote>[];
  toggle: VoidFunction;
  patient?: boolean;
}) => {
  return (
    <>
      {notes?.map((note) => (
        <div className="flex justify-start items-center gap-2 text-muted-foreground" key={note.id}>
          <StickyNote className="size-4" />
          <span>{note.description}</span>
        </div>
      ))}
      {patient && (
        <Button onClick={toggle}>
          <ClipboardMinus className="size-4" />
          Agregar Nota
        </Button>
      )}
    </>
  );
};

const formSchema = z.object({
  description: z.string(),
});

export const NotesForm = ({ data, toggle }: { data: Primitives<Appointment>; toggle: VoidFunction }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: '' },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createAppointmentNote({ appointmentId: data.id, note: values.description });
      toast.success('Nota agregada correctamente');
      form.reset();
      toggle();
    } catch (error) {
      toast.error('Error al agregar la nota');
    }
  };

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <Textarea placeholder="Agrega una nota" {...field} className="min-h-[100px]" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3">
            <Button
              onClick={(e) => {
                toggle();
                form.reset();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>

            <Button className=" gap-3 flex-1" variant={'secondary'} disabled={!document || form.formState.isSubmitted}>
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Guardar nota'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const NotesContent = ({
  data,
  patient,
  notes,
}: {
  data: Primitives<Appointment>;
  patient?: boolean;
  notes: Primitives<AppointmentNote>[];
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing && <NoteList notes={notes} toggle={() => setEditing((current) => !current)} patient={patient} />}
      {editing && <NotesForm data={data} toggle={() => setEditing((current) => !current)} />}
    </>
  );
};
