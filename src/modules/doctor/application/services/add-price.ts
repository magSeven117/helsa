import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { DoctorCriteria } from '../../domain/doctor-criteria';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Price } from '../../domain/price';

export class AddPrice {
  constructor(private readonly repository: DoctorRepository) {}

  async run(doctorId: string, input: Primitives<Price>): Promise<void> {
    const doctor = await this.repository.getByCriteria(DoctorCriteria.byId(doctorId));
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    doctor.savePrice(input);

    await this.repository.savePrices(doctor.id.value, doctor.prices ?? []);
  }
}
