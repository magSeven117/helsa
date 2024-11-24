import SignUpForm from './sign-up-form';

export default function Page({ params }: { params: { userId: string } }) {
  return <SignUpForm></SignUpForm>;
}
