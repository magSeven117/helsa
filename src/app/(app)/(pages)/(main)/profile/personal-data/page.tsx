import { Button } from '@/libs/shadcn-ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { CircleX, Edit, UploadCloud } from 'lucide-react';
import BioForm from '../../../../components/forms/bio-form';
import PersonalInfoForm from '../../../../components/forms/personal-info-form/personal-info-form';
import styles from './styles.module.css';
const Page = async () => {
  const user = await currentUser();
  return (
    <div className={styles.personal_data__container}>
      <div className={styles.personal_data__column}>
        <div className={styles.personal_data__section}>
          <div className={styles.personal_data__section_content}>
            <div className={styles.personal_data__section_avatar}>
              <img src={user.imageUrl} alt="" className={styles.avatar_image} />
              <Button className={styles.upload_image_button}>
                <UploadCloud className={styles.icon}></UploadCloud>
                Upload new Photo
              </Button>
              <Button className={styles.delete_image_button}>
                <CircleX className={styles.icon}></CircleX>
                Delete Photo
              </Button>
            </div>
          </div>
        </div>
        <PersonalInfoForm
          initialData={{
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          }}
        ></PersonalInfoForm>
        <BioForm biography='Cardiologo y Profesor Universitario

El Dr. Juan José Puigbó García es un reconocido cardiólogo y profesor universitario, considerado uno de los pioneros de la cardiología en Venezuela. A lo largo de su extensa trayectoria profesional, ha realizado importantes contribuciones al avance de la especialidad, tanto en el ámbito asistencial como en el docente e investigativo.

Biografía

El Dr. Puigbó nació en Maracaibo, Venezuela, en el año 1928. Cursó sus estudios de medicina en la Universidad Central de Venezuela (UCV), donde se graduó con honores en 1954. Posteriormente, realizó su especialización en cardiología en el Hospital Universitario de Caracas y en el Instituto Pasteur de París.

Trayectoria profesional

El Dr. Puigbó ha desempeñado cargos de gran relevancia en el ámbito médico venezolano. Fue fundador y presidente de la Sociedad Venezolana de Cardiología, así como presidente de la Academia Nacional de Medicina. Además, se ha destacado como profesor titular de la Cátedra de Cardiología de la Facultad de Medicina de la UCV, donde ha formado a numerosas generaciones de cardiólogos venezolanos.'></BioForm>
        <div className={styles.personal_data__section}>
          <div className={styles.personal_data__section_header}>
            <p className={styles.personal_data__section_header_title}>
              Address info
            </p>
            <Button className={styles.personal_data__section_header_button}>
              <Edit className={styles.icon} /> Edit
            </Button>
          </div>
          <div className={styles.personal_data__section_content}>
            <div className={styles.personal_data__section_content_field}>
              <p className={styles.personal_data__section_content_label}>
                Estado
              </p>
              <p className={styles.personal_data__section_content_value}>
                Nueva Esparta
              </p>
            </div>
            <div className={styles.personal_data__section_content_field}>
              <p className={styles.personal_data__section_content_label}>
                Ciudad
              </p>
              <p className={styles.personal_data__section_content_value}>
                Pampatar
              </p>
            </div>
          </div>
        </div>
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
