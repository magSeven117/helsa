'use client';

import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';

type HearRateProps = {
  value: number;
  toggle: VoidFunction;
};
export const HeartRateInfo = ({ value, toggle }: HearRateProps) => {
  return (
    <VitalSign
      icon={<Heart className="h-5 w-5" />}
      label="Ritmo Cardíaco"
      value={value}
      unit="bpm"
      max={100}
      min={60}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  heartRate: z.string().min(1, { message: 'Debe introducir un valor valido' }),
});

export const HeartRateForm = ({
  heartRate,
  toggle,
  appointmentId,
}: {
  heartRate: number;
  toggle: VoidFunction;
  appointmentId: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: heartRate.toString(),
    },
    mode: 'all',
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await saveVitals({
        appointmentId: appointmentId,
        heartRate: Number(data.heartRate),
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
          name="heartRate"
          render={({ field }) => (
            <FormItem className="border p-4 my-0 h-full">
              <FormLabel className="text-sm flex justify-between">
                Frecuencia cardíaca
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

export const HeartRate = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <HeartRateForm
        heartRate={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
      />
    );
  }

  return <HeartRateInfo value={value} toggle={() => setIsEditing((current) => !current)} />;
};
