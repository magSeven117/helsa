'use client'
import AvatarSection from "./sections/avatar-section"

export const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div>
      <AvatarSection imageUrl={user.imageUrl}/>
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