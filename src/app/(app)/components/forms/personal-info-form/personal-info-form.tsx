'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './component.module.css';
interface PersonalInfoFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
});
const PersonalInfoForm = ({ initialData }: PersonalInfoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: 'all'
  });
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <div className={styles.personal_info_form__content}>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-center gap-4">
                    <FormLabel className="text-[1rem] font-bold w-1/6">
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
                  <FormItem className="flex justify-start items-center gap-4">
                    <FormLabel className="text-[1rem] font-bold w-1/6">
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
                  <FormItem className="flex justify-start items-center gap-4">
                    <FormLabel className="text-[1rem] font-bold w-1/6">
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
              <p className={styles.personal_info_form__content_field_label}>
                First name
              </p>
              <p className={styles.personal_info_form__content_field_value}>
                {initialData.firstName}
              </p>
            </div>
            <div className={styles.personal_info_form__content_field}>
              <p className={styles.personal_info_form__content_field_label}>
                Last name
              </p>
              <p className={styles.personal_info_form__content_field_value}>
                {initialData.lastName}
              </p>
            </div>
            <div className={styles.personal_info_form__content_field}>
              <p className={styles.personal_info_form__content_field_label}>
                Email
              </p>
              <p className={styles.personal_info_form__content_field_value}>
                {initialData.email}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
