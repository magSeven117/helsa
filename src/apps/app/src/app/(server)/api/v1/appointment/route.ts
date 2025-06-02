import { database } from '@helsa/database';
import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import {
  GetAppointmentErrors,
  GetDoctorAppointments,
} from '@helsa/engine/appointment/application/get-doctor-appointments';
import { GetPatientAppointments } from '@helsa/engine/appointment/application/get-patient-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { InngestEventBus } from '@helsa/ingest/event-bus';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../route-handler';
const getAppointmentsSchema = z.object({
  filter: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
    states: z.array(z.string()).optional(),
    specialties: z.array(z.string()).optional(),
    types: z.array(z.string()).optional(),
  }),
  pagination: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }),
  sort: z.object({
    sortBy: z.string().optional(),
    order: z.string().optional(),
  }),
});

export const GET = routeHandler(
  async ({ user, searchParams }) => {
    const parsedInput = getAppointmentsSchema.parse({
      filter: JSON.parse(searchParams.filter as string),
      pagination: JSON.parse(searchParams.pagination as string),
      sort: JSON.parse(searchParams.sort as string),
    });
    const repository = new PrismaAppointmentRepository(database);

    let service;

    if (user.role === UserRoleValue.DOCTOR) {
      const doctorGetter = new GetDoctor(new PrismaDoctorRepository(database));
      service = new GetDoctorAppointments(repository, doctorGetter);
    } else {
      const patientGetter = new GetPatient(new PrismaPatientRepository(database));
      service = new GetPatientAppointments(repository, patientGetter);
    }

    const response = await cache(
      () => service.run(user.id, parsedInput.filter, parsedInput.pagination, parsedInput.sort, 'userId'),
      ['get-appointments', user.id, JSON.stringify(parsedInput)],
      {
        tags: [`get-appointments-${user.id}`],
        revalidate: 60 * 60,
      },
    )();
    return NextResponse.json({ data: response, message: 'success' });
  },
  (error: GetAppointmentErrors) => {
    switch (true) {
      case error instanceof z.ZodError:
        return NextResponse.json({ message: 'Invalid input', errors: error.flatten() }, { status: 400 });
      case error instanceof NotFoundError:
        return NextResponse.json({ message: error.message }, { status: 404 });
      default:
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
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
  async ({ req, user, params }) => {
    const data = await req.json();
    const parsedInput = createAppointmentSchema.parse(data);
    const getPatient = new GetPatient(new PrismaPatientRepository(database));
    const patient = await getPatient.run(user.id, 'userId');
    const service = new CreateAppointment(new PrismaAppointmentRepository(database), new InngestEventBus());

    const { id, date, motive, symptoms, doctorId, typeId, specialtyId, priceId } = parsedInput;
    const patientId = patient.id;
    if (!patientId) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
    }
    await service.run(id, new Date(date), motive, doctorId, patientId, typeId, specialtyId, priceId, symptoms);
    return NextResponse.json({ message: 'success' }, { status: 201 });
  },
  (error) => {
    switch (true) {
      case error instanceof z.ZodError:
        return NextResponse.json({ message: 'Invalid input', errors: error.flatten() }, { status: 400 });
      case error instanceof FormatError:
        return NextResponse.json({ message: error.message }, { status: 404 });
      default:
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  },
);
