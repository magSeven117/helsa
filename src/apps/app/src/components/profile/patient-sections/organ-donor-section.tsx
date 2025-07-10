'use client';

import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUpdateBiometric } from '../../../modules/profile/hooks/use-patient';

const formSchema = z.object({
  organDonor: z.enum(['Yes', 'No']),
});

type OrganDonorValue = z.infer<typeof formSchema>;

export const OrganDonorSection = ({ organDonor, id }: OrganDonorValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { organDonor },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const { updateBiometric } = useUpdateBiometric(id);

  const onSubmit = async (data: OrganDonorValue) => {
    try {
      await updateBiometric(data);
      setIsEditing(false);
      toast.success('Estado de donador de órganos actualizado correctamente.');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const organDonorValueSelected = organDonorOptions.find((option) => option.id === form.getValues('organDonor'));

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Donador de órganos</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing
                  ? 'Selecciona si eres donador de órganos.'
                  : 'Tu donación de órganos es importante para nosotros'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{organDonorValueSelected?.name}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="organDonor"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {organDonorOptions.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id} className="rounded-none">
                              <span className="flex w-full justify-between items-center gap-3">{specialty.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              Esta información es importante para nosotros, si tienes alguna duda puedes contactarnos.
            </p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button
                  onClick={() => {
                    form.reset();
                    toggleEdit();
                  }}
                  className="rounded-none"
                >
                  Cancelar
                </Button>
                <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar'}
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

const organDonorOptions = [
  {
    id: 'Yes',
    name: 'Sí',
  },
  {
    id: 'No',
    name: 'No',
  },
];
