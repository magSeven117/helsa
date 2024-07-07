'use client';

import { Button } from '@/libs/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/libs/shadcn-ui/form';
import { Switch } from '@/libs/shadcn-ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
    <div className="flex flex-col w-full border-border border rounded-lg bg-background px-2 py-3 min-h-[170px]">
      <div className="flex justify-between w-full px-4">
        <h1 className="text-xl font-bold">Account</h1>
      </div>
      <div className="flex flex-col mt-6 w-full justify-between py-0 px-4 ">
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
                    <FormLabel className="text-base">Security emails</FormLabel>
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
                  'Save'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NotificationControl;
