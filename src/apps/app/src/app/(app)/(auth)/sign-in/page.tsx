export const dynamic = 'force-dynamic';
import SignInForm from '@/src/components/auth/sign-in-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

export const metadata = {
  title: 'Iniciar sesión',
  description: 'Inicia sesión en tu cuenta de Helsa.',
};
