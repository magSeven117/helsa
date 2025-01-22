import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisRepository } from '../domain/diagnosis-repository';
import { Pathology } from '../domain/pathology';

export class GetPathologies {
  constructor(private readonly repository: DiagnosisRepository) {}

  async run(): Promise<Primitives<Pathology>[]> {
    const results = await this.repository.getPathologies();
    return results.map((pathology) => pathology.toPrimitives());
  }
}
