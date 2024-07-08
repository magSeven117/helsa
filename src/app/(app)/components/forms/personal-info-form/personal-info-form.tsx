'use client';
import EditorRichText from '@/libs/ducen-ui/components/editor-rich-text';
import ImagePicker from '@/libs/ducen-ui/components/image-picker';
import { Button } from '@/libs/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/libs/shadcn-ui/form';
import { Input } from '@/libs/shadcn-ui/input';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './component.module.css';
interface PersonalInfoFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
}
const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  imageUrl: z.string().optional(),
  bio: z.string().optional(),
});
const PersonalInfoForm = ({ initialData }: PersonalInfoFormProps) => {
  const ref = useRef(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarImageFile, setAvatarImageFile] = useState<File>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: 'all',
  });
  const { isValid, isSubmitting } = form.formState;
  const { user } = useUser();
  const onSubmit = async (data: any) => {
    try {
      await user.setProfileImage({
        file: avatarImageFile,
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.personal_info_form__container}>
      <div className={styles.personal_info_form__header}>
        <p className={styles.personal_info_form__header_title}>Personal Info</p>
        <Button
          className={styles.personal_info_form__header_action}
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
      <div className={styles.personal_info_form__content + ` ${isEditing ? styles.editing : ''}`}>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <ImagePicker
                        ref={ref}
                        value={field.value || ''}
                        onChange={(value) => field.onChange(value)}
                        onSelectFile={(file: File) => setAvatarImageFile(file)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary w-1/6">
                      First name:{' '}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Advanced Web Development"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary w-1/6">
                      Last name:{' '}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Advanced Web Development"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary w-1/6">
                      Email:{' '}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Advanced Web Development"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start gap-1 mt-3">
                    <FormLabel className="text-sm text-color-foreground-secondary w-1/6">
                      Biography
                    </FormLabel>
                    <FormControl>
                      <EditorRichText
                        placeholder="What is this course about"
                        {...field}
                      ></EditorRichText>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center mt-5 gap-x-2">
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="bg-background border border-border rounded-3xl text-foreground gap-1 text-sm p-4 hover:bg-foreground hover:text-background"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <div className={styles.personal_info_form__content_field}>
              <div className={styles.personal_info_avatar}>
                <img
                  src={initialData.imageUrl}
                  alt=""
                  className={styles.image}
                />
              </div>
              <div className={styles.personal_info_data}>
                <p className={styles.data_full_name}>
                  {initialData.firstName + ' ' + initialData.lastName}
                </p>
                <p className={styles.data_email}>{initialData.email}</p>
                <p className={styles.data_bio}>{initialData.bio}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
