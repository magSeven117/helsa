import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Latitude } from '@/modules/shared/domain/core/value-objects/latitude';
import { Longitude } from '@/modules/shared/domain/core/value-objects/longitude';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class HospitalAddress {
  constructor(
    public id: Uuid,
    public street: StringValueObject,
    public city: StringValueObject,
    public country: StringValueObject,
    public zipCode: StringValueObject,
    public coordinates: HospitalAddressCoordinates
  ) {}

  toPrimitives(): Primitives<HospitalAddress> {
    return {
      id: this.id.value,
      street: this.street.value,
      city: this.city.value,
      country: this.country.value,
      zipCode: this.zipCode.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }

  static fromPrimitives(primitives: Primitives<HospitalAddress>): HospitalAddress {
    return new HospitalAddress(
      new Uuid(primitives.id),
      new StringValueObject(primitives.street),
      new StringValueObject(primitives.city),
      new StringValueObject(primitives.country),
      new StringValueObject(primitives.zipCode),
      HospitalAddressCoordinates.fromPrimitives(primitives.coordinates)
    );
  }

  static create(): HospitalAddress {
    return new HospitalAddress(
      Uuid.random(),
      new StringValueObject('N/D'),
      new StringValueObject('N/D'),
      new StringValueObject('N/D'),
      new StringValueObject('N/D'),
      new HospitalAddressCoordinates(new Latitude(0), new Longitude(0))
    );
  }
}

export class HospitalAddressCoordinates {
  constructor(public latitude: Latitude, public longitude: Longitude) {}

  toPrimitives(): Primitives<HospitalAddressCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }

  static fromPrimitives(primitives: Primitives<HospitalAddressCoordinates>): HospitalAddressCoordinates {
    return new HospitalAddressCoordinates(new Latitude(primitives.latitude), new Longitude(primitives.longitude));
  }
}
