import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisType } from './diagnosis-type';

export class Diagnostic extends Aggregate {
  constructor(
    id: Uuid,
    public description: StringValueObject,
    public type: DiagnosisType,
    public patientId: Uuid,
    public doctorId: Uuid,
    public appointmentId: Uuid,
    public pathologyId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Diagnostic> {
    return {
      id: this.id.value,
      description: this.description.value,
      type: this.type.value,
      patientId: this.patientId.value,
      doctorId: this.doctorId.value,
      appointmentId: this.appointmentId.value,
      pathologyId: this.pathologyId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
