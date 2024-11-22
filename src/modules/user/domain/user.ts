import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject, OptionalString, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { UserEmail } from './user-email';
import { UserRole, UserRoleValue } from './user-role';

export class User extends Aggregate {
  constructor(
    id: Uuid,
    public externalId: StringValueObject,
    public email: UserEmail,
    public role: UserRole,
    public fullName: OptionalString,
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
    fullName: string,
    additionalData: Record<string, any>
  ): User {
    const user = new User(
      new Uuid(id),
      new StringValueObject(externalId),
      new UserEmail(email),
      new UserRole(role as UserRoleValue),
      new OptionalString(fullName),
      DateValueObject.today(),
      DateValueObject.today()
    );

    return user;
  }

  public static Doctor(id: string, externalId: string, email: string, name: string): User {
    return new User(
      new Uuid(id),
      new StringValueObject(externalId),
      new UserEmail(email),
      UserRole.Doctor(),
      new OptionalString(name),
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
      new OptionalString(data.fullName),
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
      fullName: this.fullName.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  updateRole(role: UserRoleValue) {
    this.role = new UserRole(role);
  }
}
