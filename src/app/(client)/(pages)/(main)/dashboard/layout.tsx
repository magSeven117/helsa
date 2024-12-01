import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
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
  const user = await getCurrentUser();
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
