import SignInForm from '@/src/components/auth/sign-in-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
