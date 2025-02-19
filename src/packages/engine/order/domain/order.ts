import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { OrderStatus, OrderType } from './enum-types';

export class Order extends Aggregate {
  constructor(
    id: Uuid,
    public description: StringValueObject,
    public type: OrderType,
    public status: OrderStatus,
    public appointmentId: Uuid,
    public patientId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Order> {
    return {
      id: this.id.toString(),
      description: this.description.value,
      type: this.type.value,
      status: this.status.value,
      appointmentId: this.appointmentId.toString(),
      patientId: this.patientId.toString(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Order>): Order {
    return new Order(
      new Uuid(data.id),
      new StringValueObject(data.description),
      OrderType.fromString(data.type),
      OrderStatus.fromString(data.status),
      new Uuid(data.appointmentId),
      new Uuid(data.patientId),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(
    id: string,
    description: string,
    type: string,
    status: string,
    appointmentId: string,
    patientId: string
  ): Order {
    return new Order(
      new Uuid(id),
      new StringValueObject(description),
      OrderType.fromString(type),
      OrderStatus.fromString(status),
      new Uuid(appointmentId),
      new Uuid(patientId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
