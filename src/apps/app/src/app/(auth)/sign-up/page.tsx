export const dynamic = 'force-dynamic';
import SignUpForm from '@/src/modules/auth/components/sign-up-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
