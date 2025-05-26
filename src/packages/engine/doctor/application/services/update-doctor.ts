import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';

export class UpdateDoctor {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(doctorId: string, doctorData: Partial<Primitives<Doctor>>) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }]),
    );
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    const updatedDoctor = doctor.update(doctorData);
    await this.doctorRepository.save(updatedDoctor);
  }
}
