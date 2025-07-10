'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { ErrorFallback } from '@/src/components/shared/error-fallback';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Document } from '@helsa/engine/document/domain/document';
import { createClient } from '@helsa/supabase/client';
import { upload } from '@helsa/supabase/storage';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClipboardMinus, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const DocumentList = ({
  documents,
  toggle,
  patient,
}: {
  documents: Primitives<Document>[];
  toggle: VoidFunction;
  patient?: boolean;
}) => {
  return (
    <>
      {documents?.map((document) => (
        <div className="flex justify-start items-center gap-2 text-muted-foreground" key={document.id}>
          <FileText className="size-4" />
          <span>{document.fileName}</span>
        </div>
      ))}
      {patient && (
        <Button onClick={toggle}>
          <ClipboardMinus className="size-4" />
          Agregar Archivo
        </Button>
      )}
    </>
  );
};

const formSchema = z.object({
  description: z.string(),
  documentType: z.string(),
});

const documentTypes = [
  { id: 'MEDICAL_RECORD', name: 'Historial médico' },
  { id: 'PRESCRIPTION', name: 'Receta' },
  { id: 'IMAGE', name: 'Imagen' },
  { id: 'LABORATORY_RESULT', name: 'Resultado de laboratorio' },
  { id: 'RADIOLOGY', name: 'Radiología' },
  { id: 'OTHER', name: 'Otro' },
];

export const DocumentForm = ({ data, toggle }: { data: Primitives<Appointment>; toggle: VoidFunction }) => {
  const [document, setDocument] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: '', documentType: '' },
  });
  const { addDocument: uploadDocument } = useAddDocument(data.id);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
      toast.success('Documento agregado correctamente');
      form.reset();
      setDocument(null);
      toggle();
    }
  };

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            className=""
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
                    className="min-h-[100px] "
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
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Selecciona un tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="">
                    {documentTypes.map((method) => (
                      <SelectItem key={method.id} value={method.id} className="">
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
                toggle();
                form.reset();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>

            <Button className=" gap-3 flex-1" variant={'secondary'} disabled={!document || form.formState.isSubmitted}>
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Subir archivo'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const DocumentsContent = ({ data }: { data: Primitives<Appointment> }) => {
  const { documents, isPending, error } = useDocuments(data.id);
  const [editing, setEditing] = useState(false);
  const { user } = useSession();

  const isPatient = user?.role === 'PATIENT';

  if (isPending) {
    return <Loader2 className="size-6 animate-spin" />;
  }

  if (error) {
    return <ErrorFallback />;
  }

  return (
    <>
      {!editing && (
        <DocumentList documents={documents} toggle={() => setEditing((current) => !current)} patient={isPatient} />
      )}
      {editing && <DocumentForm data={data} toggle={() => setEditing((current) => !current)} />}
    </>
  );
};

const useDocuments = (id: string) => {
  const { data, isPending, error } = useQuery({
    initialData: [],
    queryKey: ['documents', id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/appointment/${id}/document`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
    enabled: () => !!id,
  });
  return {
    documents: data,
    isPending,
    error,
  };
};

const useAddDocument = (appointmentId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['addDocument', appointmentId],
    mutationFn: async (data: Record<string, any>) => {
      const response = await fetch(`/api/v1/medical-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', appointmentId] });
    },
  });
  return {
    addDocument: mutateAsync,
    isPending,
    error,
  };
};
