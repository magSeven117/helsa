import { Criteria, Operator } from '@helsa/ddd/core/criteria';

export class PatientCriteria {
  static getByUserId(userId: string): Criteria {
    return Criteria.fromValues([{ field: 'userId', value: userId, operator: Operator.EQUAL }]);
  }
}
