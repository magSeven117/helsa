import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { UserRepository } from '../domain/user-repository';
import { UserRoleValue } from '../domain/user-role';

export class UpdateRole {
  constructor(private repository: UserRepository) {}
  async run(role: UserRoleValue, userId: string): Promise<void> {
    const user = await this.repository.findById(new Uuid(userId));

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.updateRole(role);
    await this.repository.save(user);
  }
}
