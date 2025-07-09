'use client';
import { finalizeAppointment } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Button } from '@helsa/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@helsa/ui/components/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleCheck } from 'lucide-react';
import { toast } from 'sonner';

const Finalize = ({ id }: { id: string }) => {
  const client = useQueryClient();
  const { mutate: finalize } = useMutation({
    mutationFn: async () => finalizeAppointment(id),
    onSuccess: (data, variables, context) => {
      client.invalidateQueries({
        queryKey: ['appointments'],
      });
      client.invalidateQueries({
        queryKey: ['appointment'],
      });
    },
    onError: (error, variables, context) => {
      console.error('Error finalizing appointment:', error);
      toast.error('Error finalizando la cita');
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="gap-2">
          <CircleCheck />
          Finalizar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar llamada</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-muted-foreground text-sm mt-5">
            Estas a punto de finalizar la llamada. Una vez que lo hagas, no podrás volver a acceder a esta consulta.
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" className="bg-emerald-400 text-white hover:text-background" onClick={() => finalize()}>
            Finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Finalize;
