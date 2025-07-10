'use client';
import { deleteDoctorPrice } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
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
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DeletePriceModal = ({
  isOpen,
  setOpen,
  id,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}) => {
  const { mutate: removePrice, isPending } = useMutation({
    mutationFn: async (priceId: string) => deleteDoctorPrice(id, priceId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Tarifa eliminada');
      setOpen(false);
    },
  });

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
              removePrice(id);
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
