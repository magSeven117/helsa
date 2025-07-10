'use client';

import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUser } from '../../../modules/profile/hooks/use-user';
import { useSession } from '../../auth/session-provider';

const formSchema = z.object({
  bio: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
});

type BioFormValues = z.infer<typeof formSchema>;

export const BioSection = () => {
  const { user } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { bio: user.bio },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const { updateUser } = useUser();

  const onSubmit = async (data: BioFormValues) => {
    try {
      await updateUser({
        bio: data.bio,
      });
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
              <CardTitle>Biografía</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing ? 'Escribe una breve descripción sobre ti.' : 'Esto es lo que otros verán sobre ti.'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{user.bio}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <FormControl>
                        <Textarea {...field} className="rounded-none"></Textarea>
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
              {isEditing ? 'Puedes editar tu biografía en cualquier momento.' : 'Tu biografía es pública.'}
            </p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button onClick={toggleEdit} className="rounded-none">
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
