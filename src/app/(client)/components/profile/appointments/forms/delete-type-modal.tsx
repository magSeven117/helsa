'use client';
import { removePrice } from '@/app/(server)/actions/doctor/remove-price';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/libs/shadcn-ui/components/alert-dialog';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeleteTypeModal = ({
  isOpen,
  setOpen,
  id,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}) => {
  const router = useRouter();
  const deleteType = useAction(removePrice, {
    onSuccess: ({ data }) => {
      toast.success((data as any).message);
      router.refresh();
      setOpen(false);
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro que deseas eliminar las categorías seleccionadas?</AlertDialogTitle>
          <AlertDialogDescription>
            Al eliminar una categoría, todos los productos relacionados con esta categoría serán eliminadas
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteType.execute({ id });
            }}
            disabled={deleteType.status === 'executing'}
            className=""
            type="submit"
          >
            {deleteType.status === 'executing' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Eliminar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTypeModal;
