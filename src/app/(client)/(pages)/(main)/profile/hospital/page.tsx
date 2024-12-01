import { getHospital } from '@/modules/hospital/presentation/actions/get-hospital';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import HospitalInfo from './components/hospital-info';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const hospital = await getHospital(user.id);
  return (
    <div className="space-y-6 w-full">
      <HospitalInfo hospital={hospital} />
    </div>
  );
};

export default Page;
