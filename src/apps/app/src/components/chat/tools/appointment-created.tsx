import { Button } from '@helsa/ui/components/button';
import Link from 'next/link';
import { BotCard } from '../messages';

const AppointmentCreated = ({
  data,
}: {
  data: {
    doctor: string;
    date: string;
    reason: string;
    appointmentId: string;
  };
}) => {
  return (
    <BotCard>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Cita agendada correctamente</h3>
        <p>
          Doctor: <span className="font-bold">{data.doctor}</span>
        </p>
        <p>
          Fecha: <span className="font-bold">{new Date(data.date).toLocaleString()}</span>
        </p>
        <p>
          Motivo: <span className="font-bold">{data.reason}</span>
        </p>
        <Link href={`/appointments?id=${data.appointmentId}`}>
          <Button variant={'outline'}>Ver cita</Button>
        </Link>
      </div>
    </BotCard>
  );
};

export default AppointmentCreated;
