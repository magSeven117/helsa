'use client';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import AvatarSection from './sections/avatar-section';
import { BioSection } from './sections/bio-section';
import { DeleteAccountSection } from './sections/delete-account-section';
import { EmailSection } from './sections/email-section';
import { NameSection } from './sections/name-section';

export const PersonalInfo = ({ user }: { user: Primitives<User> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <AvatarSection image={user.image} />
      <NameSection name={user.name} />
      <BioSection bio={user.bio ?? ''} />
      <EmailSection email={user.email} />
      <DeleteAccountSection />
    </div>
  );
};
