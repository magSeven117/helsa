export const dynamic = 'force-dynamic';
import RecoveryPasswordForm from '@/src/modules/auth/components/recovery-password-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
