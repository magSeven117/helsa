export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import SignInForm from './form';

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
