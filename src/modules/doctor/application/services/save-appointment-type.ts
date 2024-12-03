import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { DoctorCriteria } from '../../domain/doctor-criteria';
import { DoctorRepository } from '../../domain/doctor-repository';

export class SaveAppointmentType {
  constructor(private readonly repository: DoctorRepository) {}

  async run(doctorId: string, name: string, duration: number, color: string): Promise<void> {
    const doctor = await this.repository.getByCriteria(DoctorCriteria.byId(doctorId));
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    doctor.saveAppointmentType({
      id: '',
      name,
      duration,
      color,
      system: false,
      doctorId: doctorId,
    });

    await this.repository.save(doctor);
  }
}
