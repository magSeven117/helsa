export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import RecoveryPasswordForm from './form';

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
