import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { MapPin } from 'lucide-react';

const ListDoctors = () => {
  return (
    <div className="flex flex-col gap-3 overflow-y-scroll max-h-[calc(100vh-20%)] styled-scroll pr-7">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="p-2 border rounded-none cursor-pointer flex items-center gap-4">
          <Avatar className="size-24">
            <AvatarImage src={doctor.avatar} />
            <AvatarFallback>
              {doctor.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="w-1/4">
            <p className="text-lg font-semibold">{doctor.name}</p>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>

          <div className="w-1/4 space-y-2">
            <p className="text-sm text-gray-500">{doctor.schedule}</p>
            <p className="text-sm text-gray-500 flex justify-start gap-3 items-center">
              <MapPin />
              {doctor.location}
            </p>
          </div>
          <div className="w-1/4">
            <p className="text-sm text-yellow-500">Rating: {doctor.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDoctors;

const doctors = [
  {
    id: '1',
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.5,
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '2',
    name: 'Dr. María Rodríguez',
    specialty: 'Pediatría',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.7,
    avatar: 'https://example.com/avatar2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Carlos González',
    specialty: 'Dermatología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.6,
    avatar: 'https://example.com/avatar3.jpg',
  },
  {
    id: '4',
    name: 'Dr. Laura Pérez',
    specialty: 'Ginecología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.8,
    avatar: 'https://example.com/avatar4.jpg',
  },
  {
    id: '5',
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.5,
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '6',
    name: 'Dr. María Rodríguez',
    specialty: 'Pediatría',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.7,
    avatar: 'https://example.com/avatar2.jpg',
  },
  {
    id: '7',
    name: 'Dr. Carlos González',
    specialty: 'Dermatología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.6,
    avatar: 'https://example.com/avatar3.jpg',
  },
  {
    id: '8',
    name: 'Dr. Laura Pérez',
    specialty: 'Ginecología',
    location: 'Hospital San Juan',
    schedule: 'Lunes a Viernes de 8:00 a 12:00',
    rating: 4.8,
    avatar: 'https://example.com/avatar4.jpg',
  },
];
