import { NumberValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';

export class AppointmentTelemetry {
  constructor(
    public id: Uuid,
    public weight: NumberValueObject,
    public temperature: NumberValueObject,
    public bloodPressure: NumberValueObject,
    public heartRate: NumberValueObject,
    public appointmentId: Uuid
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      weight: this.weight.value,
      temperature: this.temperature.value,
      bloodPressure: this.bloodPressure.value,
      heartRate: this.heartRate.value,
      appointmentId: this.appointmentId.toString(),
    };
  }

  static fromPrimitives(data: any): AppointmentTelemetry {
    return new AppointmentTelemetry(
      new Uuid(data.id),
      new NumberValueObject(data.weight),
      new NumberValueObject(data.temperature),
      new NumberValueObject(data.bloodPressure),
      new NumberValueObject(data.heartRate),
      new Uuid(data.appointmentId)
    );
  }

  static create(
    weight: number,
    temperature: number,
    bloodPressure: number,
    heartRate: number,
    appointmentId: Uuid
  ): AppointmentTelemetry {
    return new AppointmentTelemetry(
      Uuid.random(),
      new NumberValueObject(weight),
      new NumberValueObject(temperature),
      new NumberValueObject(bloodPressure),
      new NumberValueObject(heartRate),
      appointmentId
    );
  }
}
