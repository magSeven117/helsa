'use client';
import AvatarSection from './sections/avatar-section';
import { BioSection } from './sections/bio-section';
import { DeleteAccountSection } from './sections/delete-account-section';
import { EmailSection } from './sections/email-section';
import { NameSection } from './sections/name-section';

export const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <AvatarSection image={user.image} />
      <NameSection firstName={user.firstName} lastName={user.lastName} />
      <BioSection bio={user.bio ?? ''} />
      <EmailSection email={user.email} />
      <DeleteAccountSection />
    </div>
  );
};
