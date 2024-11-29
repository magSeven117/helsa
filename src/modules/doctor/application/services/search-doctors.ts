import { DoctorSearcher } from '../../domain/doctor-index-store';

export class SearchDoctors {
  constructor(private indexStore: DoctorSearcher) {}

  async run(filters: {
    term?: string;
    availability?: string;
    minRate?: number;
    specialties?: string[];
    experience?: number;
  }) {
    const doctors = await this.indexStore.search(filters);
    return doctors;
  }
}
