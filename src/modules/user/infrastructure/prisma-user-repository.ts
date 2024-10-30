import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaClient } from '@prisma/client';
import { User } from '../domain/user';
import { UserEmail } from '../domain/user-email';
import { UserRepository } from '../domain/user-repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  get model() {
    return this.prisma.user;
  }
  async save(user: User): Promise<void> {
    const { id, ...saveData } = user.toPrimitives();
    await this.model.upsert({
      where: { id: user.id.value },
      update: saveData,
      create: user.toPrimitives(),
    });
  }
  async findByEmail(email: UserEmail): Promise<User> {
    const user = await this.model.findFirst({
      where: { email: email.value },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return User.fromPrimitives(user as Primitives<User>);
  }
  async findById(id: Uuid): Promise<User> {
    const user = await this.model.findFirst({
      where: { id: id.value },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return User.fromPrimitives(user as Primitives<User>);
  }
  async delete(id: Uuid): Promise<void> {
    await this.model.delete({ where: { id: id.value } });
  }

  async findByExternalId(externalId: string): Promise<User> {
    const user = await this.model.findFirst({
      where: { externalId },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return User.fromPrimitives(user as Primitives<User>);
  }

  async findAll(): Promise<User[]> {
    const users = await this.model.findMany({
      cursor: { id: '' },
    });
    return users.map((user) => User.fromPrimitives(user as Primitives<User>));
  }
}
