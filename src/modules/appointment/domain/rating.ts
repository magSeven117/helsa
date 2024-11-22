import { NumberValueObject, OptionalString } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class AppointmentRating {
  constructor(
    public id: Uuid,
    public appointmentId: Uuid,
    public rating: NumberValueObject,
    public comment: OptionalString
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      appointmentId: this.appointmentId.toString(),
      rating: this.rating.value,
      comment: this.comment?.value,
    };
  }

  static fromPrimitives(data: Primitives<AppointmentRating>): AppointmentRating {
    return new AppointmentRating(
      new Uuid(data.id),
      new Uuid(data.appointmentId),
      new NumberValueObject(data.rating),
      new OptionalString(data.comment)
    );
  }

  static create(rating: number, appointmentId: Uuid, comment?: string): AppointmentRating {
    return new AppointmentRating(
      Uuid.random(),
      appointmentId,
      new NumberValueObject(rating),
      new OptionalString(comment)
    );
  }
}
