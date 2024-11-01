import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { redirect } from 'next/navigation';

const Layout = async ({ doctor, patient }) => {
  const user = await getCurrentUser();
  if (user.role === 'UNDEFINED') {
    return redirect(`/select-role?userId=${user.id}`);
  }
  return (
    <div className="flex flex-col items-start w-full">
      {user.role === 'DOCTOR' ? doctor : patient}
    </div>
  );
};

export default Layout;
