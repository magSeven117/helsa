'use client'
import { BioForm } from "./forms/bio-form"
import { EmailData } from "./forms/email-form"
import { ImageForm } from "./forms/image-form"
import { LinksForm } from "./forms/links-form"
import { NameForm } from "./forms/name-form"

export const PersonalInfo = ({ user }: { user: any }) => {
  return (
    <div>
      <EmailData email={user.email} />
      <ImageForm imageUrl={user.imageUrl} />
      <NameForm firstName={user.firstName} lastName={user.lastName} />
      <BioForm bio={user.bio} />
      <LinksForm urls={[
        { value: 'https://twitter.com/Ducen29' },
        { value: 'https://github.com/Duccem'}
      ]} />
    </div>
  )
}