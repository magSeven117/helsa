import { createAppointmentType } from '@/app/(server)/actions/doctor/create-appointment-type';
import { InputColor } from '@/libs/ducen-ui/components/input-color';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/libs/shadcn-ui/components/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
const durations = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1 hour 30 minutes', value: 90 },
  { label: '2 hours', value: 120 },
];

export const EditTypeModal = ({ defaultValue, id, isOpen, onOpenChange }: Props) => {
  const router = useRouter();
  const createType = useAction(createAppointmentType, {
    onSuccess: () => {
      onOpenChange(false);
      toast.success('Successfully created categories.');
      router.refresh();
    },
    onError: () => {
      toast.error('Something went wrong please try again.');
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue.name,
      duration: defaultValue.duration.toString(),
      color: defaultValue.color,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    createType.execute({
      id,
      name: data.name,
      duration: Number(data.duration),
      color: data.color,
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[455px] sm:rounded-none">
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
                        <FormItem className="flex-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full rounded-none ">
                                <SelectValue placeholder="Duración" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {durations.map((duration) => (
                                <SelectItem
                                  key={duration.value}
                                  value={duration.value.toString()}
                                  className="rounded-none"
                                >
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 w-full">
                <div className="space-y-4 w-full">
                  <Button disabled={createType.status === 'executing'} className="w-full" type="submit">
                    {createType.status === 'executing' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                  </Button>
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
