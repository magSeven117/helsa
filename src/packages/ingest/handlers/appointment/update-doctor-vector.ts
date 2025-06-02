import { database } from '@helsa/database';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateIndexStore } from '@helsa/engine/doctor/application/services/update-index-store';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { PrismaDoctorSearcher } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-searcher';
import { GetUser } from '@helsa/engine/user/application/get-user';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { client } from 'index';

export const updateDoctorVector = client.createFunction(
  { id: 'update-doctor-vector', name: 'Update Doctor Vector' },
  [
    { event: 'appointment/scheduled' },
    { event: 'doctor/schedule.registered' },
    { event: 'appointment/canceled' },
    { event: 'doctor/schedule.updated' },
  ],
  async ({ event }) => {
    const { doctorId } = event.data;

    const service = new UpdateIndexStore(
      new PrismaDoctorRepository(database),
      new PrismaDoctorSearcher(database),
      new GetUser(new PrismaUserRepository(database)),
      new GetDoctorAppointments(
        new PrismaAppointmentRepository(database),
        new GetDoctor(new PrismaDoctorRepository(database)),
      ),
    );

    await service.run(doctorId);
  },
);
