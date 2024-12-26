import { Criteria, Operator } from '@helsa/ddd/core/criteria';

export class DoctorCriteria {
  static byId(id: string): Criteria {
    return Criteria.fromValues([{ field: 'id', value: id, operator: Operator.EQUAL }]);
  }
}
