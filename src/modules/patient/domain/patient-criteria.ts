import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';

export class PatientCriteria {
  static getByUserId(userId: string): Criteria {
    return Criteria.fromValues([{ field: 'userId', value: userId, operator: Operator.EQUAL }]);
  }
}
