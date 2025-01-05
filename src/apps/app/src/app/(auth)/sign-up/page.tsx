import dynamic from 'next/dynamic';
const SignUpForm = dynamic(() => import('@/src/components/auth/sign-up-form').then((m) => m.default), {
  ssr: false,
});
export default function Page({ params }: { params: { userId: string } }) {
  return <SignUpForm></SignUpForm>;
}
