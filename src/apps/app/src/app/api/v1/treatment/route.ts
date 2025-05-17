import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateTreatment } from '@helsa/engine/treatment/application/create-treatment';
import { GetTreatments } from '@helsa/engine/treatment/application/get-treatments';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { PrismaTreatmentRepository } from '@helsa/engine/treatment/infrastructure/prisma-treatment-repository';
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../withUser';

const schema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  patientId: z.string(),
  doctorId: z.string(),
  appointmentId: z.string(),
  medication: z
    .object({
      name: z.string(),
      dose: z.string(),
      frequency: z.string(),
      presentation: z.string(),
    })
    .optional(),
  therapy: z
    .object({
      description: z.string(),
    })
    .optional(),
  procedure: z
    .object({
      description: z.string(),
    })
    .optional(),
});

export const POST = withUser(async ({ req, user }) => {
  const parsedInput = schema.parse(await req.json());
  const service = new CreateTreatment(new PrismaTreatmentRepository(database));

  await service.run(parsedInput as unknown as Primitives<Treatment>);
  revalidateTag(`get-treatments-${user.id}`);
  revalidatePath(`/appointments/${parsedInput.appointmentId}`);

  return NextResponse.json({ message: 'Treatment created successfully' }, { status: 201 });
});

export const GET = withUser(async ({ user, searchParams }) => {
  const { patientId, appointmentId } = searchParams;

  if (!patientId && !appointmentId) {
    return NextResponse.json({ error: 'patientId or appointmentId is required' }, { status: 400 });
  }

  const service = new GetTreatments(new PrismaTreatmentRepository(database));
  const criteria = patientId
    ? [{ field: 'patientId', operator: Operator.EQUAL, value: patientId }]
    : [{ field: 'appointmentId', operator: Operator.EQUAL, value: appointmentId }];

  const orders = await cache(() => service.run(criteria), [`get-treatments`, appointmentId || patientId], {
    tags: [`get-treatments-${user.id}`],
    revalidate: 3600,
  })();
  return NextResponse.json({ data: orders }, { status: 200 });
});
