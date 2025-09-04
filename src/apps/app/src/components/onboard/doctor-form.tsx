'use client';
// import * as successAnimation from '@/public/animations/success_animation.json';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Specialty } from '@helsa/engine/doctor/domain/specialty';
import { createDoctor } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@helsa/ui/components/alert-dialog';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import Lottie from 'react-lottie';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';
import { useSpecialties } from '../../hooks/use-specialties';

const formSchema = z.object({
  licenseMedicalNumber: z.string().min(3, { message: 'License Medical Number must be at least 3 characters long' }),
  specialtyId: z.string().min(1, { message: 'Specialty is required' }),
});

const DoctorForm = ({ userId }: { userId: string }) => {
  const { specialties } = useSpecialties();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseMedicalNumber: '',
      specialtyId: '',
    },
    mode: 'all',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const newId = v4();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { licenseMedicalNumber: string; specialtyId: string }) =>
      createDoctor({ ...data, id: newId, userId }),
    onError: (error: any) => {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    },
    onSuccess: () => {
      setShowSuccessModal(true);
    },
  });

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit((data) => mutate(data))}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Bienvenido</CardTitle>
              <CardDescription>
                Por favor, completa los siguientes campos para continuar con el proceso de registro
              </CardDescription>
            </CardHeader>
            <CardContent className="k">
              <FormField
                control={form.control}
                name="licenseMedicalNumber"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Número de licencia médica</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-none"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialtyId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm">Especialidad</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        {specialties.map((specialty: Primitives<Specialty>) => (
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
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" className="rounded-none">
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continuar'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <AlertDialog open={showSuccessModal}>
        <AlertDialogContent className="sm:rounded-none">
          <div className="flex justify-center items-center mb-4">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <AlertDialogHeader className="my-0">
            <AlertDialogTitle className="text-center text-2xl">Verificado!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Has completado el proceso de registro exitosamente
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex w-full sm:justify-center items-center">
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/dashboard');
                }}
                size="lg"
                className="rounded-none"
              >
                Ir al inicio
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DoctorForm;
