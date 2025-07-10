'use client';
import { checkPermission } from '@helsa/engine/user/domain/permissions';
import { usePermissionsContext } from './permissions-provider';
import { useSession } from './session-provider';

export const AllowTo = ({
  children,
  permission,
  data,
}: {
  children: React.ReactNode;
  permission: string;
  data?: any;
}) => {
  const { rules } = usePermissionsContext();
  const { user } = useSession();
  const { hasPermission, reason } = checkPermission(user, permission, rules, data);

  if (!hasPermission) {
    console.warn(`Permission denied for "${permission}": ${reason}`);
    return null;
  }

  return <>{children}</>;
};
