'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  bio: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }).email({ message: 'Invalid email address' }),
});

type EmailFormValue = z.infer<typeof formSchema>;

export const BioForm = ({ bio }: EmailFormValue) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { bio },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: EmailFormValue) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Biografía
        <Button variant="ghost" onClick={toggleEdit} className='w-6 h-6 p-1 flex justify-center items-center'>
          {isEditing ? (
            <>
              <X className="size-3" />
              
            </>
          ) : (
            <>
              <Pencil className="size-3" />
              
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p>
          {bio ?? `lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`} 
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <div className='flex justify-between items-center gap-3'>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <div className="bg-white">
                        <Textarea {...field}></Textarea>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
