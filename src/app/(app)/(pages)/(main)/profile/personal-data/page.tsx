import AddressInfoForm from '@/app/(app)/components/forms/address-info-form/address-info-form';
import LinksForm from '@/app/(app)/components/forms/links-form';
import { currentUser } from '@clerk/nextjs/server';
import PersonalInfoForm from '../../../../components/forms/personal-info-form/personal-info-form';
import styles from './styles.module.css';
const Page = async () => {
  const user = await currentUser();
  return (
    <div className={styles.personal_data__container}>
      <div className={styles.personal_data__column}>
        <PersonalInfoForm
          initialData={{
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            bio: user.publicMetadata.biography as string,
          }}
        ></PersonalInfoForm>
        <AddressInfoForm initialData={{ city: '1', state: '1', street: 'La sardina' }}></AddressInfoForm>
        <LinksForm></LinksForm>
      </div>
    </div>
  );
};

export default Page;
