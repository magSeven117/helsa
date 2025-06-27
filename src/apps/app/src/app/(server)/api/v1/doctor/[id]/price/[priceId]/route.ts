import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { RemovePrice } from '@helsa/engine/doctor/application/services/remove-appointment-type';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const DELETE = routeHandler({ name: 'remove-price' }, async ({ params }) => {
  const { id, priceId } = params;
  const service = new RemovePrice(new PrismaDoctorRepository(database));
  await service.run(id, priceId);

  return HttpNextResponse.ok();
});
