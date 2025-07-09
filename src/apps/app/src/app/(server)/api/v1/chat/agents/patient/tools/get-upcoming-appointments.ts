import { database } from '@helsa/database';
import { GetPatientUpcomingAppointments } from '@helsa/engine/appointment/application/get-patient-upcoming-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { tool } from 'ai';
import { z } from 'zod';

export const getUpcomingAppointments = (userId: string) => {
  return tool({
    description: 'Get the next upcoming appointment',
    parameters: z.object({}),
    execute: async (props) => {
      const patientGetter = new GetPatient(new PrismaPatientRepository(database));
      const patient = await patientGetter.run(userId, 'userId');
      const service = new GetPatientUpcomingAppointments(new PrismaAppointmentRepository(database));
      const appointments = await service.run(patient.id);
      return {
        appointments,
      };
    },
  });
};
