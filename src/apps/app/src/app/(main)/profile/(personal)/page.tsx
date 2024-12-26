import { getCurrentUser } from '@/src/actions/user/get-current-user';
import AvatarSection from '@/src/components/profile/personal-sections/avatar-section';
import { BioSection } from '@/src/components/profile/personal-sections/bio-section';
import { DeleteAccountSection } from '@/src/components/profile/personal-sections/delete-account-section';
import { EmailSection } from '@/src/components/profile/personal-sections/email-section';
import { NameSection } from '@/src/components/profile/personal-sections/name-section';

const Page = async () => {
  const res = await getCurrentUser();
  const user = res?.data ?? null;
  if (!user) return null;
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <AvatarSection image={user.image || ''} />
        <NameSection name={user.name} />
        <BioSection bio={user.bio ?? ''} />
        <EmailSection email={user.email} />
        <DeleteAccountSection />
      </div>
    </div>
  );
};

export default Page;
