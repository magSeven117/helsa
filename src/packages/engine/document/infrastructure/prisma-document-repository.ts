import { PrismaClient } from '@helsa/database';
import { DocumentRepository } from '../domain/document-repository';
import { Document } from '../domain/document';

export class PrismaDocumentRepository implements DocumentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get model() {
    return this.prisma.medicalDocument;
  }

  async save(document: Document): Promise<void> {
    await this.model.upsert({
      where: { id: document.id.value },
      create: { ...document.toPrimitives() },
      update: { ...document.toPrimitives() },
    });
  }
}
