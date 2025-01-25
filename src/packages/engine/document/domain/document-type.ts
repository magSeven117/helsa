
import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum DocumentTypeValues {
    MEDICAL_RECORD= 'MEDICAL_RECORD',
    PRESCRIPTION = 'PRESCRIPTION',
    LABORATORY_RESULT= 'LABORATORY_RESULT',
    IMAGE=  'IMAGE',
    RADIOLOGY= 'RADIOLOGY',
    OTHER= 'OTHER'
}

export class DocumentType extends Enum<DocumentTypeValues> {
  constructor(value: DocumentTypeValues) {
    super(value, Object.values(DocumentTypeValues));
  }
}
