import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DocumentType, DocumentTypeValues } from './document-type';
export class Document extends Aggregate {
  constructor(
    id: Uuid,
    public documentType: DocumentType,
    public description: StringValueObject,
    public url: StringValueObject,
    public fileName: StringValueObject,
    public patientId: Uuid,
    public appointmentId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Document> {
    return {
      id: this.id.value,
      documentType: this.documentType.value,
      description: this.description.value,
      url: this.url.value,
      fileName: this.fileName.value,
      patientId: this.patientId.value,
      appointmentId: this.appointmentId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(params: Primitives<Document>): Document {
    return new Document(
      new Uuid(params.id),
      new DocumentType(params.documentType),
      new StringValueObject(params.description),
      new StringValueObject(params.url),
      new StringValueObject(params.fileName),
      new Uuid(params.patientId),
      new Uuid(params.appointmentId),
      new DateValueObject(params.createdAt),
      new DateValueObject(params.updatedAt)
    );
  }

  static Create(
    id: string,
    documentType: DocumentTypeValues,
    description: string,
    url: string,
    fileName: string,
    patientId: string,
    appointmentId: string
  ) {
    return new Document(
      new Uuid(id),
      new DocumentType(documentType),
      new StringValueObject(description),
      new StringValueObject(url),
      new StringValueObject(fileName),
      new Uuid(patientId),
      new Uuid(appointmentId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
