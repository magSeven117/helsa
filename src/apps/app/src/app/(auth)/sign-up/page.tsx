import SignUpForm from '@/src/components/auth/sign-up-form';

export default function Page({ params }: { params: { userId: string } }) {
  return <SignUpForm></SignUpForm>;
}
