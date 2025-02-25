import { z } from '@hono/zod-openapi';
export const createAppointmentSchema = z.object({
  id: z.string(),
  date: z.date(),
  motive: z.string(),
  doctorId: z.string(),
  typeId: z.string(),
  priceId: z.string(),
  specialtyId: z.string(),
  symptoms: z.array(z.string()),
});
