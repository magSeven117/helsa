'use client';
import { uploadDocument } from '@/src/actions/medical-document/upload-document';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { upload } from '@helsa/storage';
import { createClient } from '@helsa/supabase/client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardMinus, ExternalLink, FileText, Loader2, Paperclip, ReceiptText, StickyNote } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { createAppointmentNote } from '@/src/actions/appointment/create-appointment-note';

const formSchema = z.object({
  description: z.string(),
  documentType: z.string(),
});

const noteSchema = z.object({ note: z.string() });

const documentTypes = [
  { id: 'MEDICAL_RECORD', name: 'Historial médico' },
  { id: 'PRESCRIPTION', name: 'Receta' },
  { id: 'IMAGE', name: 'Imagen' },
  { id: 'LABORATORY_RESULT', name: 'Resultado de laboratorio' },
  { id: 'RADIOLOGY', name: 'Radiología' },
  { id: 'OTHER', name: 'Otro' },
];
const DetailsDoctor = ({ data }: { data: Primitives<Appointment> }) => {
  const [document, setDocument] = useState<File | null>(null);
  const [editing, setEditing] = useState<any>(false);
  const [noteEditing, setNoteEditing] = useState<any>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { description: '', documentType: '' },
  });

  const noteForm = useForm({ resolver: zodResolver(noteSchema), defaultValues: { note: '' } });
  const onSubmit = async (values: { description: string; documentType: string }) => {
    if (document) {
      const supabase = createClient();
      const res = await upload(supabase, {
        file: document,
        path: [data.patientId, values.documentType, document.name],
        bucket: 'medical-documents',
      });
      if (res) {
        await uploadDocument({
          url: res,
          description: values.description,
          appointmentId: data.id,
          patientId: data.patientId,
          documentType: values.documentType,
          filename: document.name,
        });
      }
      setEditing(false);
      toast.success('Documento agregado correctamente');
      form.reset();
      setDocument(null);
    }
  };
  const noteOnSubmit = async (values: { note: string }) => {
    await createAppointmentNote({ appointmentId: data.id, note: values.note });
    setNoteEditing(false);
    toast.success('Nota agregada correctamente');
    noteForm.reset();
  };

  const noteValue = noteForm.watch('note');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Details
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3">
          <SheetHeader className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row justify-start items-center gap-4">
              <Avatar className="bg-secondary">
                <AvatarImage className="object-contain" src={data?.doctor?.user?.image} />
                <AvatarFallback>{data?.doctor?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl flex justify-start items-center gap-2">
                  Dr. {data?.doctor?.user?.name}{' '}
                  <Link href={`/patients/${data?.patient?.id}`} target="_blank">
                    <ExternalLink className="size-4 ml-3" />
                  </Link>{' '}
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>
          <div className="flex gap-2 px-1 border-b py-2">
            <div className="flex justify-start items-center gap-2 text-sm">
              <p className="">Especialidad:</p>
              <Badge variant={'outline'}>{data.doctor?.specialty?.name || ''}</Badge>
            </div>
            <div className="flex justify-start items-center gap-2 text-sm">
              <p className="">Nº de Licencia:</p>
              <Badge variant={'outline'}>{data.doctor?.licenseMedicalNumber || ''}</Badge>
            </div>
          </div>
          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Detalles</p>
            <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
          </div>
          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Síntomas</p>
            <div className="flex justify-start items-center gap-2">
              {data?.symptoms?.map((symptom) => (
                <Badge key={symptom.id} variant={'outline'}>
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </div>
          <Accordion type="multiple" defaultValue={['attachments']} className="w-full px-1">
            <AccordionItem value="attachments">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Archivos y adjuntos <Paperclip className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {!editing && (
                  <>
                    {data?.documents?.map((document) => (
                      <div className="flex justify-start items-center gap-2 text-muted-foreground">
                        <FileText className="size-4" />
                        <span>{document.fileName}</span>
                      </div>
                    ))}
                    <Button onClick={() => setEditing(true)}>
                      <ClipboardMinus className="size-4" />
                      Agregar Archivo
                    </Button>
                  </>
                )}
                {editing && (
                  <Form {...form}>
                    <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                      <Input
                        className="rounded-none"
                        type="file"
                        onChange={(e) => {
                          setDocument(e.target.files?.[0]!);
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="my-2">
                            <FormControl>
                              <Textarea
                                placeholder="Describe el contenido del documento aqui"
                                {...field}
                                className="min-h-[100px] rounded-none"
                              />
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem className="flex-1 mb-3">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full rounded-none">
                                  <SelectValue placeholder="Selecciona un tipo de documento" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none">
                                {documentTypes.map((method) => (
                                  <SelectItem key={method.id} value={method.id} className="rounded-none">
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex w-full gap-3">
                        <Button
                          onClick={(e) => {
                            setEditing(false);
                            form.reset();
                          }}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>

                        <Button
                          className=" gap-3 flex-1"
                          variant={'secondary'}
                          disabled={!document || form.formState.isSubmitted}
                        >
                          {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Subir archivo'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notes">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Notas <StickyNote className="size-4" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-3">
                {!noteEditing && (
                  <>
                    {data.notes?.map((note) => (
                      <div className="flex justify-start items-center gap-2 text-muted-foreground mb-2">
                        <StickyNote className="size-4" />
                        <span className="flex-1 text-justify">{note.description}</span>
                      </div>
                    ))}

                    <Button onClick={() => setNoteEditing(true)}>
                      <ClipboardMinus className="size-4" />
                      Agregar Nota
                    </Button>
                  </>
                )}
                {noteEditing && (
                  <Form {...noteForm}>
                    <form onSubmit={noteForm.handleSubmit(noteOnSubmit)}>
                      <Textarea
                        {...noteForm.register('note')}
                        className="mt-2 rounded-none resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent
                        mb-2"
                        placeholder="Escribe una nota"
                        name="note"
                      ></Textarea>
                      <div className="flex w-full gap-3">
                        <Button
                          onClick={(e) => {
                            setNoteEditing(false);
                            noteForm.reset();
                          }}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button className="gap-3 h-9 flex-1" variant={'secondary'} disabled={!noteValue}>
                          {noteForm.formState.isSubmitting ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            'Agregar Nota'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsDoctor;
