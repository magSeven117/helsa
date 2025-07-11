'use client';
import { updatePatientDemographic } from '@helsa/engine/patient/infrastructure/http-patient-api';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  civilStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
});

type CivilStatusValue = z.infer<typeof formSchema>;

export const CivilStatusSection = ({ civilStatus, id }: CivilStatusValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { civilStatus },
    mode: 'all',
  });
  const { isValid } = form.formState;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CivilStatusValue) => updatePatientDemographic(id, data),
    onSuccess: () => {
      setIsEditing(false);
      toast.success('Estado civil actualizado correctamente');
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    },
  });

  const selectedCivilStatus = civilStatusOptions.find((option) => option.id === form.getValues('civilStatus'));

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
              <CardTitle>Estado civil</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing ? 'Selecciona tu estado civil.' : 'Tu estado civil es importante para nosotros'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{selectedCivilStatus?.name}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="civilStatus"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {civilStatusOptions.map((specialty) => (
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
            <p className="text-muted-foreground text-xs">Puedes actualizar tu estado civil en cualquier momento.</p>
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
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
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
