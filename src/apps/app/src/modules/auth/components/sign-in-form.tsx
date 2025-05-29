'use client';

import { authClient } from '@helsa/auth/client';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Icons } from '@helsa/ui/components/icons';
import { Input } from '@helsa/ui/components/input';
import { PasswordInput } from '@helsa/ui/components/internal/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});
export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const signInAttempt = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (signInAttempt.data) {
        router.push('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const onOauthPress = async (strategy: 'google' | 'facebook') => {
    try {
      await authClient.signIn.social({ provider: strategy, callbackURL: '/dashboard' });
    } catch (error) {
      toast.error('An error occurred while trying to sign in with Google');
    }
  };
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Hola de nuevo!! :D</CardTitle>
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
                    <FormLabel className="text-sm  font-bold ">Email</FormLabel>
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
                    <FormLabel className="text-sm  font-bold">Contraseña</FormLabel>
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
                  <Icons.facebook className="mr-2 size-4" />
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full">
                <Button type="submit" disabled={isSubmitting} className="">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
                </Button>
                <Button variant="link" size="sm">
                  <Link href="/sign-up">¿No tienes una cuenta? Crea una</Link>
                </Button>
                <Button variant="link" size="sm">
                  <Link href="/recovery-password">¿Olvidaste tu contraseña? Recupérala aquí</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
