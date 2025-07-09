export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import SignUpForm from './form';

export default function Page() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}

export const metadata = {
  title: 'Registrarse',
  description: 'Crea una cuenta en Helsa para acceder a todas las funcionalidades.',
};
