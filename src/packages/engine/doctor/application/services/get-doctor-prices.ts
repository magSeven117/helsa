import { Primitives } from '@helsa/ddd/types/primitives';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Price } from '../../domain/price';

export class GetDoctorPrices {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(doctorId: string): Promise<Primitives<Price>[]> {
    const prices = await this.doctorRepository.getPrices(doctorId);
    return prices.map((price) => price.toPrimitives());
  }
}
