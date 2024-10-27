import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/DomainEvent';
export type UserCreatedPrimitives = {
  userId: string;
  role: string;
};
export class UserCreated extends DomainEvent {
  static EVENT_NAME = 'user/created';
  constructor(params: { userId: string; role: string; additionalData: Record<string, any> }) {
    super(UserCreated.EVENT_NAME, params);
  }

  public toPrimitive(): DomainEventPrimitives {
    return {
      aggregate: this.aggregate,
      id: this.eventId,
      type: this.eventName,
      occurred_on: this.occurredOn.toISOString(),
      extra_data: this.extraData,
    };
  }

  static fromPrimitives(primitives: DomainEventPrimitives): UserCreated {
    return new UserCreated({
      userId: primitives.aggregate.userId as string,
      role: primitives.aggregate.role as string,
      additionalData: primitives.aggregate.additionalData as Record<string, any>,
    });
  }

  public isPublic(): boolean {
    return true;
  }
}
