import { Card } from '@/libs/shadcn-ui/components/card';
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

const DoctorList = ({ filters }: Props) => {
  const filteredDoctors = doctors.filter((doctor) => {
    let matches = true;
    if (filters.q) {
      matches = matches && doctor.name.toLowerCase().includes(filters.q.toLowerCase());
    }
    if (filters.specialties) {
      matches = matches && filters.specialties.includes(doctor.specialty);
    }
    if (filters.availability) {
      matches = matches && doctor.availability.includes(filters.availability);
    }
    if (filters.minRate) {
      matches = matches && doctor.rating >= filters.minRate;
    }
    if (filters.experience) {
      matches = matches && doctor.experience >= filters.experience;
    }
    return matches;
  });
  return (
    <div className="grid grid-cols-5 px-5 my-5 gap-3">
      {filteredDoctors.map((doctor, index) => {
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
                {Array.from({ length: doctor.rating }).map((_, index) => (
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

const doctors = [
  {
    image:
      'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
    name: 'Dr. John Doe',
    specialty: 'Dermatología',
    rating: 4.5,
    reviews: 100,
    experience: 5,
    availability: ['2025-01-01', '2025-01-05', '2025-01-10'],
  },
  {
    image: '/images/doctora.png',
    name: 'Dra. Jane Doe',
    specialty: 'Cardialgia',
    rating: 5,
    reviews: 100,
    experience: 5,
    availability: ['2025-01-02', '2025-01-06', '2025-01-11'],
  },
  {
    image: '/images/doctor-1.png',
    name: 'Dr. Elmer Pineda',
    specialty: 'Endocrinóloga',
    rating: 3,
    reviews: 100,
    experience: 5,
    availability: ['2025-02-03', '2024-12-07', '2024-12-12'],
  },
  {
    image: '/images/doctor-2.png',
    name: 'Dr. Jorge Segura',
    specialty: 'Medicina Interna',
    rating: 2,
    reviews: 100,
    experience: 5,
    availability: ['2025-02-04', '2025-02-08', '2024-12-13'],
  },
  {
    image: '/images/doctora-1.png',
    name: 'Dr. Ana Maria',
    specialty: 'Pediatría',
    rating: 4.3,
    reviews: 100,
    experience: 5,
    availability: ['2025-10-05', '2025-10-09', '2025-10-14'],
  },
  {
    image: '/images/doctora-2.png',
    name: 'Dr. Maria Elena',
    specialty: 'Ginecología',
    rating: 5,
    reviews: 100,
    experience: 5,
    availability: ['2025-10-06', '2025-10-10', '2025-10-15'],
  },
];

export default DoctorList;
