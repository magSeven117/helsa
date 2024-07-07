import ChangePasswordForm from '../components/settings/change-password-form';
import DeleteAccount from '../components/settings/delete-account';
import NotificationControl from '../components/settings/notification-control';
import styles from './styles.module.css';
const Page = () => {
  return (
    <div className={styles.personal_data__container}>
      <div className={styles.personal_data__column}>
        <ChangePasswordForm></ChangePasswordForm>
        <NotificationControl></NotificationControl>
        <DeleteAccount></DeleteAccount>
      </div>
    </div>
  );
};

export default Page;
