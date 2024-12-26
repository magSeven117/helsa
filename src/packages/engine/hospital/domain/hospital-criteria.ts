import { Criteria, Operator } from '@helsa/ddd/core/criteria';

export class HospitalCriteria {
  static findByAdminId(adminId: string) {
    return Criteria.fromValues([{ field: 'adminId', value: adminId, operator: Operator.EQUAL }]);
  }
}
