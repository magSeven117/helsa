import { UserCreated } from '@/modules/user/domain/user-created';
import { CreateDoctor } from '../services/create-doctor';

export class CreateDoctorOnUserCreated {
  constructor(private createDoctor: CreateDoctor) {}
  async handle(event: UserCreated) {
    if (event.aggregate.role !== 'DOCTOR') return;
    await this.createDoctor.run({
      userId: event.aggregate.userId,
      licenseMedicalNumber: event.aggregate.additionalData.licenseMedicalNumber,
      specialtyId: event.aggregate.additionalData.specialtyId,
    });
  }
}
