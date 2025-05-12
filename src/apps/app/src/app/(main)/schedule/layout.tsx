import { getSession } from '@helsa/auth/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Layout = async ({ doctor, patient }: { doctor: React.ReactNode; patient: React.ReactNode }) => {
  const session = await getSession();
  if (!session) return redirect('/sign-in');
  return (
    <>
      {session.user.role === 'PATIENT' && patient}
      {session.user.role === 'DOCTOR' && doctor}
    </>
  );
};

export default Layout;
