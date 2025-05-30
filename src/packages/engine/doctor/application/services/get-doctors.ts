import { Primitives } from '@helsa/ddd/types/primitives';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Doctor } from '../../domain/doctor';

export class GetDoctors {
  constructor(private readonly doctorSearcher: DoctorRepository) {}

  async run(
    filters: { q?: string; availability?: string; minRate?: number; experience?: number },
    limit = 10,
  ): Promise<Primitives<Doctor>[]> {
    const doctors = await this.doctorSearcher.search(
      {
        term: filters.q,
        availability: filters.availability,
        minRate: filters.minRate,
        experience: filters.experience,
      },
      limit,
    );

    return doctors.map((doctor) => doctor.toPrimitives());
  }
}
