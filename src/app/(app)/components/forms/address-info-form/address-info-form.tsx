'use client';
import { Button } from '@/libs/shadcn-ui/button';
import { Combobox } from '@/libs/shadcn-ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/libs/shadcn-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './component.module.css';
interface AddressInfoFormProps {
  initialData: {
    state: string;
    city: string;
  };
}
const formSchema = z.object({
  state: z.string().min(1, { message: 'First name is required' }),
  city: z.string().min(1, { message: 'Last name is required' }),
});
const AddressInfoForm = ({ initialData }: AddressInfoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  const options = [{ label: 'Nueva Esparta', value: '1' }, { label: 'Anzoategui', value: '2' }]
  return (
    <div className={styles.address_info_form__container}>
      <div className={styles.address_info_form__header}>
        <p className={styles.address_info_form__header_title}>Address Info</p>
        <Button
          className={styles.address_info_form__header_action}
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
      <div className={styles.address_info_form__content}>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-center gap-4">
                    <FormLabel className="text-[1rem] font-bold w-1/6">
                      State: 
                    </FormLabel>
                    <FormControl>
                      <Combobox options={options} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-center gap-4">
                    <FormLabel className="text-[1rem] font-bold w-1/6">
                      City:
                    </FormLabel>
                    <FormControl>
                      <Combobox options={[{ label: 'unique', value: 'unique' }]} {...field} />
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
            <div className={styles.address_info_form__content_field}>
              <p className={styles.address_info_form__content_field_label}>
                State
              </p>
              <p className={styles.address_info_form__content_field_value}>
                {initialData.state}
              </p>
            </div>
            <div className={styles.address_info_form__content_field}>
              <p className={styles.address_info_form__content_field_label}>
                City
              </p>
              <p className={styles.address_info_form__content_field_value}>
                {initialData.city}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressInfoForm;
