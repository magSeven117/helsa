import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum OrderTypeValues {
  TEST = 'TEST',
  ATTENDANCE = 'ATTENDANCE',
}
export class OrderType extends Enum<OrderTypeValues> {
  constructor(value: OrderTypeValues) {
    super(value, Object.values(OrderTypeValues));
  }

  public static fromString(value: string): OrderType {
    return new OrderType(value as OrderTypeValues);
  }

  static Test(): OrderType {
    return new OrderType(OrderTypeValues.TEST);
  }

  static Attendance(): OrderType {
    return new OrderType(OrderTypeValues.ATTENDANCE);
  }
}

export enum OrderStatusValues {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class OrderStatus extends Enum<OrderStatusValues> {
  constructor(value: OrderStatusValues) {
    super(value, Object.values(OrderStatusValues));
  }

  public static fromString(value: string): OrderStatus {
    return new OrderStatus(value as OrderStatusValues);
  }

  static Pending(): OrderStatus {
    return new OrderStatus(OrderStatusValues.PENDING);
  }

  static Completed(): OrderStatus {
    return new OrderStatus(OrderStatusValues.COMPLETED);
  }

  static Canceled(): OrderStatus {
    return new OrderStatus(OrderStatusValues.CANCELED);
  }
}
