import { ping } from '@/src/actions/server-ping';
import SignInForm from '@/src/components/auth/sign-in-form';

export default async function Page() {
  await ping();
  return <SignInForm />;
}
