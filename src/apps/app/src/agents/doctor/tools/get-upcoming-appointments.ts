import { database } from '@helsa/database';
import { GetUpcomingAppointment } from '@helsa/engine/appointment/application/get-upcoming-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { tool } from 'ai';
import { z } from 'zod';

export const getUpcomingAppointments = (userId: string) => {
  return tool({
    description: 'Get the next upcoming appointment',
    parameters: z.object({}),
    execute: async (props) => {
      const doctorGetter = new GetDoctor(new PrismaDoctorRepository(database));
      const doctor = await doctorGetter.run(userId);
      const service = new GetUpcomingAppointment(new PrismaAppointmentRepository(database));
      const appointments = await service.run(doctor!.id);

      return appointments;
    },
  });
};
