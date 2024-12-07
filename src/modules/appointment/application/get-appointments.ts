import { Meta } from '@/modules/shared/domain/core/collection.';
import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Appointment } from '../domain/appointment';
import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetAppointments {
  constructor(private repository: AppointmentRepository) {}

  async run(id: string, role: string, filters: {}): Promise<{ data: Primitives<Appointment>[]; meta: Meta }> {
    let criteria: Criteria;
    criteria = role === 'DOCTOR' ? AppointmentCriteria.searchByDoctorId(id) : AppointmentCriteria.searchByPatientId(id);
    const response = await this.repository.search(criteria);
    console.log(JSON.stringify(response.getItems()[0].toPrimitives()));
    return {
      data: response.getItems().map((appointment) => appointment.toPrimitives()),
      meta: response.getMeta(),
    };
  }
}
