import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum AppointmentStatusEnum {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  PAYED = 'PAYED',
  READY = 'READY',
  STARTED = 'STARTED',
  CANCELLED = 'CANCELLED',
  MISSED = 'MISSED',
  FINISHED = 'FINISHED',
}

export class AppointmentStatus extends Enum<AppointmentStatusEnum> {
  constructor(status: AppointmentStatusEnum) {
    super(status, Object.values(AppointmentStatusEnum));
  }

  public static scheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.SCHEDULED);
  }
  public static confirmed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CONFIRMED);
  }

  public static payed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.PAYED);
  }
  public static ready(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.READY);
  }
  public static started(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.STARTED);
  }
  public static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CANCELLED);
  }

  public static missed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.MISSED);
  }
  public static finished(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.FINISHED);
  }
}
