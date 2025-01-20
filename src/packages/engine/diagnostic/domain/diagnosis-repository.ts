import { Pathology } from './pathology';

export interface DiagnosisRepository {
  getPathologies(): Promise<Pathology[]>;
}
