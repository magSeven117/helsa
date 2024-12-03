import { DoctorRepository } from '../../domain/doctor-repository';

export class GetDoctors {
  constructor(private readonly doctorSearcher: DoctorRepository) {}

  async run(filters: {
    q?: string;
    specialties?: string[];
    availability?: string;
    minRate?: number;
    experience?: number;
  }) {
    const doctors = await this.doctorSearcher.search({
      term: filters.q,
      specialties: filters.specialties,
      availability: filters.availability,
      minRate: filters.minRate,
      experience: filters.experience,
    });

    return doctors.map((doctor) => doctor.toPrimitives());
  }
}
