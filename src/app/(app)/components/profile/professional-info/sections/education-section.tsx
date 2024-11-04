'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Calendar } from '@/libs/shadcn-ui/components/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/shadcn-ui/components/popover';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  educations: z.array(
    z.object({
      title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
      institution: z.string().min(2, { message: 'Institution must be at least 2 characters.' }),
      graduateAt: z.date(),
    })
  ),
});

type EducationFormValues = z.infer<typeof formSchema>;

export const EducationSection = ({ educations }: EducationFormValues) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { educations },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'educations',
    control: form.control,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: EducationFormValues) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Educación
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
      {!isEditing ? (
        <div className="flex flex-col w-full gap-2 mt-2">
          {educations.map((education, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className='flex items-center gap-3'>
                <li className='text-sm'>
                  {education.title} en {education.institution}, graduado en {format(education.graduateAt, 'PP')}
                </li>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div className='flex gap-2 items-center ' key={index}>
                  <FormField
                    control={form.control}
                    name={`educations.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Titulo</FormLabel>
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
                    name={`educations.${index}.institution`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Institución</FormLabel>
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
                    name={`educations.${index}.graduateAt`}
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col">
                        <FormLabel className='mb-2'>Fecha de graduación</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              {isEditing && (
              <div className='flex items-center gap-3'>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ title: '', institution: '', graduateAt: new Date() })}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => remove(fields.length - 1)}
                >
                  Remove
                </Button>
              </div>
            )}
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
