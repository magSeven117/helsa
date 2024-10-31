import MainInfoForm from '@/app/(app)/components/profile/personal-info/main-info-form';
import Github from '@/libs/ducen-ui/icons/github';
import LinkedIn from '@/libs/ducen-ui/icons/linkedin';
import XIcon from '@/libs/ducen-ui/icons/x';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { currentUser } from '@clerk/nextjs/server';
import { BookHeart, LinkIcon, MapPin, Pencil } from 'lucide-react';
import Link from 'next/link';

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  return (
    <div className="w-full px-5 flex flex-col gap-5 mb-5">
      <p className="p-5 text-xl font-semibold">Mi perfil</p>
      <div className="flex justify-start items-center gap-4">
        <div className="w-24 h-24 rounded-full flex justify-center bg-sidebar items-center">
          <img src={user.imageUrl} alt="" className="object-contain size-20 rounded-full" />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{user.fullName || 'Jose Véliz'}</p>
          <p className="text-xl ">{(user.publicMetadata.specialty as string) || 'Cardiologist'}</p>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, modi?</p>
        </div>
      </div>
      <Card className="p-5 bg-sidebar">
        <CardHeader className="p-0 flex flex-row justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookHeart />
            Información personal
          </CardTitle>
          <MainInfoForm />
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid mt-2 max-sm:grid-cols-1 grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-muted-foreground">Nombre</p>
              <p>{user.firstName || 'Jose'}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Apellido</p>
              <p>{user.lastName || 'Véliz'}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Correo electrónico</p>
              <p>{user.emailAddresses[0].emailAddress}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Teléfono</p>
              <p>{user.phoneNumbers[0]?.phoneNumber || '+584121802961'}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Biografía</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, modi?</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5 bg-sidebar">
        <CardHeader className="p-0 flex flex-row justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin />
            Dirección
          </CardTitle>
          <Button variant="ghost">
            <Pencil />
            Editar
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid mt-2 max-sm:grid-cols-1 grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-muted-foreground">Ciudad</p>
              <p>Porlamar</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Calle</p>
              <p>La Sardina</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Código Postal</p>
              <p>63001</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5 bg-sidebar">
        <CardHeader className="p-0 flex flex-row justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <LinkIcon />
            Mis enlaces
          </CardTitle>
          <Button variant="ghost">
            <Pencil />
            Editar
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid mt-2 grid-cols-1 gap-3">
            <Link href={'/'} className='flex items-center gap-4'>
              <XIcon />
              <p>Ducen29</p>
            </Link>
            <Link href={'/'} className='flex items-center gap-4'>
              <LinkedIn />
              <p>Jose Manuel Véliz</p>
            </Link>
            <Link href={'/'} className='flex items-center gap-4'>
              <Github />
              <p>Duccem</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
