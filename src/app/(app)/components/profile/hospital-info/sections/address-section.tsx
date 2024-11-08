'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  address: z.object({
    city: z.string().min(2, {
      message: 'La ciudad debe tener al menos 2 caracteres.',
    }),
    street: z.string().min(2, {
      message: 'La calle debe tener al menos 2 caracteres.',
    }),
    country: z.string().min(2, {
      message: 'El país debe tener al menos 2 caracteres.',
    }),
    zipCode: z.string().min(2, {
      message: 'El código postal debe tener al menos 2 caracteres.',
    }),
  }),
});

type AddressFormValues = z.infer<typeof formSchema>;

export const AddressSection = ({ address, id }: AddressFormValues & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { address },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: AddressFormValues) => {
    try {
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Error updating consulting room');
    }
  };

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <CardHeader>
            <div>
              <CardTitle>Dirección</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {isEditing
                  ? 'Edita la dirección de tu hospital para que los pacientes puedan encontrarte.'
                  : 'La dirección de tu hospital es importante para que los pacientes puedan encontrarte.'}
              </p>
              {!isEditing ? (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"></MapPin>
                    <p>
                      {address.street}, {address.city}, {address.country}, {address.zipCode}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center gap-3 mt-3">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Calle</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-3 mt-3">
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>País</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Código postal</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              {isEditing
                ? 'Asegúrate de que la dirección sea correcta para que los pacientes puedan encontrarte.'
                : 'La dirección de tu hospital es importante para que los pacientes puedan encontrarte.'}
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
