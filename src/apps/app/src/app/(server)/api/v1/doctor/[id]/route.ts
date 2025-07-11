import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateDoctor } from '@helsa/engine/doctor/application/services/update-doctor';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { DoctorNotFoundError } from '@helsa/engine/doctor/domain/errors/doctor-not-found-error';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';
export const GET = routeHandler(
  { name: 'get-doctor', querySchema: z.object({ self: z.boolean().optional(), include: z.string().optional() }) },
  async ({ user, params, searchParams }) => {
    const { id } = params;
    const { self } = searchParams;
    const include = searchParams.include ? JSON.parse(searchParams.include as string) : null;
    const service = new GetDoctor(new PrismaDoctorRepository(database));

    const userId = self ? user?.id.value : id;

    const response = await service.run(userId, self ? undefined : 'id', include);

    return HttpNextResponse.json({
      message: 'Ok',
      data: response,
    });
  },
);

const schema = z.object({
  doctor: z.object({
    licenseMedicalNumber: z.string().optional(),
    experience: z.number().optional(),
    specialtyId: z.string().optional(),
  }),
});

export const PUT = routeHandler(
  { name: 'update-doctor', schema },
  async ({ params, body }) => {
    const { id } = params;
    const { doctor } = body;

    const service = new UpdateDoctor(new PrismaDoctorRepository(database));
    await service.run(id, doctor as unknown as Primitives<Doctor>);

    return HttpNextResponse.ok();
  },
  (error) => {
    switch (true) {
      case error instanceof DoctorNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
