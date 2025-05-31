import { DoctorCriteria } from '../../domain/doctor-criteria';
import { DoctorRepository } from '../../domain/doctor-repository';

export class GetDoctorSchedule {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(id: string): Promise<any> {
    const doctor = await this.doctorRepository.getByCriteria(DoctorCriteria.byId(id).include('schedule'));

    if (!doctor) {
      return null;
    }

    return doctor.schedule!.toPrimitives();
  }
}
