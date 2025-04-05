'use client';
import { useFinalizeAppointment } from '@/src/hooks/appointment/use-appointment';
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
import { CircleCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

const apiKey = process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!;

const Finalize = () => {
  const params = useParams();
  const { finalizeAppointment } = useFinalizeAppointment(params.id as string);
  const finalizeCall = useCallback(async () => {
    try {
      const id = params.id as string;
      await finalizeAppointment();
    } catch (error) {
      console.log(error);
      toast.error('Error finalizing appointment');
    }
  }, []);
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
          <Button type="button" className="bg-emerald-400 text-white hover:text-background" onClick={finalizeCall}>
            Finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Finalize;
