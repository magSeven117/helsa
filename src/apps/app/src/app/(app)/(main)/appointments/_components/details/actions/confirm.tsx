'use client';
import { useSession } from '@/src/app/(app)/(main)/_components/session-provider';
import { Button } from '@helsa/ui/components/button';
import { Check } from 'lucide-react';

const Confirm = ({ status }: { status: string }) => {
  const { user } = useSession();
  if (status !== 'SCHEDULED' || !user?.role.is('DOCTOR')) {
    return null;
  }
  return (
    <Button variant={'secondary'} className="h-9 gap-2">
      <Check />
      Confirmar
    </Button>
  );
};

export default Confirm;
