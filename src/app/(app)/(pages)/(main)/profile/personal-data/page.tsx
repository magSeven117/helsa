import AddressInfoForm from '@/app/(app)/components/forms/address-info-form/address-info-form';
import { Button } from '@/libs/shadcn-ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { Edit } from 'lucide-react';
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
        <AddressInfoForm initialData={{ city: 'unique', state: '1' }}></AddressInfoForm>
        <div className={styles.personal_data__section}>
          <div className={styles.personal_data__section_header}>
            <p className={styles.personal_data__section_header_title}>Links</p>
            <Button className={styles.personal_data__section_header_button}>
              <Edit className={styles.icon} /> Edit
            </Button>
          </div>
          <div className={styles.personal_data__section_content}>
            <div className={styles.personal_data__section_content_field}>
              <p className={styles.personal_data__section_content_value}>
                Twitter: @johndoe
              </p>
              <p className={styles.personal_data__section_content_value}>
                Linkedin: @johndoe
              </p>
              <p className={styles.personal_data__section_content_value}>
                Personal Page: johndoe.com
              </p>
              <p className={styles.personal_data__section_content_value}>
                Instagram: @johndoe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
