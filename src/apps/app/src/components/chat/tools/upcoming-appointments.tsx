'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@helsa/ui/components/table';
import { cn } from '@helsa/ui/lib/utils';
import { format } from 'date-fns';
import { BotCard } from '../messages';

type Props = {
  data: Primitives<Appointment>[];
};

export const UpcomingAppointments = ({ data }: Props) => {
  return (
    <BotCard className="space-y-4">
      {data.length === 0 && <p className="text-md">No encontré citas medicas agendadas</p>}
      {data.length > 0 && <p className="text-md">Encontré estas próximas citas medicas agendadas </p>}
      {data.length > 0 && (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15%] h-10">Tipo de consulta</TableHead>
              <TableHead className="h-10 min-w-[80px]">Doctor</TableHead>
              <TableHead className="h-10">Fecha</TableHead>
              <TableHead className="h-10 text-right w-[35%]">Motivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((appointment: Primitives<Appointment>) => {
              return (
                <TableRow key={appointment.id} className="h-[34px]">
                  <TableCell className="flex justify-start items-center gap-3">
                    <div className="size-3" style={{ backgroundColor: appointment.type?.color }}></div>
                    <span className="line-clamp-1">{appointment.type?.name}</span>
                  </TableCell>
                  <TableCell className={cn('font-normal')}>
                    <span className="line-clamp-1">{appointment.doctor?.user?.name}</span>
                  </TableCell>
                  <TableCell className="font-normal">{format(appointment.date, 'PPp')}</TableCell>
                  <TableCell className="font-normal text-right">{appointment.motive}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </BotCard>
  );
};
