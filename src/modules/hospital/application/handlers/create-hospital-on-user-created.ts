import { UserCreated } from '@/modules/user/domain/user-created';
import { CreateHospital } from '../services/create-hospital';

export class CreateHospitalOnUserCreated {
  constructor(private creator: CreateHospital) {}

  async handle(event: UserCreated) {
    if (event.aggregate.role !== 'HOSPITAL') return;
    await this.creator.run(event.aggregate.userId);
  }
}
