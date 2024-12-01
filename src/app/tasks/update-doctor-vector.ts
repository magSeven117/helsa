import { GetDoctorAppointments } from '@/modules/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { UpdateIndexStore } from '@/modules/doctor/application/services/update-index-store';
import { DoctorEventData } from '@/modules/doctor/domain/events/doctor-event-data';
import { MongoDBDoctorSearcher } from '@/modules/doctor/infrastructure/persistence/mongodb-doctor-searcher';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { DomainEventPrimitives } from '@/modules/shared/domain/core/domain-event';
import { mongodbClient } from '@/modules/shared/infrastructure/persistence/mongodb/mongodb-client';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { GetUser } from '@/modules/user/application/get-user';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
import { task } from '@trigger.dev/sdk/v3';

export const UpdateDoctorVectorTask = task({
  id: 'update-doctor-vector',
  maxDuration: 300,
  run: async (payload: DomainEventPrimitives<DoctorEventData>) => {
    const { data } = payload;
    const service = new UpdateIndexStore(
      new PrismaDoctorRepository(db),
      new MongoDBDoctorSearcher(mongodbClient),
      new GetUser(new PrismaUserRepository(db)),
      new GetDoctorAppointments(new PrismaAppointmentRepository(db))
    );

    await service.run(data.doctorId);

    return {
      message: 'Doctor vector updated',
    };
  },
});
