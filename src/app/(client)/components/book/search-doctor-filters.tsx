import FilterList from '@/libs/ducen-ui/components/filter-list';
import { formatInTimeZone } from 'date-fns-tz';
import { Star } from 'lucide-react';

type Props = {
  filters: { [key: string]: string | number | boolean | string[] | number[] | null };
  loading: boolean;
  onRemove: (key: any) => void;
  specialties?: { id: string; name: string }[];
};

const DoctorFilterList = ({ filters, loading, onRemove, specialties }: Props) => {
  const renderFilter = ({ key, value }: { key: string; value: any }) => {
    switch (key) {
      case 'specialties': {
        return value.map((slug: string) => specialties?.find((category) => category.name === slug)?.name).join(', ');
      }
      case 'availability': {
        return formatInTimeZone(value, 'America/Caracas', 'MMM d, yyyy');
      }

      case 'minRate': {
        return (
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: value }).map((_, index) => (
              <Star key={index} className="text-primary size-4" />
            ))}
          </div>
        );
      }

      case 'experience': {
        return `${value} Years`;
      }

      case 'q':
        return value;

      default:
        return null;
    }
  };

  return <FilterList filters={filters} loading={loading} onRemove={onRemove} renderFilter={renderFilter} />;
};

export default DoctorFilterList;
