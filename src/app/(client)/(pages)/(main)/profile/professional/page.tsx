import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import ProfessionalInfo from './components/professional-info';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const doctor = await getDoctor(user.id);
  if (!doctor) {
    return null;
  }
  return (
    <div className="space-y-6 w-full">
      <ProfessionalInfo doctor={doctor} />
    </div>
  );
};

export default Page;
