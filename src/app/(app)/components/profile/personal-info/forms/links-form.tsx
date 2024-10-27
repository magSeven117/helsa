'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
});

type NameFormValues = z.infer<typeof formSchema>;

export const LinksForm = ({ urls }: NameFormValues) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { urls },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: NameFormValues) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Enlaces de contacto
        <Button variant="ghost" onClick={toggleEdit} className="w-6 h-6 p-1 flex justify-center items-center">
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <div className="">
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} className='disabled:text-foreground'/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {isEditing && (
              <div className='flex items-center gap-3'>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: '' })}
                >
                  Add URL
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => remove(fields.length - 1)}
                >
                  Remove URL
                </Button>
              </div>
            )}
          </div>
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
