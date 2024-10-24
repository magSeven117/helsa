'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }).email({ message: 'Invalid email address' }),
});

type EmailFormValue = z.infer<typeof formSchema>;

export const EmailData = ({ email }: EmailFormValue) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: EmailFormValue) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Correo electrónico
        {/* <Button variant="ghost" onClick={toggleEdit} className='w-6 h-6 p-1 flex justify-center items-center'>
          {isEditing ? (
            <>
              <X className="size-3" />
              
            </>
          ) : (
            <>
              <Pencil className="size-3" />
              
            </>
          )}
        </Button> */}
      </div>
      {!isEditing ? (
        <p>
          {email} 
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
                name="email"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <div className="bg-white">
                        <Input {...field}></Input>
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
