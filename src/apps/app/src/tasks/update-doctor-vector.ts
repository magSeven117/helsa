import { database } from '@helsa/database';
import { DomainEventPrimitives } from '@helsa/ddd/core/domain-event';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateIndexStore } from '@helsa/engine/doctor/application/services/update-index-store';
import { DoctorEventData } from '@helsa/engine/doctor/domain/events/doctor-event-data';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { PrismaDoctorSearcher } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-searcher';
import { GetUser } from '@helsa/engine/user/application/get-user';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { task } from '@trigger.dev/sdk/v3';

export const UpdateDoctorVectorTask = task({
  id: 'update-doctor-vector',
  maxDuration: 300,
  run: async (payload: DomainEventPrimitives<DoctorEventData>) => {
    const { data } = payload;
    const service = new UpdateIndexStore(
      new PrismaDoctorRepository(database),
      new PrismaDoctorSearcher(database),
      new GetUser(new PrismaUserRepository(database)),
      new GetDoctorAppointments(
        new PrismaAppointmentRepository(database),
        new GetDoctor(new PrismaDoctorRepository(database))
      )
    );

    await service.run(data.doctorId);

    return {
      message: 'Doctor vector updated',
    };
  },
});
