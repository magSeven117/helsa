'use client';

import { PasswordInput } from '@/libs/ducen-ui/components/password-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/libs/shadcn-ui/components/alert-dialog';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { authClient } from '@/modules/shared/infrastructure/auth/auth-client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const DeleteAccountSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      await authClient.deleteUser({
        password,
      });
      setIsSubmitting(false);
      toast.info('Deleting account...');
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Card className="rounded-none bg-transparent border-destructive">
      <CardHeader className="">
        <div>
          <CardTitle>Eliminar cuenta</CardTitle>
          <p className="text-muted-foreground text-sm mt-5">
            Elimina permanentemente tu cuenta personal y todo su contenido de la plataforma Midday. Esta acción no es
            reversible, así que por favor continúa con precaución.
          </p>
        </div>
      </CardHeader>
      <CardFooter className="border-t pt-4 flex justify-end items-start gap-2 md:items-center flex-col md:flex-row">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-none" variant="destructive">
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:rounded-none ">
            <AlertDialogHeader>
              <AlertDialogTitle className="">Cuidado!</AlertDialogTitle>
              <AlertDialogDescription className="">
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Password</label>
              <PasswordInput className="rounded-none" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <AlertDialogFooter className="flex w-full justify-end items-center">
              <AlertDialogCancel className="rounded-none max-sm:w-full">Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild className="bg-destructive text-primary">
                <Button
                  variant="destructive"
                  className="rounded-none max-sm:w-full"
                  onClick={onSubmit}
                  disabled={isSubmitting || password === ''}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Eliminar cuenta'}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
