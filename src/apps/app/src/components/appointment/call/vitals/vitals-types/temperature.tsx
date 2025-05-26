'use client';

import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Thermometer, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';
import { useVitals } from '../use-vitals';

type TemperatureProps = {
  value: number;
  toggle: VoidFunction;
};
const TemperatureInfo = ({ value, toggle }: TemperatureProps) => {
  return (
    <VitalSign
      icon={<Thermometer className="h-5 w-5" />}
      label="Temperatura"
      value={value}
      unit="°C"
      max={37.5}
      min={36}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  temperature: z.string().min(1, { message: 'Debe introducir un valor valido' }),
});

const TemperatureForm = ({
  temperature,
  toggle,
  appointmentId,
}: {
  temperature: number;
  toggle: VoidFunction;
  appointmentId: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: temperature.toString(),
    },
    mode: 'all',
  });

  const { saveVital } = useVitals(appointmentId);

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await saveVital({
        appointmentId: appointmentId,
        temperature: Number(data.temperature),
      });
      toggle();
      toast.success('Signos vitales guardados correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al guardar los signos vitales');
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (errors) => console.log(errors))}
        className="flex flex-col gap-4 justify-between flex-1 h-full"
      >
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem className="border rounded-xl p-4 my-0 h-full">
              <FormLabel className="text-sm flex justify-between">
                Temperatura
                <div onClick={toggle} className="cursor-pointer">
                  <X className="size-4" />
                </div>
              </FormLabel>
              <FormControl className="flex">
                <div>
                  <Input {...field} className="rounded-r-none focus-visible:ring-0"></Input>
                  <Button
                    type="submit"
                    variant={'secondary'}
                    disabled={form.formState.isSubmitting}
                    className="rounded-l-none p-0 px-2 h-10"
                  >
                    {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar '}
                  </Button>
                </div>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const Temperature = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  if (isEditing) {
    return (
      <TemperatureForm
        temperature={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
      />
    );
  }

  return <TemperatureInfo value={value} toggle={() => setIsEditing((current) => !current)} />;
};
