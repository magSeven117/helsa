import { ping } from '@/src/actions/server-ping';
import RecoveryPasswordForm from '@/src/components/auth/recovery-password-form';

export default async function Page() {
  await ping();
  return <RecoveryPasswordForm />;
}
