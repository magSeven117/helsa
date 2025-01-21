import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DiagnosisStatus } from './diagnosis-status';
import { DiagnosisType, DiagnosisTypeValues } from './diagnosis-type';

export class Diagnostic extends Aggregate {
  constructor(
    id: Uuid,
    public description: StringValueObject,
    public type: DiagnosisType,
    public status: DiagnosisStatus,
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
      status: this.status.value,
      patientId: this.patientId.value,
      doctorId: this.doctorId.value,
      appointmentId: this.appointmentId.value,
      pathologyId: this.pathologyId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(params: Primitives<Diagnostic>): Diagnostic {
    return new Diagnostic(
      new Uuid(params.id),
      new StringValueObject(params.description),
      new DiagnosisType(params.type),
      new DiagnosisStatus(params.status),
      new Uuid(params.patientId),
      new Uuid(params.doctorId),
      new Uuid(params.appointmentId),
      new Uuid(params.pathologyId),
      new DateValueObject(params.createdAt),
      new DateValueObject(params.updatedAt)
    );
  }

  static Create(
    id: string,
    description: string,
    type: DiagnosisTypeValues,
    patientId: string,
    doctorId: string,
    appointmentId: string,
    pathologyId: string
  ) {
    return new Diagnostic(
      new Uuid(id),
      new StringValueObject(description),
      new DiagnosisType(type),
      DiagnosisStatus.Active(),
      new Uuid(patientId),
      new Uuid(doctorId),
      new Uuid(appointmentId),
      new Uuid(pathologyId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
