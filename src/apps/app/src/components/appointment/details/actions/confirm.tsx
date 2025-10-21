'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { confirmAppointment } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Button } from '@helsa/ui/components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Confirm = ({ status, appointmentId }: { status: string; appointmentId: string }) => {
  const { user } = useSession();
  const queryClient = useQueryClient();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => confirmAppointment(id),
    onSuccess: () => {
      toast.success('Cita confirmada correctamente');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error) => {
      console.error('Error confirming appointment:', error);
      toast.error('Error al confirmar la cita');
    },
  });

  const handleConfirm = async () => {
    try {
      await mutateAsync(appointmentId);
    } catch (error) {
      // Error is handled by onError
    }
  };

  if (status !== 'SCHEDULED' || !user?.role.is('DOCTOR')) {
    return null;
  }
  
  return (
    <Button 
      variant={'secondary'} 
      className="h-9 gap-2"
      onClick={handleConfirm}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <Check />}
      Confirmar
    </Button>
  );
};

export default Confirm;
