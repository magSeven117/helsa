import { DoctorRepository } from '../../domain/doctor-repository';

export class GetSpecialties {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run() {
    const specialties = await this.doctorRepository.getSpecialties();
    return specialties.map((specialty) => specialty.toPrimitives());
  }
}
