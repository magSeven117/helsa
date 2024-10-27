'use client';
import * as successAnimation from '@/assets/animations/success_animation.json';
import { PasswordInput } from '@/libs/ducen-ui/components/password-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/libs/shadcn-ui/components/alert-dialog';
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
import { Icons } from '@/libs/shadcn-ui/components/icons';
import { Input } from '@/libs/shadcn-ui/components/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/libs/shadcn-ui/components/input-otp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { useRegister } from '@/modules/user/presentation/hooks/use-register';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Bone, Brain, Droplet, Heart, Hospital, Loader2, Shield, Stethoscope, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Lottie from 'react-lottie';
import { v4 } from 'uuid';
import { z } from 'zod';

const formSchema = z
  .object({
    name: z.string().min(3, { message: 'Name is required' }),
    email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    licenseMedicalNumber: z.string().optional(),
    specialtyId: z.string().optional(),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: 'Passwords do not match' };
    }
    return {};
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      licenseMedicalNumber: '',
      specialtyId: '',
    },
    mode: 'all'
  });

  const { isSubmitting } = form.formState;

  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { register } = useRegister();

  const [role, setRole] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isPossibleOauth, setIsPossibleOauth] = useState(false);
  const [verification, setVerification] = useState({
    state: '',
    code: '',
    error: '',
  });

  useEffect(() => {
    if (role === 'DOCTOR' && form.getValues().specialtyId && form.getValues().licenseMedicalNumber) {
      setIsPossibleOauth(true);
      return;
    }

    setIsPossibleOauth(false);

  }, [form.formState]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({ ...verification, state: 'pending' });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) return;
    try {
      setVerifying(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        await register({
          email: form.getValues().email,
          externalId: completeSignUp.createdUserId,
          id: v4(),
          role: role,
          additionalData: {
            licenseMedicalNumber: form.getValues().licenseMedicalNumber,
            specialtyId: form.getValues().specialtyId
          }
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
        setShowSuccessModal(true);
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
      setVerifying(false);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const onOauthPress = async (strategy: 'oauth_google' | 'oauth_facebook') => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-up/sso-callback',
        redirectUrlComplete: '/dashboard',
        unsafeMetadata: {
          role,
          provider: 'oauth',
          additionalData: {
            licenseMedicalNumber: form.getValues().licenseMedicalNumber,
            specialtyId: form.getValues().specialtyId
          }
        },
      });
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  if (!role) {
    return (
      <div className="grid w-full h-full grow items-center px-20">
        <Card className="border-none shadow-none w-full">
          <CardHeader>
            <CardTitle>Elige tu rol</CardTitle>
            <CardDescription>Por favor elige tu rol para continuar</CardDescription>
          </CardHeader>
          <CardContent className="my-5">
            <div className="flex justify-around gap-2 w-full h-32">
              <div
                className="flex flex-col items-center justify-center p-4 w-1/3 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500"
                onClick={() => setRole('PATIENT')}
              >
                <User className="mb-2 h-8 w-8" />
                <span>Paciente</span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 w-1/3 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500"
                onClick={() => setRole('DOCTOR')}
              >
                <Stethoscope className="mb-2 h-8 w-8" />
                <span>Doctor</span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 w-1/3 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500"
                onClick={() => setRole('HOSPITAL')}
              >
                <Hospital className="mb-2 h-8 w-8" />
                <span>Hospital</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verification.state === 'pending') {
    return (
      <div className="grid w-full h-full grow items-center px-20">
        <Card className="border-none shadow-none w-full">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              We have sent a verification code to your email. Please enter the code below.
            </CardDescription>
          </CardHeader>
          <CardContent className="my-5">
            <InputOTP
              className="w-full items-center justify-center"
              maxLength={6}
              onChange={(value) => setVerification({ ...verification, code: value })}
            >
              <InputOTPGroup className="w-full justify-center">
                <InputOTPSlot index={0} className="border rounded-sm border-gray-300 mx-2" />
                <InputOTPSlot index={1} className="border rounded-sm border-gray-300 mx-2" />
                <InputOTPSlot index={2} className="border rounded-sm border-gray-300 mx-2" />
                <InputOTPSeparator />
                <InputOTPSlot index={3} className="border rounded-sm border-gray-300 mx-2" />
                <InputOTPSlot index={4} className="border rounded-sm border-gray-300 mx-2" />
                <InputOTPSlot index={5} className="border rounded-sm border-gray-300 mx-2" />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter>
            <div className="grid w-full">
              <Button onClick={handleVerification} disabled={verifying}>
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Bienvenido a Helsa</CardTitle>
              <CardDescription>
                Helsa es una plataforma que te ayuda a mantener un seguimiento de tu salud. Comienza creando una cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              {role === 'DOCTOR' && (
                <>
                  <FormField
                    control={form.control}
                    name="licenseMedicalNumber"
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                          Número de licencia médica
                        </FormLabel>
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
                        <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                          Especialidad
                        </FormLabel>
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
                </>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">Nombre</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">Email</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password"></PasswordInput>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                      Confirma tu contraseña
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password"></PasswordInput>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              {isPossibleOauth && (
                <>
                  <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    or
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 mt-3">
                    <Button size="sm" variant="outline" type="button" onClick={() => onOauthPress('oauth_google')}>
                      <Icons.google className="mr-2 size-4" />
                      Google
                    </Button>
                    <Button onClick={() => onOauthPress('oauth_facebook')} size="sm" variant="outline" type="button">
                      <Icons.facebook className="mr-2 size-4" />
                      Facebook
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear cuenta'}
                </Button>
                <Button variant="link" size="sm" asChild>
                  <Link href="/sign-in">¿Ya tienes una cuenta? Inicia sesión</Link>
                </Button>
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
              Has verificado tu correo electrónico exitosamente
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
}

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
