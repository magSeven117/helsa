import { getCurrentUser } from '@/src/actions/user/get-current-user';
import RecoveryPasswordForm from '@/src/components/auth/recovery-password-form';

const Page = async () => {
  await getCurrentUser();
  return <RecoveryPasswordForm />;
};

export default Page;
