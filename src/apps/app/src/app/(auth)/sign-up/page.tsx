import { ping } from '@/src/actions/server-ping';
import SignUpForm from '@/src/components/auth/sign-up-form';

export default async function Page() {
  await ping();
  return <SignUpForm />;
}
