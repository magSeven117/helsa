import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { User } from './user';
import { UserEmail } from './user-email';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findById(id: Uuid): Promise<User | null>;
  findByExternalId(externalId: string): Promise<User | null>;
  delete(id: Uuid): Promise<void>;
}
