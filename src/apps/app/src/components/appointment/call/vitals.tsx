'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
/* eslint-disable react/jsx-no-undef */
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  bodyTemp: z.string(),
  heartRate: z.string(),
  systoll: z.string(),
  diastoll: z.string(),
  Weight: z.string(),
  height: z.string(),
  respiratoryRate: z.string(),
  oxygenSatur: z.string(),
});

type Props = {
  appointment: Primitives<Appointment>;
  toggle: VoidFunction;
};

const Vitals = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bodyTemp: '',
      heartRate: '',
      systoll: '',
      diastoll: '',
      Weight: '',
      height: '',
      respiratoryRate: '',
      oxygenSatur: '',
    },
    mode: 'all',
  });
  const submit = async (data: z.infer<typeof formSchema>) => {};
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (errors) => console.log(errors))}
        className="flex flex-col gap-4 justify-between flex-1"
      >
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="bodyTemp"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Temperatura del cuerpo</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">frecuencia cardiaca</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="systoll"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">PA sistólica</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="diastoll"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">PA diastólica</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="Weight"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Peso (Kg)</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Altura (Cm)</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="respiratoryRate"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Frecuencia respiratoria</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="oxygenSatur"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Saturación de oxígeno</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex w-full gap-3">
          {/* <Button onClick={() => toggle()} className="flex-1">
            Cancelar
          </Button> */}
          <Button type="submit" disabled={form.formState.isSubmitting} className="rounded-none flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar signos vitales'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Vitals;
