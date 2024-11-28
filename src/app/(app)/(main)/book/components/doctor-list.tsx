import { Card } from '@/libs/shadcn-ui/components/card';
import { getDoctors } from '@/modules/doctor/presentation/actions/get-doctors';
import { Star } from 'lucide-react';

type Props = {
  filters: {
    q: string | null;
    specialties: string[] | null;
    availability: string | null;
    minRate: number | null;
    experience: number | null;
  };
};

const DoctorList = async ({ filters }: Props) => {
  const doctors2 = await getDoctors({
    q: filters.q as string,
    availability: filters.availability as string,
    minRate: filters.minRate as number,
    specialties: filters.specialties as string[],
  });
  return (
    <div className="grid grid-cols-5 px-5 my-5 gap-3">
      {doctors2.map((doctor, index) => {
        return (
          <Card
            key={index}
            className="flex flex-col items-center rounded-none gap-4 cursor-pointer hover:bg-sidebar py-3"
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
      })}
    </div>
  );
};

export default DoctorList;
