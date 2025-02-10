import { NumberValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class AppointmentTelemetry {
  constructor(
    public id: Uuid,
    public weight: NumberValueObject,
    public temperature: NumberValueObject,
    public bloodPressure: NumberValueObject,
    public heartRate: NumberValueObject,
    public respiratoryRate: NumberValueObject,
    public oxygenSaturation: NumberValueObject,
    public appointmentId: Uuid
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      weight: this.weight.value,
      temperature: this.temperature.value,
      bloodPressure: this.bloodPressure.value,
      heartRate: this.heartRate.value,
      respiratoryRate: this.respiratoryRate.value,
      oxygenSaturation: this.oxygenSaturation.value,
      appointmentId: this.appointmentId.toString(),
    };
  }

  static fromPrimitives(data: Primitives<AppointmentTelemetry>): AppointmentTelemetry {
    return new AppointmentTelemetry(
      new Uuid(data.id),
      new NumberValueObject(data.weight),
      new NumberValueObject(data.temperature),
      new NumberValueObject(data.bloodPressure),
      new NumberValueObject(data.heartRate),
      new NumberValueObject(data.respiratoryRate),
      new NumberValueObject(data.oxygenSaturation),
      new Uuid(data.appointmentId)
    );
  }

  static create(
    weight: number,
    temperature: number,
    bloodPressure: number,
    heartRate: number,
    respiratoryRate: number,
    oxygenSaturation: number,
    appointmentId: Uuid
  ): AppointmentTelemetry {
    return new AppointmentTelemetry(
      Uuid.random(),
      new NumberValueObject(weight),
      new NumberValueObject(temperature),
      new NumberValueObject(bloodPressure),
      new NumberValueObject(heartRate),
      new NumberValueObject(respiratoryRate),
      new NumberValueObject(oxygenSaturation),
      appointmentId
    );
  }
}
