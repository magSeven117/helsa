import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetDocuments } from '@helsa/engine/appointment/application/get-documents';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';

export const GET = routeHandler({ name: 'get-appointment-documents' }, async ({ user, params }) => {
  const { id } = params;
  const service = new GetDocuments(new PrismaAppointmentRepository(database));

  const response = service.run(id);

  return HttpNextResponse.json({ data: response });
});
