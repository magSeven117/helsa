import { Rules } from '@helsa/engine/user/domain/permissions';
import { createContext, useContext } from 'react';

const PermissionsContext = createContext<{ rules: Rules } | undefined>(undefined);

export const PermissionsProvider = ({ children, rules }: { children: React.ReactNode; rules: Rules }) => {
  return <PermissionsContext.Provider value={{ rules }}>{children}</PermissionsContext.Provider>;
};

export const usePermissionsContext = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
