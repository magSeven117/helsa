'use client';
import * as successAnimation from '@/assets/animations/success_animation.json';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/libs/shadcn-ui/components/alert-dialog';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn-ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { useCreateDoctor } from '@/modules/doctor/presentation/hooks/use-create-doctor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Bone, Brain, Droplet, Heart, Shield, Stethoscope, Sun, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  licenseMedicalNumber: z.string().min(3, { message: 'License Medical Number must be at least 3 characters long' }),
  specialtyId: z.string().min(1, { message: 'Specialty is required' }),
});

const DoctorForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseMedicalNumber: '',
      specialtyId: '',
    },
    mode: 'all',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { createDoctor } = useCreateDoctor()
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createDoctor({
        licenseMedicalNumber: data.licenseMedicalNumber,
        specialtyId: data.specialtyId,
        userId: userId,
      })
      setShowSuccessModal(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input {...field}></Input>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.id} value={specialty.id}>
                            <span className="flex w-full justify-between items-center gap-3">
                              <specialty.icon className="size-4" />
                              {specialty.name}
                            </span>
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
                <Button type="submit">Continuar</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <AlertDialog open={showSuccessModal}>
        <AlertDialogContent>
          <Lottie
            options={{
              autoplay: true,
              loop: false,
              animationData: successAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            style={{ width: 300, height: 300 }}
          ></Lottie>
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

const specialties = [
  { id: '1', name: 'Cardiología', icon: Heart },
  { id: '2', name: 'Dermatología', icon: Sun },
  { id: '3', name: 'Endocrinología', icon: Activity },
  { id: '4', name: 'Gastroenterología', icon: Stethoscope },
  { id: '5', name: 'Geriatría', icon: User },
  { id: '6', name: 'Hematología', icon: Droplet },
  { id: '7', name: 'Infectología', icon: Shield },
  { id: '11', name: 'Neurología', icon: Brain },
  { id: '15', name: 'Reumatología', icon: Bone },
];
