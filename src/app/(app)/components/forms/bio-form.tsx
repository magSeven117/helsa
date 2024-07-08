'use client';
import EditorRichText from '@/libs/ducen-ui/components/editor-rich-text';
import ReadRichText from '@/libs/ducen-ui/components/read-rich-text';
import { Button } from '@/libs/shadcn-ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/libs/shadcn-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BioFormProps {
  biography: string;
}

const formSchema = z.object({
  biography: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters long' }),
});

const BioForm = ({ biography }: BioFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      biography,
    },
    mode: 'all',
  });
  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return (
    <div className="flex flex-col w-full border-border border rounded-lg bg-background px-2 py-3 min-h-[170px]">
      <div className="flex justify-between w-full px-4">
        <h1 className="text-xl font-bold">Biography</h1>
        <Button
          className="bg-background border border-border rounded-3xl text-foreground gap-1 text-sm p-4 hover:bg-foreground hover:text-background"
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
      </div>
      <div className="flex flex-col mt-6 w-full justify-between py-0 px-4 ">
        {!isEditing ? (
          <ReadRichText value={biography}></ReadRichText>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="biography"
                render={({ field }) => (
                  <FormItem>
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
        )}
      </div>
    </div>
  );
};

export default BioForm;
