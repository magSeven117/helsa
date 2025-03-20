import RecoveryPasswordForm from '@/src/components/auth/recovery-password-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
