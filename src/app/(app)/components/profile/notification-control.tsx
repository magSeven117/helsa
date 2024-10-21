'use client';

import { Button } from '@/libs/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn-ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/libs/shadcn-ui/form';
import { Switch } from '@/libs/shadcn-ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const formSchema = z.object({
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});
type NotificationsFormValues = z.infer<typeof formSchema>;
const NotificationControl = ({}) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communication_emails: false,
      social_emails: false,
      marketing_emails: false,
      security_emails: true,
    },
  });
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Personal Info
          <Button
            variant="ghost"
            className="gap-1 text-sm"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {!isEditing ? (
              <>
                <Edit className="w-4 h-4" />
                Edit
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col mt-6 w-full justify-between py-2 px-4 ">
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="communication_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Communication emails
                      </FormLabel>
                      <FormDescription>
                        Receive emails about your account activity.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Marketing emails
                      </FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="social_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Social emails</FormLabel>
                      <FormDescription>
                        Receive emails for friend requests, follows, and more.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="security_emails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Security emails
                      </FormLabel>
                      <FormDescription>
                        Receive emails about your account activity and security.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
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
          <div>
            <div className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-base">Communication emails</p>
                <p className="text-sm italic">
                  Receive emails about your account activity.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {form.watch('communication_emails') ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-base">Marketing emails</p>
                <p className="text-sm italic">
                  Receive emails about new products, features, and more.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {form.watch('marketing_emails') ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-base">Social emails</p>
                <p className="text-sm italic">
                  Receive emails for friend requests, follows, and more.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {form.watch('social_emails') ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-base">Security emails</p>
                <p className="text-sm italic">
                  Receive emails about your account activity and security.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {form.watch('security_emails') ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationControl;
