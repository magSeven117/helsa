'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  city: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  address: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
});

type AddressFormValues = z.infer<typeof formSchema>;

export const AddressInfoForm = ({ city, address }: AddressFormValues) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { city, address },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: AddressFormValues) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Nombre
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
        <div className='flex items-center gap-2'>
          <MapPin className="h-4 w-4"></MapPin>
          <p>{city}, {address}</p>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <div className="bg-white">
                        <Input {...field}></Input>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Dirección</FormLabel>
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
