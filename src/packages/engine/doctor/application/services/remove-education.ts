import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { DoctorRepository } from '../../domain/doctor-repository';

export class RemoveEducation {
  constructor(private repository: DoctorRepository) {}

  async run(doctorId: string, educationId: string): Promise<void> {
    const doctor = await this.repository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    await this.repository.removeEducation(doctorId, educationId);
  }
}
