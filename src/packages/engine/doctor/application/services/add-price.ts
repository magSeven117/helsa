import { Primitives } from '@helsa/ddd/types/primitives';
import { DoctorNotFoundError } from '../../domain/errors/doctor-not-found-error';
import { DoctorCriteria } from '../../domain/doctor-criteria';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Price } from '../../domain/price';

export class AddPrice {
  constructor(private readonly repository: DoctorRepository) {}

  async run(doctorId: string, input: Primitives<Price>): Promise<void> {
    const doctor = await this.repository.getByCriteria(DoctorCriteria.byId(doctorId));
    if (!doctor) {
      throw new DoctorNotFoundError(doctorId);
    }

    doctor.savePrice(input);

    await this.repository.savePrices(doctor.id.value, doctor.prices ?? []);
  }
}
