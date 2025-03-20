import SignUpForm from '@/src/components/auth/sign-up-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
