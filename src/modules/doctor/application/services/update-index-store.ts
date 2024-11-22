import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { GetUser } from '@/modules/user/application/get-user';
import { User } from '@/modules/user/domain/user';
import { DoctorIndexStore } from '../../domain/doctor-index-store';
import { DoctorRepository } from '../../domain/doctor-repository';

export class UpdateIndexStore {
  constructor(
    private doctorRepository: DoctorRepository,
    private doctorIndexStore: DoctorIndexStore,
    private getUser: GetUser
  ) {}

  async run(doctorId: string) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );
    const user = await this.getUser.run(doctor.userId.toString());

    await this.doctorIndexStore.save(doctor, User.fromPrimitives(user), []);
  }
}
