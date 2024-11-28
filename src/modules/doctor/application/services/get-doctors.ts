import { DoctorSearcher } from '../../domain/doctor-index-store';

export class GetDoctors {
  constructor(private readonly doctorSearcher: DoctorSearcher) {}

  async run(filters: {
    q?: string;
    specialties?: string[];
    availability?: string;
    minRate?: number;
    experience?: number;
  }) {
    return this.doctorSearcher.search({
      term: filters.q,
      specialties: filters.specialties,
      availability: filters.availability,
      minRate: filters.minRate,
    });
  }
}
