'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Card, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  imageUrl: z.string().optional(),
});

type AvatarSectionValues = z.infer<typeof formSchema>;
const AvatarSection = ({ imageUrl }: AvatarSectionValues) => {
  const [avatarFile, setAvatarFile] = useState<File>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl },
  });
  return (
    <Card className="rounded-none bg-transparent">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Avatar</CardTitle>
          <p className='text-muted-foreground text-sm mt-3'>Este es tu avatar. Clickea el avatar para subir una foto desde tus archivos</p>
        </div>
        <Avatar className="h-14 w-14 rounded-full">
          <AvatarImage src={imageUrl || ''} alt={'avatar'} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardFooter className='border-t pt-4'>
        <p className='text-muted-foreground text-xs'>Un avatar es opcional pero extremadamente recomendado.</p>
      </CardFooter>
    </Card>
  );
};

export default AvatarSection;
