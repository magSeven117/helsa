import { DoctorIndexStore } from '../../domain/doctor-index-store';

export class SearchDoctors {
  constructor(private indexStore: DoctorIndexStore) {}

  async run(filters: { term?: string; availability?: Date; minRate?: number; specialties?: string[] }) {
    const doctors = await this.indexStore.search(filters);
    return doctors;
  }
}
