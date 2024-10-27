import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

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
