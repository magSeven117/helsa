import { User } from './user';
import { UserRoleValue } from './user-role';

export type Predicate<Data = any> = (user: User, data: Data) => boolean;

export type Policy<Data> = boolean | Predicate<Data>;

export type Permissions<Permission extends string> = {
  [P in Permission]?: Policy<any>;
};

export type Rules<Permission extends string = string> = {
  [key in UserRoleValue]?: Permissions<Permission>;
};

export const checkPermission = <Permission extends string, Data = any>(
  user: User,
  permission: Permission,
  rules: Rules<Permission>,
  data?: Data,
): { hasPermission: boolean; reason?: string } => {
  const userRole = user.role.value;

  const permissions = rules[userRole];

  if (!permissions) {
    return { hasPermission: false, reason: 'No permissions defined for this user role' };
  }

  const policy = permissions[permission];

  if (!policy) {
    return { hasPermission: false, reason: `Permission "${permission}" not defined for role "${userRole}"` };
  }

  if (typeof policy === 'boolean') {
    return { hasPermission: policy };
  }

  if (typeof policy === 'function') {
    const hasPermission = policy(user, data);
    return { hasPermission };
  }

  return {
    hasPermission: false,
    reason: `Invalid policy type for permission "${permission}"`,
  };
};
