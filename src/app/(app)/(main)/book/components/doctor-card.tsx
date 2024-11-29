'use client';
import { Card } from '@/libs/shadcn-ui/components/card';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    image: string;
    score: number;
  };
};

const DoctorCard = ({ doctor }: Props) => {
  const router = useRouter();
  return (
    <Card
      className="flex flex-col items-center rounded-none gap-4 cursor-pointer hover:bg-sidebar py-3"
      onClick={() => router.push(`/book/${doctor.id}`)}
    >
      <img src={doctor.image} alt="" className="object-contain h-[230px] aspect-square" />
      <div className="flex w-full justify-between px-4">
        <div>
          <p className="font-bold">{doctor.name}</p>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
        </div>
        <div className="flex items-center justify-end gap-1">
          {Array.from({ length: doctor.score }).map((_, index) => (
            <Star key={index} className="size-3" />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
