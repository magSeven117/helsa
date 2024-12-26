import { DoctorRepository } from '../../domain/doctor-repository';

export class RemovePrice {
  constructor(private repository: DoctorRepository) {}

  async run(doctorId: string, priceId: string): Promise<void> {
    await this.repository.removePrice(doctorId, priceId);
  }
}
