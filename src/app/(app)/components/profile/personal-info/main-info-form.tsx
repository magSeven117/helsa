'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/libs/shadcn-ui/components/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(3, { message: 'Invalid email' }),
  lastName: z.string(),
  biography: z.string(),
  phoneNumber: z.string(),
});
const MainInfoForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: 'Jose',
      lastName: 'Véliz',
      biography: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, modi?',
      phoneNumber: '+584121802961',
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex justify-center items-center gap-2">
          <Pencil className="size-4" />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="max-sm:w-full w-[35%] sm:max-w-full h-full">
        <SheetHeader className="">
          <SheetTitle>Edita tu información personal</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="my-2 flex-1 max-sm:w-full">
                    <FormLabel className="text-sm">Nombre</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="my-2 flex-1 max-sm:w-full">
                    <FormLabel className="text-sm">Apellido</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="my-2 flex-1 max-sm:w-full">
                    <FormLabel className="text-sm">Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-center items-center gap-3 max-sm:flex-col w-full'>
              
              
            </div>
            <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem className="my-2 flex-1 max-sm:w-full">
                    <FormLabel className="text-sm">Biografía</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            <Button className='mt-10' type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4" /> Guardar cambios
                </>
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default MainInfoForm;
