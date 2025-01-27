import { Document } from './document';

export interface DocumentRepository {
  save(document: Document): Promise<void>;
}
