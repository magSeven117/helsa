import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { HospitalAddress } from './hospital-address';

export class Hospital extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
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
      name: this.name.value,
      address: this.address.toPrimitives(),
      adminId: this.adminId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Hospital>): Hospital {
    return new Hospital(
      new Uuid(primitives.id),
      new StringValueObject(primitives.name),
      HospitalAddress.fromPrimitives(primitives.address),
      new Uuid(primitives.adminId),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static create(adminId: string, name: string, address: Partial<Primitives<HospitalAddress>>): Hospital {
    return new Hospital(
      Uuid.random(),
      new StringValueObject(name),
      HospitalAddress.create(address.street, address.city, address.country, address.zipCode, address.coordinates),
      new Uuid(adminId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  update(data: Partial<Primitives<Hospital>>): void {
    this.name = data.name ? new StringValueObject(data.name) : this.name;
    this.address = data.address ? this.address.update(data.address) : this.address;
    this.updatedAt = DateValueObject.today();
  }
}
