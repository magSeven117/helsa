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
import { useRegister } from '@/modules/user/presentation/hooks/use-register';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
    },
    mode: 'all',
  });

  const { isSubmitting } = form.formState;

  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { register } = useRegister();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState({
    state: '',
    code: '',
    error: '',
  });


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
          role: 'UNDEFINED',
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
          role: 'UNDEFINED',
          provider: 'oauth',
        },
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Email</FormLabel>
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
                    <FormLabel className="text-sm">Contraseña</FormLabel>
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
                    <FormLabel className="text-sm">
                      Confirma tu contraseña
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password"></PasswordInput>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

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
