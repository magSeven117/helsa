import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveTelemetry } from '@helsa/engine/appointment/application/save-telemetry';
import { AppointmentTelemetry } from '@helsa/engine/appointment/domain/telemetry';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

const schema = z.object({
  weight: z.number().optional(),
  temperature: z.number().optional(),
  bloodPressure: z.number().optional(),
  heartRate: z.number().optional(),
  respiratoryRate: z.number().optional(),
  oxygenSaturation: z.number().optional(),
});

export const POST = routeHandler(async ({ params, req }) => {
  const { id } = params;
  const body = await req.json();
  const parsedInput = schema.parse(body);

  const service = new SaveTelemetry(new PrismaAppointmentRepository(database));
  await service.run({ ...parsedInput, appointmentId: id } as Primitives<AppointmentTelemetry>);

  return NextResponse.json({ message: 'Vitals saved successfully' }, { status: 200 });
});
