import { getCurrentUser } from '@/src/actions/user/get-current-user';
import SignUpForm from '@/src/components/auth/sign-up-form';

export default async function Page({ params }: { params: { userId: string } }) {
  await getCurrentUser();
  return <SignUpForm></SignUpForm>;
}
