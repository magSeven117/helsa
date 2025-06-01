import { BooleanValueObject, DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';

export class Subscription {
  constructor(
    public id: Uuid,
    public userId: Uuid,
    public plan: StringValueObject,
    public status: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject,
    public trialEndDate: DateValueObject,
    public trial: BooleanValueObject,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject,
  ) {}
}
