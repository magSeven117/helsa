'use client';

import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Droplet, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';

type OxygenSaturationProps = {
  value: number;
  toggle: VoidFunction;
};
const OxygenSaturationInfo = ({ value, toggle }: OxygenSaturationProps) => {
  return (
    <VitalSign
      icon={<Droplet className="h-5 w-5" />}
      label="Saturación de Oxígeno"
      value={value}
      unit="%"
      max={100}
      min={95}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  oxygenSaturation: z.string().min(1, { message: 'Debe introducir un valor valido' }),
});

const OxygenSaturationForm = ({
  oxygenSaturation,
  toggle,
  appointmentId,
}: {
  oxygenSaturation: number;
  toggle: VoidFunction;
  appointmentId: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oxygenSaturation: oxygenSaturation.toString(),
    },
    mode: 'all',
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await saveVitals({
        appointmentId: appointmentId,
        oxygenSaturation: Number(data.oxygenSaturation),
      });
      toggle();
      toast.success('Signos vitales guardados correctamente');
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
          name="oxygenSaturation"
          render={({ field }) => (
            <FormItem className="border p-4 my-0 h-full">
              <FormLabel className="text-sm flex justify-between">
                Saturación de oxígeno
                <div onClick={toggle} className="cursor-pointer">
                  <X className="size-4" />
                </div>
              </FormLabel>
              <FormControl className="flex">
                <div>
                  <Input {...field} className="rounded-none focus-visible:ring-0"></Input>
                  <Button
                    type="submit"
                    variant={'secondary'}
                    disabled={form.formState.isSubmitting}
                    className="rounded-none p-0 px-2 h-10"
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

export const OxygenSaturation = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <OxygenSaturationForm
        oxygenSaturation={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
      />
    );
  }

  return <OxygenSaturationInfo value={value} toggle={() => setIsEditing((current) => !current)} />;
};
