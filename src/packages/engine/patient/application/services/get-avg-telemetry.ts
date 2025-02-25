import { PatientRepository } from '../../domain/patient-repository';

export class GetAvgTelemetryService {
  constructor(private readonly repository: PatientRepository) {}

  async run(userId: string) {
    const vitals = await this.repository.getVitals(userId);
    const avg = vitals.reduce(
      (acc, val) => {
        acc.weight += val.weight.value;
        acc.temperature += val.temperature.value;
        acc.bloodPressure += val.bloodPressure.value;
        acc.heartRate += val.heartRate.value;
        acc.respiratoryRate += val.respiratoryRate.value;
        acc.oxygenSaturation += val.oxygenSaturation.value;
        return acc;
      },
      {
        weight: 0,
        temperature: 0,
        bloodPressure: 0,
        heartRate: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
      }
    );
    return {
      weight: avg.weight / vitals.length,
      temperature: avg.temperature / vitals.length,
      bloodPressure: avg.bloodPressure / vitals.length,
      heartRate: avg.heartRate / vitals.length,
      respiratoryRate: avg.respiratoryRate / vitals.length,
      oxygenSaturation: avg.oxygenSaturation / vitals.length,
    };
  }
}
