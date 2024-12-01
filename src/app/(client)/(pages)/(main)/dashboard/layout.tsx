import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { redirect } from 'next/navigation';

const Layout = async ({
  doctor,
  patient,
  hospital,
}: {
  doctor: React.ReactNode;
  patient: React.ReactNode;
  hospital: React.ReactNode;
}) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data ?? null;
  if (!user) {
    return redirect('/sign-in');
  }
  if (user.role === 'UNDEFINED') {
    return redirect(`/select-role?userId=${user.id}`);
  }
  return (
    <div className="flex flex-col items-start w-full h-full">
      {user.role === 'DOCTOR' && doctor}
      {user.role === 'PATIENT' && patient}
      {user.role === 'HOSPITAL' && hospital}
    </div>
  );
};

export default Layout;
