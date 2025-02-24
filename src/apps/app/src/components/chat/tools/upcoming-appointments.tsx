import { getUpcomingAppointment } from '@/src/actions/appointment/get-upcoming-appointment';
import { MutableAIState } from '@/src/actions/chat/types';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@helsa/ui/components/table';
import { cn } from '@helsa/ui/lib/utils';
import { format } from 'date-fns';
import { v4 } from 'uuid';
import { z } from 'zod';
import { BotCard } from '../messages';
import { addToolMessage } from '../utils';

type Args = {
  aiState: MutableAIState;
};
export function getUpcomingAppointmentTool({ aiState }: Args) {
  return {
    description: 'Get the next upcoming appointment',
    parameters: z.object({
      fromDate: z.coerce.date().describe('Filter appointment from this date, in ISO-8601 format').optional(),
    }),
    generate: async (props: any) => {
      const toolCallId = v4();
      const response = await getUpcomingAppointment();
      const appointments = response?.data ?? [];

      addToolMessage(aiState, toolCallId, 'getUpcomingAppointment', props, { appointments });

      return <UpcomingAppointments data={appointments} />;
    },
  };
}

type Props = {
  data: Primitives<Appointment>[];
};

export const UpcomingAppointments = ({ data }: Props) => {
  return (
    <BotCard className="space-y-4">
      {data.length > 0 && <p>Encontré {data.length} próximas citas medicas agendadas </p>}
      {data.length > 0 && (
        <Table className="text-xs font-sans">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[45%] h-10">Tipo de consulta</TableHead>
              <TableHead className="h-10 min-w-[80px]">Doctor</TableHead>
              <TableHead className="h-10">Fecha</TableHead>
              <TableHead className="h-10 text-right w-[50px]">Motivo</TableHead>
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
                  <TableCell className="font-normal">{appointment.motive}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </BotCard>
  );
};
