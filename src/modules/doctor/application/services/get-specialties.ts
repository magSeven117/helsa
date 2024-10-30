import { DoctorRepository } from '../../domain/doctor-repository';

export class GetSpecialties {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run() {
    return this.doctorRepository.getSpecialties();
  }
}
