import { StringValueObject } from '@helsa/ddd/core/value-object';
import { Enum } from '@helsa/ddd/core/value-objects/enum';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class PatientContact {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public phone: StringValueObject,
    public relationship: ContactRelationship
  ) {}

  static fromPrimitives(data: Primitives<PatientContact>): PatientContact {
    return new PatientContact(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.phone),
      new ContactRelationship(data.relationship)
    );
  }

  toPrimitives(): Primitives<PatientContact> {
    return {
      id: this.id.toString(),
      name: this.name.value,
      phone: this.phone.value,
      relationship: this.relationship.value,
    };
  }
}

export enum ContactRelationships {
  Father = 'Father',
  Mother = 'Mother',
  Brother = 'Brother',
  Sister = 'Sister',
  Grandfather = 'Grandfather',
  Grandmother = 'Grandmother',
  Uncle = 'Uncle',
  Aunt = 'Aunt',
  Cousin = 'Cousin',
  Other = 'Other',
}

export class ContactRelationship extends Enum<ContactRelationships> {
  constructor(value: ContactRelationships) {
    super(value, Object.values(ContactRelationships));
  }
}
