import { Criteria } from '@helsa/ddd/core/criteria';
import { Diagnostic } from './diagnostic';
import { Pathology } from './pathology';

export interface DiagnosisRepository {
  getPathologies(): Promise<Pathology[]>;
  save(diagnosis: Diagnostic): Promise<void>;
  search(criteria: Criteria): Promise<Diagnostic[]>;
  get(criteria: Criteria): Promise<Diagnostic | null>;
}
