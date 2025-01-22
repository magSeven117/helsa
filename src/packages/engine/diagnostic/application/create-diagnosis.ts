import { DiagnosisRepository } from '../domain/diagnosis-repository';
import { DiagnosisTypeValues } from '../domain/diagnosis-type';
import { Diagnostic } from '../domain/diagnostic';

export class CreateDiagnosis {
  constructor(private readonly repository: DiagnosisRepository) {}

  async run({
    id,
    description,
    type,
    pathologyId,
    patientId,
    doctorId,
    appointmentId,
  }: {
    id: string;
    description: string;
    type: string;
    patientId: string;
    doctorId: string;
    appointmentId: string;
    pathologyId: string;
  }) {
    const diagnosis = Diagnostic.Create(
      id,
      description,
      type as DiagnosisTypeValues,
      patientId,
      doctorId,
      appointmentId,
      pathologyId
    );

    await this.repository.save(diagnosis);
  }
}
