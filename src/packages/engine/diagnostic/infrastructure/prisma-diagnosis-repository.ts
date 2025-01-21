import { PrismaClient } from '@helsa/database';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisRepository } from '../domain/diagnosis-repository';
import { Diagnostic } from '../domain/diagnostic';
import { Pathology } from '../domain/pathology';

export class PrismaDiagnosisRepository implements DiagnosisRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.diagnostic;
  }

  async getPathologies(): Promise<Pathology[]> {
    const results = await this.client.pathology.findMany();
    return results.map((pathology) => Pathology.fromPrimitives(pathology as unknown as Primitives<Pathology>));
  }

  async save(diagnosis: Diagnostic): Promise<void> {
    await this.model.upsert({
      where: { id: diagnosis.id.value },
      create: { ...diagnosis.toPrimitives() },
      update: { ...diagnosis.toPrimitives() },
    });
  }

  async search(criteria: Criteria): Promise<Diagnostic[]> {
    const { where, skip, take, include, orderBy } = this.converter.criteria(criteria);
    const response = await this.model.findMany({ where, take, skip, include, orderBy });
    return response.map((diagnostic) => Diagnostic.fromPrimitives(diagnostic as Primitives<Diagnostic>));
  }

  async get(criteria: Criteria): Promise<Diagnostic | null> {
    const { where } = this.converter.criteria(criteria);
    const response = await this.model.findUnique({ where });
    return response ? Diagnostic.fromPrimitives(response as Primitives<Diagnostic>) : null;
  }
}
