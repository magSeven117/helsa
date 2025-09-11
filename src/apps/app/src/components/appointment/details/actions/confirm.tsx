'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { Button } from '@helsa/ui/components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const Confirm = ({ status, id }: { status: string; id: string }) => {
  const { user } = useSession();
  const client = useQueryClient();
  
  const { mutate: confirm, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/v1/appointment/${id}/confirm`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error al confirmar la cita');
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['appointments'] });
      client.invalidateQueries({ queryKey: ['appointment'] });
      toast.success('Cita confirmada correctamente');
    },
    onError: () => {
      toast.error('Error al confirmar la cita');
    },
  });

  if (status !== 'SCHEDULED' || !user?.role.is('DOCTOR')) {
    return null;
  }

  return (
    <Button 
      variant={'secondary'} 
      className="h-9 gap-2"
      onClick={() => confirm()}
      disabled={isPending}
    >
      <Check />
      {isPending ? 'Confirmando...' : 'Confirmar'}
    </Button>
  );
};

export default Confirm;
