'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { useUpdateDoctor } from '@/modules/doctor/presentation/graphql/hooks/use-update-doctor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  licenseMedicalNumber: z.string().min(2, {
    message: 'El número de licencia médica debe tener al menos 2 caracteres.',
  }),
});

type LicenseNumberValue = z.infer<typeof formSchema> ;

export const LicenseNumberSection = ({ licenseMedicalNumber, id }: LicenseNumberValue & { id: string}) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { licenseMedicalNumber },
    mode: 'all'
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const { updateDoctor } = useUpdateDoctor();

  const onSubmit = async (data: LicenseNumberValue) => {
    try {
      await updateDoctor(id, { licenseMedicalNumber: data.licenseMedicalNumber });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Numero de licencia medica</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing
                  ? 'Ingresa tu número de licencia médica. Este número es público.'
                  : 'Tu número de licencia médica es público.'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('licenseMedicalNumber')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="licenseMedicalNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              {isEditing ? 'Este número es público.' : 'Este número es público.'}
            </p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button onClick={() => {
                  form.reset();
                  toggleEdit();
                }} className="rounded-none">
                  Cancelar
                </Button>
                <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <Button onClick={toggleEdit} className="rounded-none">
                Editar
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
