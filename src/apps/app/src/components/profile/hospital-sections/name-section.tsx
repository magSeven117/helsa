'use client';

import { updateHospital } from '@helsa/engine/hospital/infrastructure/http-hospital-api';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, { message: 'El nombre no puede estar vació' }),
});

type NameSectionValue = z.infer<typeof formSchema>;

export const NameSection = ({ name, id }: NameSectionValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
    mode: 'all',
  });
  const { isValid } = form.formState;
  const router = useRouter();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NameSectionValue) => updateHospital(id, data),
    onSuccess: () => {
      setIsEditing(false);
      form.reset();
      router.refresh();
      client.invalidateQueries({
        queryKey: ['hospital', id],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error updating hospital address');
    },
  });

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            (error) => console.error(error),
          )}
        >
          <CardHeader className="">
            <div>
              <CardTitle>Nombre</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                Este es el nombre que se mostrará en el perfil del hospital.
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('name')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="name"
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
            <p className="text-muted-foreground text-xs">El nombre es obligatorio y público.</p>
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
                <Button disabled={!isValid || isPending} type="submit" className="rounded-none">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar'}
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
