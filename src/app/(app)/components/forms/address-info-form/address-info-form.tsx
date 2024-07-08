'use client';
import { Button } from '@/libs/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn-ui/card';
import { Combobox } from '@/libs/shadcn-ui/combobox';
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
import { Edit, Loader2, MapPin, Route, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface AddressInfoFormProps {
  initialData: {
    state: string;
    city: string;
    street: string;
  };
}
const formSchema = z.object({
  state: z.string().min(1, { message: 'First name is required' }),
  city: z.string().min(1, { message: 'Last name is required' }),
  street: z.string().min(1, { message: 'Street is required' }),
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
  const options = [
    { label: 'Nueva Esparta', value: '1' },
    { label: 'Anzoategui', value: '2' },
  ];
  const selectedState = options.find((option) => option.value === initialData.state);
  const selectedCity = options.find((option) => option.value === initialData.city);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Address Info
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
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex justify-start items-center w-full gap-2'>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary ">
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
                  <FormItem className="flex justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary ">
                      City:
                    </FormLabel>
                    <FormControl>
                      <Combobox
                      
                        options={options}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="flex w-2/5 justify-start items-start flex-col gap-1 mb-3">
                    <FormLabel className="text-sm text-color-foreground-secondary ">
                      Street:
                    </FormLabel>
                    <FormControl>
                    <Input
                        placeholder="Av. 4 de mayo, casa 4-4"
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
            <div className="flex justify-start items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" />
              Lives in
              <span className="text-sm font-bold">
                {selectedCity.label}, {selectedState.label},
              </span>
              <Route className='w-4 h-4'/>
              Street
              <span className="text-sm font-bold">{initialData.street}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressInfoForm;
