import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Patient } from '../../domain/patient';
import { PatientCriteria } from '../../domain/patient-criteria';
import { PatientRepository } from '../../domain/patient-repository';

export class CreatePatient {
  constructor(private patientRepository: PatientRepository) {}
  
  async run(data: Primitives<Patient>) {
    const exist = await this.patientRepository.find(PatientCriteria.getByUserId(data.userId));
    
    if (exist) {
      throw new FormatError('Patient already exists');
    }
    
    const patient = Patient.create(
      Uuid.random().value, 
      data.userId, 
      data.demographic, 
      data.biometric
    );
    
    await this.patientRepository.save(patient);
  }
}
