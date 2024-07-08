import ChangePasswordForm from '../../../../components/forms/change-password-form';
import NotificationControl from '../../../../components/forms/notification-control';
import styles from './styles.module.css';
const Page = () => {
  return (
    <div className={styles.personal_data__container}>
      <div className={styles.personal_data__column}>
        <ChangePasswordForm></ChangePasswordForm>
        <NotificationControl></NotificationControl>
      </div>
    </div>
  );
};

export default Page;
