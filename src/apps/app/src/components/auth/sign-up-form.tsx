'use client';
import * as successAnimation from '@/src/assets/animations/success_animation.json';
import { authClient } from '@helsa/auth/client';
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
import { Icons } from '@helsa/ui/components/icons';
import { Input } from '@helsa/ui/components/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@helsa/ui/components/input-otp';
import { PasswordInput } from '@helsa/ui/components/internal/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Lottie from 'react-lottie';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    firstName: z.string().min(3, { message: 'First name must be at least 3 characters' }),
    lastName: z.string().min(3, { message: 'Last name must be at least 3 characters' }),
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
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    mode: 'all',
  });

  const { isSubmitting } = form.formState;

  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState({
    state: '',
    code: '',
    error: '',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.firstName + ' ' + data.lastName,
        image: undefined,
      });
      console.log(res);
      toast.error('A un solo paso de poder iniciar');
      setVerification({ ...verification, state: 'pending' });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleVerification = async () => {
    try {
      setVerifying(true);
      const user = await authClient.emailOtp.verifyEmail({
        email: form.getValues().email,
        otp: verification.code,
      });

      if (!user.error) {
        setVerification({ ...verification, state: 'success' });
        setShowSuccessModal(true);
      } else {
        console.error(user.error.message);
      }
      setVerifying(false);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const onOauthPress = async (strategy: 'google' | 'facebook') => {
    try {
      await authClient.signIn.social({
        provider: strategy,
        callbackURL: `${window.location.origin}/select-role`,
      });
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

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
              className="w-full items-center justify-center "
              maxLength={6}
              onChange={(value) => setVerification({ ...verification, code: value })}
            >
              <InputOTPGroup className="w-full justify-center ">
                <InputOTPSlot index={0} className="border  border-gray-300 mx-2 first:" />
                <InputOTPSlot index={1} className="border  border-gray-300 mx-2" />
                <InputOTPSlot index={2} className="border  border-gray-300 mx-2" />
                <InputOTPSeparator />
                <InputOTPSlot index={3} className="border  border-gray-300 mx-2" />
                <InputOTPSlot index={4} className="border  border-gray-300 mx-2" />
                <InputOTPSlot index={5} className="border  border-gray-300 mx-2 last:" />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter>
            <div className="grid w-full">
              <Button onClick={handleVerification} disabled={verifying} className="">
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
              <CardTitle>Regístrate en Helsa</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} className=""></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">Apellido</FormLabel>
                      <FormControl>
                        <Input {...field} className=""></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input {...field} className=""></Input>
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
                    <FormLabel className="text-sm">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password" className=""></PasswordInput>
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
                    <FormLabel className="text-sm">Confirma tu contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password" className=""></PasswordInput>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                or
              </p>
              <div className="grid grid-cols-2 gap-x-4 mt-3">
                <Button size="sm" variant="outline" type="button" className="" onClick={() => onOauthPress('google')}>
                  <Icons.google className="mr-2 size-4" />
                  Google
                </Button>
                <Button onClick={() => onOauthPress('facebook')} className="" size="sm" variant="outline" type="button">
                  <Icons.facebook className="mr-2 size-4" color="white" />
                  Facebook
                </Button>
              </div>
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
                  router.push(`/select-role`);
                }}
                size="lg"
              >
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
