import { database } from '@helsa/database';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { OpenAPIHono } from '@hono/zod-openapi';
import { createAppointmentRoute } from './routes';

const app = new OpenAPIHono();

app.openapi(createAppointmentRoute, async (c) => {
  const { date, motive, symptoms, doctorId, typeId, id, specialtyId, priceId } = c.req.valid('json');

  const patientId = '';

  const service = new CreateAppointment(new PrismaAppointmentRepository(database), new TriggerEventBus());
  await service.run(id, date, motive, doctorId, patientId, typeId, specialtyId, priceId, symptoms);
  return c.json({ message: 'Appointment created' });
});

export default app;
