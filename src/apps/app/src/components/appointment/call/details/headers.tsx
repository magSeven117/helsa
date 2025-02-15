import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { OrganDonors } from '@helsa/engine/patient/domain/members/biometric';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { SheetHeader, SheetTitle } from '@helsa/ui/components/sheet';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const HeaderPatient = ({ data }: { data: Primitives<Appointment> }) => {
  return (
    <>
      <SheetHeader className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row justify-start items-center gap-4">
          <Avatar className="bg-secondary">
            <AvatarImage className="object-contain" src={data?.doctor?.user?.image} />
            <AvatarFallback>{data?.doctor?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <SheetTitle className="text-xl flex justify-start items-center gap-2">
              Dr. {data?.doctor?.user?.name}{' '}
              <Link href={`/doctors/${data?.doctor?.id}`} target="_blank">
                <ExternalLink className="size-4 ml-3" />
              </Link>{' '}
            </SheetTitle>
          </div>
        </div>
      </SheetHeader>
      <div className="flex gap-2 px-1 border-b py-2">
        <div className="flex justify-start items-center gap-2 text-sm">
          <p className="">Estado civil:</p>
          <Badge variant={'outline'}>{data.patient?.demographic.civilStatus}</Badge>
        </div>
        <div className="flex justify-start items-center gap-2 text-sm">
          <p className="">Educación:</p>
          <Badge variant={'outline'}>{data.patient?.demographic.educativeLevel}</Badge>
        </div>
        <div className="flex justify-start items-center gap-2 text-sm">
          <p className="">Ocupación:</p>
          <Badge variant={'outline'}>{data.patient?.demographic.occupation}</Badge>
        </div>
      </div>
    </>
  );
};

export const HeaderDoctor = ({ data }: { data: Primitives<Appointment> }) => {
  return (
    <>
      <SheetHeader className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row justify-start items-center gap-4">
          <Avatar className="bg-secondary">
            <AvatarImage className="object-contain" src={data?.patient?.user?.image} />
            <AvatarFallback>{data?.patient?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <SheetTitle className="text-xl flex justify-start items-center gap-2">
              {data?.patient?.user?.name}{' '}
              <Link href={`/patients/${data?.patient?.id}`} target="_blank">
                <ExternalLink className="size-4 ml-3" />
              </Link>{' '}
              <Badge variant={'outline'}>26 años</Badge>
              <Badge variant={'outline'}>Masculino</Badge>
              {data.patient?.biometric.organDonor === OrganDonors.Yes && <Badge variant={'outline'}>Donador</Badge>}
              <Badge variant={'outline'}>{data.patient?.biometric.bloodType}</Badge>
            </SheetTitle>
          </div>
        </div>
      </SheetHeader>
      <div className="flex gap-2 px-1 border-b py-2">
        <div className="flex justify-start items-center gap-2 text-sm">
          <p className="">Especialidad:</p>
          <Badge variant={'outline'}>{data.doctor?.specialty?.name || ''}</Badge>
        </div>
        <div className="flex justify-start items-center gap-2 text-sm">
          <p className="">Nº de Licencia:</p>
          <Badge variant={'outline'}>{data.doctor?.licenseMedicalNumber || ''}</Badge>
        </div>
      </div>
    </>
  );
};
