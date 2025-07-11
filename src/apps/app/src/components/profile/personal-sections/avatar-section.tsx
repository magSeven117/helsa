'use client';
import { updateUser } from '@helsa/engine/user/infrastructure/http-user-api';
import { createClient } from '@helsa/supabase/client';
import { upload } from '@helsa/supabase/storage';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem } from '@helsa/ui/components/form';
import AvatarInput from '@helsa/ui/components/internal/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSession } from '../../auth/session-provider';

const formSchema = z.object({
  image: z.string().optional(),
});

type AvatarSectionValues = z.infer<typeof formSchema>;
const AvatarSection = () => {
  const { user } = useSession();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { image: user.image.value ?? '' },
  });
  const { isValid } = form.formState;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (_data: AvatarSectionValues) => {
      if (avatarFile) {
        const supabase = createClient();
        const res = await upload(supabase, {
          file: avatarFile,
          path: ['avatars', avatarFile.name],
          bucket: 'profiles',
        });
        if (res) {
          await updateUser({ image: res });
        }
      }
    },
    onSuccess: () => {
      toast.success('Avatar actualizado correctamente');
      router.refresh();
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error('An error occurred while updating the avatar. Please try again.');
    },
  });
  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            (error) => console.error(error),
          )}
        >
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
            <Button disabled={!isValid || isPending} type="submit" className="rounded-none">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AvatarSection;
