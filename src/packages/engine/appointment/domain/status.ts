import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum AppointmentStatusEnum {
  SCHEDULED = 'SCHEDULED',
  RESCHEDULED = 'RESCHEDULED',
  CONFIRMED = 'CONFIRMED',
  LATE = 'LATE',
  CANCELLED = 'CANCELLED',
  WAITING_DOCTOR = 'WAITING_DOCTOR',
  WAITING_PATIENT = 'WAITING_PATIENT',
  STARTED = 'STARTED',
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
  public static rescheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.RESCHEDULED);
  }
  public static late(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.LATE);
  }
  public static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CANCELLED);
  }
  public static waitingDoctor(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.WAITING_DOCTOR);
  }
  public static waitingPatient(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.WAITING_PATIENT);
  }
  public static started(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.STARTED);
  }
  public static missed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.MISSED);
  }
  public static finished(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.FINISHED);
  }

  public static confirmed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CONFIRMED);
  }
}
