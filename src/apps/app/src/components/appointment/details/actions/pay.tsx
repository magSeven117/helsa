'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { Button } from '@helsa/ui/components/button';
import { Receipt } from 'lucide-react';
import Link from 'next/link';

const Pay = ({ status, id }: { status: string; id: string }) => {
  const { user } = useSession();
  if (!['CONFIRMED', 'SCHEDULED'].includes(status) || user?.role !== 'PATIENT') {
    return null;
  }
  return (
    <Link href={`/api/payment/appointment?appointmentId=${id}`}>
      <Button className="flex-1 w-full h-9 gap-2" variant={'secondary'}>
        <Receipt className="size-4" />
        Pagar
      </Button>
    </Link>
  );
};

export default Pay;
