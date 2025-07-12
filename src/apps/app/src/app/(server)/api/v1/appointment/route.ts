import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import {
  GetAppointmentErrors,
  GetDoctorAppointments,
} from '@helsa/engine/appointment/application/get-doctor-appointments';
import { GetPatientAppointments } from '@helsa/engine/appointment/application/get-patient-appointments';
import { HourAlreadyTakenError } from '@helsa/engine/appointment/domain/errors/hour-already-taken-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PatientNotFoundError } from '@helsa/engine/patient/domain/errors/patient-not-found-error';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { InngestEventBus } from '@helsa/events/event-bus';
import { z } from 'zod';
const getAppointmentsSchema = z.object({
  filter: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
      states: z.array(z.string()).optional(),
      specialties: z.array(z.string()).optional(),
      types: z.array(z.string()).optional(),
    })
    .optional(),
  pagination: z
    .object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    })
    .optional(),
  sort: z
    .object({
      sortBy: z.string().optional(),
      order: z.string().optional(),
    })
    .optional(),
});

const queryParamsSchema = z.object({
  filter: z.string().optional(),
  pagination: z.string().optional(),
  sort: z.string().optional(),
});

export const GET = routeHandler(
  {
    name: 'get-appointments',
    querySchema: queryParamsSchema,
  },
  async ({ user, searchParams }) => {
    const repository = new PrismaAppointmentRepository(database);
    const parsedSearchParams = getAppointmentsSchema.parse({
      filter: JSON.parse(searchParams.filter || '{}'),
      pagination: JSON.parse(searchParams.pagination || '{}'),
      sort: JSON.parse(searchParams.sort || '{}'),
    });

    let service;

    if (user?.role.value === UserRoleValue.DOCTOR) {
      const doctorGetter = new GetDoctor(new PrismaDoctorRepository(database));
      service = new GetDoctorAppointments(repository, doctorGetter);
    } else {
      const patientGetter = new GetPatient(new PrismaPatientRepository(database));
      service = new GetPatientAppointments(repository, patientGetter);
    }

    const response = await service.run(
      user?.id.value ?? '',
      parsedSearchParams.filter ?? {},
      parsedSearchParams.pagination,
      parsedSearchParams.sort,
      'userId',
    );
    return HttpNextResponse.json({ data: response });
  },
  (error: GetAppointmentErrors) => {
    switch (true) {
      case error instanceof PatientNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

const createAppointmentSchema = z.object({
  id: z.string(),
  date: z.string(),
  motive: z.string(),
  doctorId: z.string(),
  typeId: z.string(),
  priceId: z.string(),
  specialtyId: z.string(),
  symptoms: z.array(z.string()),
});

export const POST = routeHandler(
  { name: 'create-appointment', schema: createAppointmentSchema },
  async ({ user, body }) => {
    const getPatient = new GetPatient(new PrismaPatientRepository(database));
    const patient = await getPatient.run(user?.id.value ?? '', 'userId');
    const service = new CreateAppointment(new PrismaAppointmentRepository(database), new InngestEventBus());

    const { id, date, motive, symptoms, doctorId, typeId, specialtyId, priceId } = body;
    const patientId = patient.id;
    await service.run(id, new Date(date), motive, doctorId, patientId, typeId, specialtyId, priceId, symptoms);
    return HttpNextResponse.created();
  },
  (error) => {
    switch (true) {
      case error instanceof PatientNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      case error instanceof HourAlreadyTakenError:
        return HttpNextResponse.domainError(error, 400);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
