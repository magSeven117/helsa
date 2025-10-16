import { Primitives } from '@helsa/ddd/types/primitives';
import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';

export class CreateDoctor {
  constructor(private repository: DoctorRepository) {}
  async run(data: Primitives<Doctor>): Promise<void> {
    const doctor = Doctor.create(data.id, data.userId, data.licenseMedicalNumber, data.specialtyId);
    await this.repository.save(doctor);
    // Obtener el doctor persistido por userId para asegurar el id correcto al crear el schedule
    const persisted = await this.repository.getByCriteria(
      Criteria.fromValues([{ field: 'userId', value: data.userId, operator: Operator.EQUAL }]),
    );
    await this.repository.saveSchedule(persisted.id.value, persisted.schedule);
  }
}
