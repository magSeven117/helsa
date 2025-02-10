'use client';

import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';

type BloodPressureProps = {
  value: number;
  toggle: VoidFunction;
};
export const BloodPressureInfo = ({ value, toggle }: BloodPressureProps) => {
  return (
    <VitalSign
      icon={<Activity className="h-5 w-5" />}
      label="Presión Arterial"
      value={value}
      unit="mmHg"
      max={140}
      min={90}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  bloodPressure: z.string().min(1, { message: 'Debe introducir un valor valido' }),
});

export const BloodPressureForm = ({
  bloodPressure,
  toggle,
  appointmentId,
}: {
  bloodPressure: number;
  toggle: VoidFunction;
  appointmentId: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodPressure: bloodPressure.toString(),
    },
    mode: 'all',
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await saveVitals({
        appointmentId: appointmentId,
        bloodPressure: Number(data.bloodPressure),
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
          name="bloodPressure"
          render={({ field }) => (
            <FormItem className="border p-4 my-0 h-full">
              <FormLabel className="text-sm flex justify-between">
                Presión Arterial
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

export const BloodPressure = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <BloodPressureForm
        bloodPressure={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
      />
    );
  }

  return <BloodPressureInfo value={value} toggle={() => setIsEditing((current) => !current)} />;
};
