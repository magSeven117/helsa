import { NotFoundError } from "@/modules/shared/domain/core/errors/NotFoundError";
import { Uuid } from "@/modules/shared/domain/core/value-objects/Uuid";
import { Primitives } from "@/modules/shared/domain/types/Primitives";
import { PrismaClient } from "@/modules/shared/infrastructure/persistence/prisma/generated/client";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserRepository } from "../domain/UserRepository";

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
      throw new NotFoundError("User not found");
    }
    return User.fromPrimitives(user as Primitives<User>);
  }
  async findById(id: Uuid): Promise<User> {
    const user = await this.model.findFirst({
      where: { id: id.value },
    });
    if (!user) {
      throw new NotFoundError("User not found");
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
      throw new NotFoundError("User not found");
    }
    return User.fromPrimitives(user as Primitives<User>);
  }
}
