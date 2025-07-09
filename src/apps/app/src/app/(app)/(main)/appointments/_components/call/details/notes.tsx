'use client';
import { useError } from '@/src/modules/error/components';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentNote } from '@helsa/engine/appointment/domain/note';
import { getNotes, saveNote } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { ScrollArea } from '@helsa/ui/components/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Switch } from '@helsa/ui/components/switch';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ArrowLeft, Loader2, NotebookPen, Pencil, Plus, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

export const Notes = ({ id, headless }: { id: string; headless: boolean }) => {
  const { data: notes, isFetching } = useQuery({
    initialData: [],
    queryKey: ['notes', id],
    queryFn: async () => getNotes(id),
    refetchOnWindowFocus: false,
  });
  const [open, setOpen] = useState(false);
  if (isFetching) {
    return (
      <Button variant={'outline'} className="[&_svg]:size-5 gap-2" disabled>
        <NotebookPen className="" />
        <span className="hidden md:inline">Notas</span>
      </Button>
    );
  }
  if (headless) {
    return (
      <div className="flex flex-col gap-2">
        <NotesContent notes={notes} id={id} />
      </div>
    );
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'} className="[&_svg]:size-5 gap-2">
          <NotebookPen className="" />
          <span className="hidden md:inline">Notas</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader>
            <SheetTitle>Notas de la sesion</SheetTitle>
          </SheetHeader>
          <NotesContent notes={notes} id={id} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const NoteList = ({
  notes,
  toggle,
  edit,
}: {
  notes: Primitives<AppointmentNote>[];
  toggle: VoidFunction;
  edit: (note: Primitives<AppointmentNote>) => void;
}) => {
  return (
    <div className="flex justify-between flex-1 flex-col gap-4">
      <div>
        <Button onClick={toggle} variant={'outline'} className="gap-3">
          <Plus className="size-4" />
          Agregar Nota
        </Button>
      </div>
      <ScrollArea className="h-[700px]">
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div key={index} className="relative rounded-md p-4  border  flex flex-col  pb-4">
              <div className="flex justify-between items-center">
                <div className="text-xs font-medium text-muted-foreground mb-1">{format(note.date, 'PPp')}</div>
                <Pencil className="size-4 cursor-pointer hover:text-violet-500" onClick={() => edit(note)} />
              </div>
              <p className="text-sm">{note.description}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const formSchema = z.object({
  description: z.string(),
  isPublic: z.boolean(),
});

const NotesForm = ({
  id,
  toggle,
  editingNote,
}: {
  id: string;
  toggle: VoidFunction;
  editingNote?: Primitives<AppointmentNote>;
}) => {
  const { setError } = useError();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: editingNote ? editingNote.description : '',
      isPublic: editingNote ? editingNote.isPublic : false,
    },
  });
  const { mutateAsync: createNote } = useMutation({
    mutationFn: async (data: { appointmentId: string; note: string; id: string; isPublic: boolean }) => saveNote(data),
    onError: (error: any) => {
      console.error(error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Nota guardada correctamente');
      form.reset();
      toggle();
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const noteId = editingNote ? editingNote.id : v4();
    await createNote({ appointmentId: id, note: values.description, id: noteId, isPublic: values.isPublic });
  };

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Button
              onClick={(e) => {
                toggle();
                form.reset();
              }}
              className="[&_svg]:size-4 gap-2"
              variant={'outline'}
            >
              <ArrowLeft />
              <span className="hidden md:inline">Volver</span>
            </Button>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-2 flex flex-col gap-2">
                <FormLabel className="mb-2">Nota</FormLabel>
                <FormControl>
                  <Textarea placeholder="Agrega una nota" {...field} className="min-h-[100px] resize-none" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 resize-none">
                <FormLabel>Pública</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3 justify-end">
            <Button className=" gap-3 " variant={'default'} disabled={!document || form.formState.isSubmitted}>
              <Save />
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Guardar nota'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const NotesContent = ({ id, notes }: { id: string; notes: Primitives<AppointmentNote>[] }) => {
  const [editing, setEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Primitives<AppointmentNote> | undefined>(undefined);
  const toggle = () => setEditing((current) => !current);
  const toggleNote = (note: Primitives<AppointmentNote>) => {
    setEditingNote(note);
    setEditing((current) => !current);
  };

  return (
    <>
      {!editing && <NoteList notes={notes} toggle={toggle} edit={toggleNote} />}
      {editing && <NotesForm id={id} toggle={toggle} editingNote={editingNote} />}
    </>
  );
};
