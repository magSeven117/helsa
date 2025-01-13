'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardMinus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  diagnosis: z.string(),
  symptoms: z.string(),
  notes: z.string(),
});

const diagnoses = [
  {
    diagnosis: 'Gripe',
    symptoms: 'Tos, fiebre, dolor de cabeza',
    notes: 'Reposo y tomar medicamentos',
  },
  {
    diagnosis: 'Coronavirus',
    symptoms: 'Tos, fiebre, dolor de cabeza',
    notes: 'Reposo y tomar medicamentos',
  },
  {
    diagnosis: 'H1N1',
    symptoms: 'Tos, fiebre, dolor de cabeza',
    notes: 'Reposo y tomar medicamentos',
  },
];

const Diagnosis = ({ data }: { data: Primitives<Appointment> }) => {
  const [editing, setEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: '',
      symptoms: '',
      notes: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ClipboardMinus className="size-4" />
          Diagnostico
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Agregar diagnostico</SheetTitle>
                <p className="text-muted-foreground text-xs">
                  Agrega un diagnostico para el paciente{' '}
                  <span className="font-bold capitalize">{data.patient?.user?.name}</span>
                </p>
              </div>
            </div>
          </SheetHeader>
          {!editing && (
            <>
              <div className="flex justify-between flex-col gap-4 flex-1">
                <Accordion type="single" collapsible className="">
                  {diagnoses?.map((diagnosis, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="my-3 border px-4">
                      <AccordionTrigger className="">{diagnosis.diagnosis}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-center gap-2">
                          Síntomas:
                          <div className="flex justify-start items-center gap-2">
                            <Badge variant={'outline'}>Fiebre</Badge>
                            <Badge variant={'outline'}>Dolor de cabeza</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          <p>
                            <strong>Diagnostico:</strong>
                          </p>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque eaque perspiciatis,
                            placeat officia ab atque deleniti non sunt sit omnis libero quos excepturi minus. Illo
                            officia velit doloribus nemo autem!
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button onClick={() => setEditing(true)}>
                  <ClipboardMinus className="size-4" />
                  Agregar diagnostico
                </Button>
              </div>
            </>
          )}
          {editing && (
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 justify-between flex-1"
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-sm">Sintomas relacionados</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="rounded-none"></Textarea>
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
                          <Textarea {...field} className="rounded-none"></Textarea>
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
                          <Textarea {...field} className="rounded-none"></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(false);
                  }}
                >
                  Guardar diagnostico
                </Button>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Diagnosis;
