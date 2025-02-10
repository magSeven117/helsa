'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveTelemetry } from '@helsa/engine/appointment/application/save-telemetry';
import { AppointmentTelemetry } from '@helsa/engine/appointment/domain/telemetry';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  weight: z.number().optional(),
  temperature: z.number().optional(),
  bloodPressure: z.number().optional(),
  heartRate: z.number().optional(),
  appointmentId: z.string(),
  respiratoryRate: z.number().optional(),
  oxygenSaturation: z.number().optional(),
});

export const saveVitals = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'save-vitals',
  })
  .action(async ({ parsedInput }) => {
    const service = new SaveTelemetry(new PrismaAppointmentRepository(database));
    await service.run(parsedInput as Primitives<AppointmentTelemetry>);
    revalidatePath(`/appointment/${parsedInput.appointmentId}`);
  });
