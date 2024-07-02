import banner from '../../../public/images/banner2-removebg.png';
import styles from './_module/styles/auth.module.css';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.auth_layout__left}>
        <div className={styles.auth_layout__header}>
          <h1 className={styles.auth_layout__logo}>Helsa</h1>
        </div>
        <div className={styles.auth_layout__content}>{children}</div>
      </div>
      <div className={styles.auth_layout__right}>
        <div className={styles.auth_layout__banner}>
          <img
            src={banner.src}
            alt="banner"
            className={styles.auth_layout__image}
          ></img>
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
