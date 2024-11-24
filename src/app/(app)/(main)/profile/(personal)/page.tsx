import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { PersonalInfo } from './components/personal-info';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="space-y-6 w-full">
      <PersonalInfo
        user={{
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1],
          email: user.email,
          bio: '',
          imageUrl: user.image,
        }}
      />
    </div>
  );
};

export default Page;
