import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { PersonalInfo } from './components/personal-info';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-6 w-full">
      <PersonalInfo user={user as Primitives<User>} />
    </div>
  );
};

export default Page;
