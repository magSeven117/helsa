import { Primitives } from '@/modules/shared/domain/types/primitives';
import { AppointmentType } from '../../domain/appointment-type';
import { DoctorRepository } from '../../domain/doctor-repository';

export class GetAppointmentTypes {
  constructor(private readonly repository: DoctorRepository) {}

  async run(doctorId: string): Promise<Primitives<AppointmentType>[]> {
    try {
      const types = await this.repository.getAppointmentsTypes(doctorId);

      return types.map((type) => type.toPrimitives());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
