import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { withUser } from '../../../withUser';

export const PUT = withUser(async ({ params, user }) => {
  const { id } = params;
  const service = new EnterRoom(new PrismaAppointmentRepository(database), new TriggerEventBus());
  await service.run(id, user.role as 'PATIENT' | 'DOCTOR');
});
