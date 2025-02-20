'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { GetPatientAppointments } from '@helsa/engine/appointment/application/get-patient-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  states: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  types: z.array(z.string()).optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sortBy: z.string().optional(),
  order: z.string().optional(),
});

export const getAppointments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointments',
    track: {
      event: 'get-appointments',
    },
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const repository = new PrismaAppointmentRepository(database);

    let service;

    if (user.role === UserRoleValue.DOCTOR) {
      const doctorGetter = new GetDoctor(new PrismaDoctorRepository(database));
      service = new GetDoctorAppointments(repository, doctorGetter);
    } else {
      const patientGetter = new GetPatient(new PrismaPatientRepository(database));
      service = new GetPatientAppointments(repository, patientGetter);
    }

    return cache(
      () =>
        service.run(
          user.id,
          {
            end: parsedInput.end,
            start: parsedInput.start,
            states: parsedInput.states,
            specialties: parsedInput.specialties,
            types: parsedInput.types,
          },
          {
            page: parsedInput.page,
            pageSize: parsedInput.pageSize,
          },
          { sortBy: parsedInput.sortBy, order: parsedInput.order }
        ),

      ['get-appointments', user.id],
      { tags: [`get-appointments-${user.id}`], revalidate: 3600 }
    )();
  });
