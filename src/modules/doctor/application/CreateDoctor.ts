import { Doctor } from "../domain/Doctor";
import { DoctorRepository } from "../domain/DoctorRepository";

export class CreateDoctor {
  constructor(private repository: DoctorRepository) {}
  async run(id: string, userId: string, specialtyId: string, licenseNumber: string): Promise<void> {
    const doctor = Doctor.create(id, userId, licenseNumber, specialtyId);
    await this.repository.save(doctor);
  }
}
