import { database } from '@helsa/database';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';

import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InngestEventBus } from '@helsa/events/event-bus';
import { tool } from 'ai';
import { v4 } from 'uuid';
import { z } from 'zod';

export const makeAppointment = (user: { id: string }) => {
  return tool({
    description: 'Make an appointment with a doctor',
    parameters: z.object({
      doctorId: z.string().describe('The ID of the doctor you want to make an appointment with'),
      date: z.string().describe('The date of the appointment in YYYY-MM-DD format'),
      time: z.string().describe('The time of the appointment in HH:MM format'),
      reason: z.string().describe('The reason for the appointment'),
    }),
    execute: async ({ doctorId, date, time, reason }) => {
      const patient = await new GetPatient(new PrismaPatientRepository(database)).run(user.id, 'userId');
      const doctor = await new GetDoctor(new PrismaDoctorRepository(database)).run(doctorId, 'id', {
        prices: true,
        user: true,
        specialty: true,
      });
      const id = v4();
      await new CreateAppointment(new PrismaAppointmentRepository(database), new InngestEventBus()).run(
        id,
        new Date(`${date}T${time}`),
        reason,
        doctor!.id,
        patient.id,
        doctor?.prices?.[0].typeId ?? '',
        doctor?.specialty?.id ?? '',
        doctor?.prices?.[0].id ?? '',
        [],
      );

      return {
        message: 'Cita agendada correctamente',
        data: {
          appointmentId: id,
          doctor: doctor?.user?.name,
          date: `${date}T${time}`,
          reason,
        },
      };
    },
  });
};
