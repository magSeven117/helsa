import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { RemoveEducation } from '@helsa/engine/doctor/application/services/remove-education';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const DELETE = routeHandler({ name: 'remove-education' }, async ({ params }) => {
  const { id, educationId } = params;

  const service = new RemoveEducation(new PrismaDoctorRepository(database));
  await service.run(id, educationId);

  return HttpNextResponse.ok();
});
