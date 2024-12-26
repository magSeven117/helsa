import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string): Promise<Primitives<User> | null> {
    const user = await this.userRepository.findById(new Uuid(userId));
    if (!user) {
      return null;
    }
    return user.toPrimitives();
  }
}
