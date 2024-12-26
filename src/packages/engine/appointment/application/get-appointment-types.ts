import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentType } from '../domain/appointment-type';

export class GetAppointmentTypes {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(): Promise<Primitives<AppointmentType>[]> {
    try {
      const types = await this.repository.getTypes();

      return types.map((type) => type.toPrimitives());
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
