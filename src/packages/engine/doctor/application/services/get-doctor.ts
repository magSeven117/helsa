import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';

export class GetDoctor {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(id: string, field = 'userId', include = {}): Promise<Primitives<Doctor> | null> {
    const criteria = Criteria.fromValues([{ field, value: id, operator: Operator.EQUAL }]);
    if (Object.keys(include).length > 0) {
      for (const key in include) {
        criteria.include(key);
      }
    }
    const doctor = await this.doctorRepository.getByCriteria(criteria);

    if (!doctor) {
      return null;
    }

    return doctor.toPrimitives();
  }
}
