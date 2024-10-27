import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { RoomCoordinates } from './room-coordinates';

export class ConsultingRoomAddress {
  constructor(
    public id: Uuid,
    public city: StringValueObject,
    public address: StringValueObject,
    public roomCoordinates: RoomCoordinates
  ) {}

  public static create(
    city: string,
    address: string,
    roomCoordinates: Primitives<RoomCoordinates>
  ): ConsultingRoomAddress {
    return new ConsultingRoomAddress(
      Uuid.random(),
      new StringValueObject(city),
      new StringValueObject(address),
      RoomCoordinates.fromPrimitives(roomCoordinates)
    );
  }

  static fromPrimitives(data: Primitives<ConsultingRoomAddress>) {
    return new ConsultingRoomAddress(
      new Uuid(data.id),
      new StringValueObject(data.city),
      new StringValueObject(data.address),
      RoomCoordinates.fromPrimitives(data.roomCoordinates)
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      city: this.city.value,
      address: this.address.value,
      roomCoordinates: this.roomCoordinates.toPrimitives(),
    };
  }

  public static initialize(): ConsultingRoomAddress {
    return ConsultingRoomAddress.create('', '', {
      latitude: 0,
      longitude: 0,
    });
  }
}
