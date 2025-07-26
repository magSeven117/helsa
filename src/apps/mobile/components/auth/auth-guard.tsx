import { useSession } from '@helsa/auth/mobile';
import { Stack } from 'expo-router';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();

  return <Stack.Protected guard={!!data}>{children}</Stack.Protected>;
};

export default AuthGuard;
