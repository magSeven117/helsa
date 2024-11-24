import { EventBus } from '@/modules/shared/domain/core/domain-event';

import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { UserEmail } from '../domain/user-email';

export class RegisterUser {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}
  async run(id: string, email: string, role: string, name: string) {
    const existing = await this.repository.findByEmail(new UserEmail(email));
    if (existing) {
      return;
    }
    const user = User.Create(id, email, role, name);
    await this.repository.save(user);
  }
}
