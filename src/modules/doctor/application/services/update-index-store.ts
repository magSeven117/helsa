import { GetDoctorAppointments } from '@/modules/appointment/application/get-doctor-appointments';
import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { GetUser } from '@/modules/user/application/get-user';
import { format } from 'date-fns';
import { DoctorSearcher } from '../../domain/doctor-index-store';
import { DoctorRepository } from '../../domain/doctor-repository';
import { EmbeddingDoctor } from '../../domain/embedding-doctor';

export class UpdateIndexStore {
  constructor(
    private doctorRepository: DoctorRepository,
    private doctorIndexStore: DoctorSearcher,
    private getUser: GetUser,
    private getAppointments: GetDoctorAppointments,
    private embedder: EmbeddingDoctor
  ) {}

  async run(doctorId: string) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );
    const appointments = await this.getAppointments.run(doctorId);
    const user = await this.getUser.run(doctor.userId.toString());

    if (!doctor || !user) {
      return;
    }

    const groupedAppointments: {
      date: string;
      appointments: number;
      availabilities: number;
      day: string;
    }[] = [];

    for (const appointment of appointments) {
      const [date = ''] = appointment.initDate.value.toISOString().split('T');
      const index = groupedAppointments.findIndex((d) => d.date === date);
      const day = format(appointment.initDate.value, 'EEEE');
      const availability = doctor.schedule?.days.find((d) => d.day.value === day);
      if (index === -1) {
        groupedAppointments.push({
          date,
          appointments: 1,
          availabilities: (availability?.hours.length || 0) - 1,
          day,
        });
      } else {
        groupedAppointments[index]!.appointments += 1;
        groupedAppointments[index]!.availabilities -= 1;
      }
    }
  }
}
