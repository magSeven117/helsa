import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { BooleanValueObject, DateValueObject, StringValueObject } from '@/modules/shared/domain/core/ValueObject';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { UserEmail } from './UserEmail';
import { UserRole, UserRoleValue } from './UserRole';
import { UserCreated } from './user-created';

export class User extends Aggregate {
  constructor(
    id: Uuid,
    public externalId: StringValueObject,
    public email: UserEmail,
    public role: UserRole,
    public onboarded: BooleanValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  public static Create(
    id: string,
    externalId: string,
    email: string,
    role: string,
    additionalData: Record<string, any>
  ): User {
    const user = new User(
      new Uuid(id),
      new StringValueObject(externalId),
      new UserEmail(email),
      new UserRole(role as UserRoleValue),
      new BooleanValueObject(false),
      DateValueObject.today(),
      DateValueObject.today()
    );
    user.record(
      new UserCreated({
        userId: user.id.value,
        role: user.role.value,
        additionalData,
      })
    );

    return user;
  }

  public static Doctor(id: string, externalId: string, email: string): User {
    return new User(
      new Uuid(id),
      new StringValueObject(externalId),
      new UserEmail(email),
      UserRole.Doctor(),
      new BooleanValueObject(false),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  public static fromPrimitives(data: Primitives<User>) {
    return new User(
      new Uuid(data.id),
      new StringValueObject(data.externalId),
      new UserEmail(data.email),
      new UserRole(data.role),
      new BooleanValueObject(data.onboarded),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      externalId: this.externalId.value,
      email: this.email.value,
      role: this.role.value,
      onboarded: this.onboarded.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
