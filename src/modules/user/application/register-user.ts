import { EventBus } from '@/modules/shared/domain/core/DomainEvent';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class RegisterUser {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}
  async run(id: string, externalId: string, email: string, role: string, additionalData: Record<string, any>) {
    const user = User.Create(id, externalId, email, role, additionalData);
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
