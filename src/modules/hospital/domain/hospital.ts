import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { HospitalAddress } from './hospital-address';

export class Hospital extends Aggregate {
  constructor(
    id: Uuid,
    public address: HospitalAddress,
    public adminId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Hospital> {
    return {
      id: this.id.value,
      address: this.address.toPrimitives(),
      adminId: this.adminId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Hospital>): Hospital {
    return new Hospital(
      new Uuid(primitives.id),
      HospitalAddress.fromPrimitives(primitives.address),
      new Uuid(primitives.adminId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static create(adminId: string) {
    return new Hospital(
      Uuid.random(),
      HospitalAddress.create(),
      new Uuid(adminId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
