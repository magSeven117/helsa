'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/shadcn-ui/components/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/libs/shadcn-ui/components/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeCheck, Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  licenseMedicalNumber: z.string().min(2, {
    message: 'El número de licencia médica debe tener al menos 2 caracteres.',
  }),
});

type LicenseNumberFormValue = z.infer<typeof formSchema>;

export const LicenseNumberForm = ({ licenseMedicalNumber }: LicenseNumberFormValue) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { licenseMedicalNumber },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: LicenseNumberFormValue) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Correo electrónico
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
        <p className='flex gap-2 items-center'>
          {licenseMedicalNumber}
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" >
                    <BadgeCheck className="h-4 w-4 text-color-complementary-success" />
                    <span className="sr-only">Verificar</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-fit p-0 rounded-full">
                <Button variant='ghost' className='rounded-none'>
                  Verificar
                </Button>
                <Button variant='ghost' className='rounded-none border-l'>
                  Apelar
                </Button>
              </PopoverContent>
            </Popover>
            <TooltipContent>Verificado</TooltipContent>
          </Tooltip>
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
                name="licenseMedicalNumber"
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
