import { getSession } from '@helsa/auth/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Helsa',
};

const Layout = async ({
  doctor,
  patient,
  hospital,
}: {
  doctor: React.ReactNode;
  patient: React.ReactNode;
  hospital: React.ReactNode;
}) => {
  const session = await getSession();
  const user = session?.user ?? null;
  if (!user) {
    return redirect('/sign-in');
  }
  if (user.role === 'UNDEFINED') {
    return redirect(`/select-role?userId=${user.id}`);
  }
  return (
    <div className="flex flex-col items-start w-full">
      {user.role === 'DOCTOR' && doctor}
      {user.role === 'PATIENT' && patient}
      {user.role === 'HOSPITAL' && hospital}
    </div>
  );
};

export default Layout;
