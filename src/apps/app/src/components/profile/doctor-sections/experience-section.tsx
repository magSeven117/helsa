'use client';

import { updateDoctor } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  experience: z.coerce.number().optional(),
});

type ExperienceValue = z.infer<typeof formSchema>;

export const ExperienceSection = ({ experience, id }: ExperienceValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { experience },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ExperienceValue) => updateDoctor(id, data),
    onSuccess: () => {
      toast.success('Experience updated successfully');
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error('An error occurred while updating experience');
    },
  });

  const { isValid } = form.formState;
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
              <CardTitle>Tiempo de experiencia</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                Este es el tiempo que llevas trabajando en tu profesión.
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('experience')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="experience"
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
            <p className="text-muted-foreground text-xs">La medida en años de tu experiencia.</p>
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
