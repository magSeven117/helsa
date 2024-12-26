import { Card } from '@helsa/ui/components/card';
import { Star } from 'lucide-react';

const DoctorSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-5 my-5 gap-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <Card key={index} className="flex flex-col items-center rounded-none gap-4 py-3">
        <div className="w-full h-52 bg-gray-200 animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-200 animate-pulse mt-2" />
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse mt-1" />
        <div className="flex items-center justify-end gap-1">
          <Star className="size-3 bg-gray-200 animate-pulse" />
          <Star className="size-3 bg-gray-200 animate-pulse" />
          {/* ...más estrellas si es necesario... */}
        </div>
      </Card>
    ))}
  </div>
);

export default DoctorSkeleton;
