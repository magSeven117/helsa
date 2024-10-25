'use client';

import { useStepper } from '@/libs/ducen-ui/components/stepper';
import { Combobox } from '@/libs/shadcn-ui/components/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Footer } from './footer-step';

const options = [
  {
    label: 'Cardiología',
    value: '1',
  },
  {
    label: 'Dermatología',
    value: '2',
  },
  {
    label: 'Endocrinología',
    value: '3',
  },
];

const formSchema = z.object({
  specialtyId: z.string().min(1, { message: 'Specialty is required' }),
  licenseMedicalNumber: z.string().min(1, { message: 'License number is required' }),
});
const DoctorInfoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialtyId: '',
      licenseMedicalNumber: '',
    },
  });
  const { nextStep } = useStepper();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    nextStep();
  };
  return (
    <div className="h-full w-full min-w-[800px] flex flex-col justify-center items-center box-border p-3 mb-3">
      <div className="w-full mb-8">
        <p className="text-xl">The principal information to complete your professional profile</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="licenseMedicalNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-color-foreground-secondary ">Numero de licencia medica</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialtyId"
            render={({ field }) => (
              <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                <FormLabel className="text-sm text-color-foreground-secondary ">Especialidad</FormLabel>
                <FormControl>
                  <Combobox listOptions={options} {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Footer form></Footer>
        </form>
      </Form>
    </div>
  );
};

export default DoctorInfoForm;
