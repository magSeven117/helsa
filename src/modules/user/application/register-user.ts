import { EventBus } from '@/modules/shared/domain/core/domain-event';

import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

export class RegisterUser {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}
  async run(id: string, externalId: string, email: string, role: string, additionalData: Record<string, any>) {
    const existing = await this.repository.findByExternalId(externalId);
    if (existing) {
      return;
    }
    const user = User.Create(id, externalId, email, role, additionalData);
    await this.repository.save(user);
  }
}
