import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string): Promise<Primitives<User | null>> {
    const user = await this.userRepository.findByExternalId(userId);
    if (!user) {
      return null;
    }
    return user.toPrimitives();
  }
}
