import { Enum } from '@/modules/shared/domain/core/value-objects/Enum';

export enum UserRoleValue {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  UNDEFINED = 'UNDEFINED',
  HOSPITAL = 'HOSPITAL',
}
export class UserRole extends Enum<UserRoleValue> {
  constructor(value: UserRoleValue) {
    super(value, Object.values(UserRoleValue));
  }

  static Undefined(): UserRole {
    return new UserRole(UserRoleValue.UNDEFINED);
  }

  static Doctor(): UserRole {
    return new UserRole(UserRoleValue.DOCTOR);
  }
}
