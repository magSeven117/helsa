'use client';
import AvatarInput from '@/libs/ducen-ui/components/avatar-input';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Form, FormControl, FormField, FormItem } from '@/libs/shadcn-ui/components/form';
import { authClient } from '@/modules/shared/infrastructure/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { upload } from '@vercel/blob/client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  image: z.string().optional(),
});

type AvatarSectionValues = z.infer<typeof formSchema>;
const AvatarSection = ({ image }: AvatarSectionValues) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { image },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (_values: AvatarSectionValues) => {
    if (avatarFile) {
      const res = await upload(`/avatars/${avatarFile.name}`, avatarFile, {
        access: 'public',
        handleUploadUrl: '/api/files',
      });
      if (res) {
        await authClient.updateUser({ image: res.url });
      }
      router.refresh();
    }
  };
  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>Avatar</CardTitle>
              <p className="text-muted-foreground text-sm mt-3">
                Este es tu avatar. Clickea el avatar para subir una foto desde tus archivos
              </p>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <AvatarInput
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      value={field.value || ''}
                      onSelectFile={(file: File) => setAvatarFile(file)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">Un avatar es opcional pero extremadamente recomendado.</p>
            <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AvatarSection;
