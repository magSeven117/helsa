export const dynamic = 'force-dynamic';
import RecoveryPasswordForm from '@/src/components/auth/recover-password-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <RecoveryPasswordForm />
    </Suspense>
  );
}
export const metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera tu contraseña para acceder a tu cuenta de Helsa.',
};
