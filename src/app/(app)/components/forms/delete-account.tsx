'use client';

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
} from '@/libs/shadcn-ui/alert-dialog';
import { Button } from '@/libs/shadcn-ui/button';
import { Delete } from 'lucide-react';

const DeleteAccount = ({}) => {
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <div className="flex flex-col w-full border-border border rounded-lg bg-background p-2 min-h-[170px]">
      <div className="flex justify-between w-full px-4">
        <h1 className="text-xl font-bold">Account</h1>
      </div>
      <div className="flex flex-col mt-6 w-full justify-between py-0 px-4 ">
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-3xl bg-destructive text-destructive-foreground gap-2 hover:bg-destructive/80 hover:text-destructive-foreground">
                <Delete></Delete>
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
