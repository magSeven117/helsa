import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Document } from '../domain/document';
import { DocumentRepository } from '../domain/document-repository';
import { DocumentUploader } from '../domain/document-uploader';
import { DocumentTypeValues } from '../domain/document-type';

export class UploadDocument {
  constructor(private documentRepository: DocumentRepository) {}

  async run({
    url,
    description,
    appointmentId,
    patientId,
    documentType,
    filename,
  }: {
    url: string;
    description: string;
    appointmentId: string;
    patientId: string;
    documentType: string;
    filename: string;
  }): Promise<void> {
    const document = Document.Create(
      Uuid.random().value,
      documentType as DocumentTypeValues,
      description,
      url,
      filename,
      patientId,
      appointmentId
    );
    await this.documentRepository.save(document);
  }
}
