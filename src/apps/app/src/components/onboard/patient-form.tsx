'use client';
// import * as successAnimation from '@/public/animations/success_animation.json';
import { createPatient } from '@helsa/engine/patient/infrastructure/http-patient-api';
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
import { Label } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { Loader2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import Lottie from 'react-lottie';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  demographic: z.object({
    civilStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
    occupation: z.string().min(3, { message: 'Occupation must be at least 3 characters long' }),
    educativeLevel: z.string().min(3, { message: 'Educative Level must be at least 3 characters long' }),
  }),
  biometric: z.object({
    height: z.coerce.number().min(0, { message: 'Height must be a positive number' }),
    organDonor: z.enum(['Yes', 'No']),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  }),
});

const PatientForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      demographic: {
        civilStatus: 'SINGLE',
        occupation: '',
        educativeLevel: '',
      },
      biometric: {
        height: 0,
        organDonor: 'No',
        bloodType: 'A+',
      },
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      demographic: { occupation: string; civilStatus: string; educativeLevel: string };
      biometric: { organDonor: string; bloodType: string; height: number };
    }) => createPatient({ userId: userId, demographic: data.demographic, biometric: data.biometric }),
    onError: (error: any) => {
      let errorMessage = 'An error occurred. Please try again later.';
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      
      toast.error(errorMessage);
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
              <Label className="font-semibold text-xl my-3">Datos demográficos</Label>
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="demographic.civilStatus"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Estado civil</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {civilStatusOptions.map((specialty) => (
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
                <FormField
                  control={form.control}
                  name="demographic.educativeLevel"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Educación</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {educationLevels.map((specialty) => (
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
                <FormField
                  control={form.control}
                  name="demographic.occupation"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel className="text-sm">Ocupación</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Label className="font-semibold text-xl my-3">Datos medicos</Label>
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="biometric.bloodType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Tipo de sangre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {bloodTypeOptions.map((specialty) => (
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
                <FormField
                  control={form.control}
                  name="biometric.organDonor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Donador de órganos?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {organDonorOptions.map((specialty) => (
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
                <FormField
                  control={form.control}
                  name="biometric.height"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel className="text-sm">Altura</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
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
          {/* TODO: Revisar animación Lottie en futuras versiones */}
          {/* <Lottie
            options={{
              autoplay: true,
              loop: false,
              animationData: successAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            style={{ width: 300, height: 300 }}
          ></Lottie> */}
          
          <div className="flex justify-center my-8">
            <CheckCircle className="h-32 w-32 text-green-500" />
          </div>
          
          <AlertDialogHeader className="my-0">
            <AlertDialogTitle className="text-center text-2xl">¡Verificado!</AlertDialogTitle>
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

export default PatientForm;

const organDonorOptions = [
  {
    id: 'Yes',
    name: 'Sí',
  },
  {
    id: 'No',
    name: 'No',
  },
];

const bloodTypeOptions = [
  {
    id: 'A+',
    name: 'A+',
  },
  {
    id: 'A-',
    name: 'A-',
  },
  {
    id: 'B+',
    name: 'B+',
  },
  {
    id: 'B-',
    name: 'B-',
  },
  {
    id: 'AB+',
    name: 'AB+',
  },
  {
    id: 'AB-',
    name: 'AB-',
  },
  {
    id: 'O+',
    name: 'O+',
  },
  {
    id: 'O-',
    name: 'O-',
  },
];

const civilStatusOptions = [
  {
    id: 'SINGLE',
    name: 'Soltero/a',
  },
  {
    id: 'MARRIED',
    name: 'Casado/a',
  },
  {
    id: 'DIVORCED',
    name: 'Divorciado/a',
  },
  {
    id: 'WIDOWED',
    name: 'Viudo/a',
  },
];

const educationLevels = [
  {
    id: 'PRIMARY',
    name: 'Primaria',
  },
  {
    id: 'SECONDARY',
    name: 'Secundaria',
  },
  {
    id: 'TECHNICAL',
    name: 'Técnico',
  },
  {
    id: 'UNIVERSITY',
    name: 'Universitario',
  },
];
