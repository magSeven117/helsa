import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { format } from 'date-fns';
import { GetDoctorAppointments } from '../../../appointment/application/get-doctor-appointments';
import { GetUser } from '../../../user/application/get-user';
import { User } from '../../../user/domain/user';
import { DoctorSearcher } from '../../domain/doctor-index-store';
import { DoctorRepository } from '../../domain/doctor-repository';

export class UpdateIndexStore {
  constructor(
    private doctorRepository: DoctorRepository,
    private doctorIndexStore: DoctorSearcher,
    private getUser: GetUser,
    private getAppointments: GetDoctorAppointments,
  ) {}

  async run(doctorId: string) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }], undefined, undefined, [
        { field: 'schedule' },
        { field: 'specialty' },
      ]),
    );
    const appointments = (await this.getAppointments.run(doctorId, {}, undefined, undefined, 'id')).data;
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
      const [date = ''] = appointment.date.toISOString().split('T');
      const index = groupedAppointments.findIndex((d) => d.date === date);
      const day = format(appointment.date, 'EEEE');
      const availability = doctor.schedule?.days.find((d) => d.day.value === day.toLowerCase());
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
    await this.doctorIndexStore.save(User.fromPrimitives(user), doctor, groupedAppointments);
  }
}
