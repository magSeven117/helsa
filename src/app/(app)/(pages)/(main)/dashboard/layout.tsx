import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { redirect } from 'next/navigation';

const Layout = async ({ doctor, patient, hospital }) => {
  const user = await getCurrentUser();
  if (user.role === 'UNDEFINED') {
    return redirect(`/select-role?userId=${user.id}`);
  }
  return (
    <div className="flex flex-col items-start w-full">
      {user.role === 'DOCTOR' && doctor }
      {user.role === 'PATIENT' && patient }
      {user.role === 'HOSPITAL' && hospital }
    </div>
  );
};

export default Layout;
