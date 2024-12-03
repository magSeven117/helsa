import { InputColor } from '@/libs/ducen-ui/components/input-color';
import { DialogFooter, DialogHeader } from '@/libs/shadcn-ui/components/dialog';
import { FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Input } from '@/libs/shadcn-ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  id: string;
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  defaultValue: {
    id: string;
    name: string;
    system: boolean;
    duration: number;
    color: string;
  };
};

const formSchema = z.object({
  name: z.string(),
  duration: z.string(),
  color: z.string(),
});

export const EditTypeModal = ({ defaultValue, id, isOpen, onOpenChange }: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue.name,
      duration: defaultValue.duration.toString(),
      color: defaultValue.color,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[455px]">
        <div className="p-4">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 mb-6">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative">
                            <div
                              className="size-3 transition-colors rounded-[2px] absolute top-3 left-2"
                              style={{
                                backgroundColor: form.watch('color'),
                              }}
                            />

                            <InputColor
                              placeholder="Type"
                              onChange={({ name, color }) => {
                                form.setValue('color', color);
                                field.onChange(name);
                              }}
                              defaultValue={field.value}
                              defaultColor={form.watch('color')}
                            />

                            <FormMessage />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex-1 relative">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} name={form.watch('name')} placeholder="Duration" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 w-full">
                <div className="space-y-4 w-full">
                  {/* <Button disabled={updateCategory.status === 'executing'} className="w-full" type="submit">
                    {updateCategory.status === 'executing' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                  </Button> */}
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTypeModal;
