import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentRepository } from '../domain/appointment-repository';
import { Symptom } from '../domain/symptom';

export class GetSymptoms {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(): Promise<Primitives<Symptom>[]> {
    const symptoms = await this.repository.getSymptoms();
    return symptoms.map((s) => s.toPrimitives());
  }
}
