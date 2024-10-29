import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';

export class HospitalCriteria {
  static findByAdminId(adminId: string) {
    return Criteria.fromValues([{ field: 'adminId', value: adminId, operator: Operator.EQUAL }]);
  }
}
