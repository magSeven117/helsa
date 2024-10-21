'use client';
import * as successAnimation from '@/assets/animations/success_animation.json';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/libs/shadcn-ui/alert-dialog';
import { Button } from '@/libs/shadcn-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn-ui/form';
import { Icons } from '@/libs/shadcn-ui/icons';
import { Input } from '@/libs/shadcn-ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/libs/shadcn-ui/input-otp';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Lottie from 'react-lottie';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: '',
    code: '',
    error: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

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
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        // TODO: Save info on the backend with the correct role
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
        //router.push('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const onOauthPress = async (strategy: 'oauth_google' | 'oauth_facebook') => {
    if (!isLoaded) return;
    const values = form.getValues()
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-up/sso-callback',
        redirectUrlComplete: '/doctor/dashboard',
        unsafeMetadata: {
          name: values.name,
          role: 'DOCTOR',
          provider: 'oauth',
        }
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
                <InputOTPSlot index={0} className="border-color-brand-primary" />
                <InputOTPSlot index={1} className="border-color-brand-primary" />
                <InputOTPSlot index={2} className="border-color-brand-primary" />
                <InputOTPSlot index={3} className="border-color-brand-primary" />
                <InputOTPSlot index={4} className="border-color-brand-primary" />
                <InputOTPSlot index={5} className="border-color-brand-primary" />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter>
            <div className="grid w-full">
              <Button onClick={handleVerification}>Verify</Button>
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
              <CardTitle>Welcome to Helsa</CardTitle>
              <CardDescription>
                Helsa is a platform that helps you keep track of your health. Get started by creating an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">Name</FormLabel>
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
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="password"></Input>
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
                <Button>Sign Up</Button>
                <Button variant="link" size="sm" asChild>
                  <Link href="/sign-in">Already have an account? Sign in</Link>
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
            <AlertDialogTitle className="text-center text-2xl">Verified!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              You have successfully verified your email
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/doctor/dashboard');
                }}
              >
                Browse home
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
