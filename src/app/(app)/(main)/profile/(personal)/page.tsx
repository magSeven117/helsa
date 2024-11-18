import { currentUser } from '@clerk/nextjs/server';
import { PersonalInfo } from './components/personal-info';

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  return (
    <div className="space-y-6 w-full">
      <PersonalInfo
        user={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          bio: user.publicMetadata.bio,
          imageUrl: user.imageUrl,
        }}
      />
    </div>
  );
};

export default Page;
