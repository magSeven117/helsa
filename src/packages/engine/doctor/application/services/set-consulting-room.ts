import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { ConsultingRoomAddress } from '../../domain/consulting-room-address';
import { DoctorRepository } from '../../domain/doctor-repository';

export class SetConsultingRoom {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(doctorId: string, consultingRoomAddress: Primitives<ConsultingRoomAddress>): Promise<void> {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    doctor.createConsultingRoomAddress(consultingRoomAddress.city, consultingRoomAddress.address);
    await this.doctorRepository.saveConsultingRoomAddress(doctor.id.value, doctor.consultingRoomAddress);
  }
}
