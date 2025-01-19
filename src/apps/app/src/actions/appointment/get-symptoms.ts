import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetSymptoms } from '@helsa/engine/appointment/application/get-symptoms';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';

export const getSymptoms = authActionClient.metadata({ actionName: 'get-symptoms' }).action(async () => {
  try {
    const service = new GetSymptoms(new PrismaAppointmentRepository(database));
    return await service.run();
  } catch (error) {
    console.log('ERRROR', error);
    return [];
  }
});
