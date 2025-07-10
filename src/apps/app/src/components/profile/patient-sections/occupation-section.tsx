'use client';

import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUpdateDemographic } from '../../../modules/profile/hooks/use-patient';

const formSchema = z.object({
  occupation: z.string().min(3, { message: 'Occupation must be at least 3 characters long' }),
});

type OccupationValue = z.infer<typeof formSchema>;

export const OccupationSection = ({ occupation, id }: OccupationValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { occupation },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const { updateDemographic } = useUpdateDemographic(id);

  const onSubmit = async (data: OccupationValue) => {
    try {
      await updateDemographic(data);
      setIsEditing(false);
      toast.success('Ocupación actualizada correctamente');
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
              <CardTitle>Ocupación</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing ? 'Ingresa tu ocupación. Este dato es público.' : 'Tu ocupación es pública.'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('occupation')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="occupation"
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
              Esta información ayuda a proporcionar una mejor atención médica.
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

const civilStatusOptions = [
  {
    id: 'SINGLE',
    name: 'Soltero/a',
  },
  {
    id: 'MARRIED',
    name: 'Casado/a',
  },
  {
    id: 'DIVORCED',
    name: 'Divorciado/a',
  },
  {
    id: 'WIDOWED',
    name: 'Viudo/a',
  },
];
