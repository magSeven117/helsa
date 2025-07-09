export const dynamic = 'force-dynamic';
import SignInForm from '@/src/modules/auth/components/sign-in-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
