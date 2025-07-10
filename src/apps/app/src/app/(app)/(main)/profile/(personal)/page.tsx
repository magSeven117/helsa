import AvatarSection from '@/src/components/profile/personal-sections/avatar-section';
import { BioSection } from '@/src/components/profile/personal-sections/bio-section';
import { DeleteAccountSection } from '@/src/components/profile/personal-sections/delete-account-section';
import { EmailSection } from '@/src/components/profile/personal-sections/email-section';
import { NameSection } from '@/src/components/profile/personal-sections/name-section';

const Page = async () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <AvatarSection />
        <NameSection />
        <BioSection />
        <EmailSection />
        <DeleteAccountSection />
      </div>
    </div>
  );
};

export default Page;
