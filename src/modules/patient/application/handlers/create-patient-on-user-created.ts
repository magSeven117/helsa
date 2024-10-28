import { UserCreated } from '@/modules/user/domain/user-created';
import { CreatePatient } from '../services/create-patient';

export class CreatePatientOnUserCreated {
  constructor(private createPatient: CreatePatient) {}
  async handle(event: UserCreated) {
    if (event.aggregate.role !== 'PATIENT') return;
    await this.createPatient.run({
      userId: event.aggregate.userId,
    });
  }
}
