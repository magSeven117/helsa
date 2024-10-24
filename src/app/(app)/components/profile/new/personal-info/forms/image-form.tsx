'use client';

import ImagePicker from '@/libs/ducen-ui/components/image-picker';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  imageUrl: z.string().optional(),
});

type ImageFormValues = z.infer<typeof formSchema>;

export const ImageForm = ({ imageUrl }: ImageFormValues) => {
  const [isEditing, setIsEditing] = useState(false);
  const [courseImageFile, setCourseImageFile] = useState<File>(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: ImageFormValues) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Imagen de perfil
        <Button variant="ghost" onClick={toggleEdit} className="w-6 h-6 p-1 flex justify-center items-center">
          {isEditing ? (
            <>
              <X className="size-3" />
            </>
          ) : (
            <>
              <Pencil className="size-3" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div className="w-[100px] aspect-video my-3 border border-dashed p-2 border-slate-400 rounded-lg">
          <img src={imageUrl} alt="course-image" className="w-full  object-contain rounded-lg" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <div className="flex justify-between items-center gap-3">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                    <div className="w-[100px]">
                      <ImagePicker
                        value={field.value || ''}
                        onChange={(url) => {
                          field.onChange(url)
                        }}
                        onSelectFile={(file: File) => setCourseImageFile(file)}
                      />
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
