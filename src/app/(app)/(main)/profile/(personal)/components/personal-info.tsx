'use client'
import AvatarSection from "./sections/avatar-section"
import { BioSection } from "./sections/bio-section"
import { DeleteAccountSection } from "./sections/delete-account-section"
import { EmailSection } from "./sections/email-section"
import { NameSection } from "./sections/name-section"

export const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <AvatarSection imageUrl={user.imageUrl}/>
      <NameSection firstName={user.firstName} lastName={user.lastName} />
      <EmailSection email={user.email}/>
      <BioSection bio={user.bio ?? ''}/>
      <DeleteAccountSection />
    </div>
  )
}