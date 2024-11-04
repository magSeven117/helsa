'use client'
import AvatarSection from "./sections/avatar-section"
import { NameSection } from "./sections/name-section"

export const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <AvatarSection imageUrl={user.imageUrl}/>
      <NameSection firstName={user.firstName} lastName={user.lastName} />
      {/* <EmailData email={user.email} />
      <NameForm firstName={user.firstName} lastName={user.lastName} />
      <BioForm bio={user.bio} />
      <LinksForm urls={[
        { value: 'https://twitter.com/Ducen29' },
        { value: 'https://github.com/Duccem'}
      ]} /> */}
    </div>
  )
}