import { getAppointment } from '@/app/(server)/actions/appointment/get-appointment';
import { Button } from '@/libs/shadcn-ui/components/button';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Phone, X } from 'lucide-react';
import Link from 'next/link';

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getAppointment({ appointmentId: params.id });
  const appointment = response?.data!;
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="px-7 my-3">
        <div className="flex  gap-5 py-2 justify-start items-center max-sm:max-w-full max-sm:overflow-x-scroll no-scroll border-b rounded-none px-3">
          <Link href={''} className={cn('text-muted-foreground', {})}>
            General
          </Link>
          <Link href={''} className={cn('text-muted-foreground', {})}>
            Diagnósticos
          </Link>
          <Link href={''} className={cn('text-muted-foreground', {})}>
            Documentos y exámenes
          </Link>
          <Link href={''} className={cn('text-muted-foreground', {})}>
            Notas
          </Link>
        </div>
      </div>
      <div className="px-7 pt-5 flex items-center gap-5">
        <Button variant={'outline'} className="gap-3">
          <Phone />
          Entrar a la llamada
        </Button>
        <Button variant={'outline'} className="gap-3">
          <X />
          Cancelar cita
        </Button>
      </div>
    </div>
  );
};

export default Page;
