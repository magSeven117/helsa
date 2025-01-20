import { PrismaClient } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisRepository } from '../domain/diagnosis-repository';
import { Pathology } from '../domain/pathology';

export class PrismaDiagnosisRepository implements DiagnosisRepository {
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.diagnostic;
  }

  async getPathologies(): Promise<Pathology[]> {
    const results = await this.client.pathology.findMany();
    return results.map((pathology) => Pathology.fromPrimitives(pathology as unknown as Primitives<Pathology>));
  }
}
