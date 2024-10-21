'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX, Edit, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './component.module.css';
interface PhotoUpdateFormProps {
  initialData: {
    imageUrl: string;
  };
}
const formSchema = z.object({
  imageUrl: z.string().optional(),
});
const PhotoUpdateForm = ({ initialData }: PhotoUpdateFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [courseImageFile, setCourseImageFile] = useState<File>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  }
  return (
    <div className={styles.photo_container}>
      <div className={styles.photo_header}>
        <p className={styles.photo_header_title}>Personal Info</p>
        <Button
          className={styles.photo_header_button}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {!isEditing ? (
            <>
              <Edit className={styles.icon} />
              Edit
            </>
          ) : (
            <>
              <X className={styles.icon} />
              Cancel
            </>
          )}
        </Button>
      </div>
      <div className={styles.photo_content}>
        <div className={styles.photo_field}>
          <img src={initialData.imageUrl} alt="" className={styles.photo_field_avatar} />
          <Button className={styles.photo_field_button_upload}>
            <UploadCloud className={styles.icon}></UploadCloud>
            Upload new image
          </Button>
          <Button className={styles.delete_image_button}>
            <CircleX className={styles.icon}></CircleX>
            Delete image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpdateForm;
