import { env } from '@/env';
import { database } from '@helsa/database';
import { PayAppointment } from '@helsa/engine/appointment/application/pay-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { Webhooks } from '@helsa/payment';
import { revalidatePath } from 'next/cache';

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET || '',
  onOrderPaid: async (payload) => {
    if (payload.data.metadata.type !== 'appointment') return;

    const service = new PayAppointment(new PrismaAppointmentRepository(database));

    await service.run(payload.data.metadata.appointmentId as string);

    revalidatePath(`/api/appointments`);
    revalidatePath(`/api/appointments/${payload.data.metadata.appointmentId}`);
  },
  onSubscriptionCreated: async (payload) => {
    console.log('Subscription created:', payload);
  },
});