import { capitalize } from '@/libs/ducen-ui/utils/capitalize';
import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Badge } from '@/libs/shadcn-ui/components/badge';
import { Card, CardContent } from '@/libs/shadcn-ui/components/card';
import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays, Clock, Stethoscope } from 'lucide-react';

const Overview = ({ appointment }: { appointment: Primitives<Appointment> }) => {
  return (
    <div className="grid grid-cols-3 w-full px-7 py-5 gap-5">
      <div className="space-y-3 col-span-1">
        <Card className="rounded-none">
          <CardContent className="py-5 space-y-4">
            <div className="flex justify-start items-center gap-5">
              <Avatar className="size-16 border">
                <AvatarImage src={appointment.doctor?.user?.image} className="object-contain" />
                <AvatarFallback>
                  {appointment.doctor?.user?.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{appointment.doctor?.user?.name}</h1>
                <p>Cita de tipo: {appointment.type?.name}</p>
              </div>
              <Badge style={{ backgroundColor: appointment.type?.color, color: '#fff' }}>{appointment.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              <span className="">{capitalize(format(appointment.date, 'PPPP', { locale: es }))}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span className="">{format(appointment.date, 'p')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="size-4" />
              <span className="">Especialidad: {appointment.doctor?.specialty?.name}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="py-5">
            <div className="space-y-3">
              <h1 className="text-xl font-semibold">Motivo y síntomas</h1>
              <p className="text-sm text-muted-foreground">{appointment.motive}</p>
              <div className="flex justify-start items-center gap-2">
                <Badge variant={'outline'}>Fiebre</Badge>
                <Badge variant={'outline'}>Dolor de cabeza</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 space-y-3">
        <Card className="rounded-none">
          <CardContent className="py-5">
            <div className="space-y-3">
              <h1 className="text-xl font-semibold">Motivo y síntomas</h1>
              <p className="text-sm text-muted-foreground">{appointment.motive}</p>
              <div className="flex justify-start items-center gap-2">
                <Badge variant={'outline'}>Fiebre</Badge>
                <Badge variant={'outline'}>Dolor de cabeza</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
