import { OptionalString, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class MedicalReference {
  constructor(
    public id: Uuid,
    public reason: StringValueObject,
    public observation: OptionalString,
    public referencedId: Uuid,
    public recipeId: Uuid
  ) {}

  static fromPrimitives(data: Primitives<MedicalReference>): MedicalReference {
    return new MedicalReference(
      new Uuid(data.id),
      new StringValueObject(data.reason),
      new OptionalString(data.observation),
      new Uuid(data.referencedId),
      new Uuid(data.recipeId)
    );
  }

  toPrimitives(): Primitives<MedicalReference> {
    return {
      id: this.id.toString(),
      reason: this.reason.value,
      observation: this.observation.value,
      referencedId: this.referencedId.toString(),
      recipeId: this.recipeId.toString(),
    };
  }

  static create(reason: string, observation: string | null, referencedId: string, recipeId: string): MedicalReference {
    return new MedicalReference(
      Uuid.random(),
      new StringValueObject(reason),
      new OptionalString(observation),
      new Uuid(referencedId),
      new Uuid(recipeId)
    );
  }
}
