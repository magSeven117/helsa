'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@helsa/ui/components/alert-dialog';
import { Button } from '@helsa/ui/components/button';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDeletePrice } from '../../../hooks/use-prices';

const DeletePriceModal = ({
  isOpen,
  setOpen,
  id,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}) => {
  const { deletePrice, isPending } = useDeletePrice(id);

  const removePrice = async ({ id }: { id: string }) => {
    await deletePrice(id);
    toast.success('Tarifa eliminada');
    setOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro que deseas eliminar la tarifa?</AlertDialogTitle>
          <AlertDialogDescription>
            Al eliminar una tarifa, todos los productos relacionados con esta tarifa serán eliminadas
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              removePrice({ id });
            }}
            disabled={isPending}
            className=""
            type="submit"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Eliminar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePriceModal;
