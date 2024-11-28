import { Button } from '@/libs/shadcn-ui/components/button';
import { Calendar, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Activities } from './components/activities';
import BloodPressure from './components/blood-pressure';
import Glucose from './components/glucose';
import { HealthAverage } from './components/health-average';
import HeartRate from './components/heart-rate';
import Temperature from './components/temperature';
import { UpcomingAppointments } from './components/upcoming-appointments';

const Page = () => {
  return (
    <div className="md:pl-9 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex items-center gap-4">
            <Link href={'/book'}>
              <Button className="rounded-none" variant="outline">
                Agendar <Calendar />{' '}
              </Button>
            </Link>
            <Button className="rounded-none" variant="outline">
              Informar <PlusCircle />{' '}
            </Button>
          </div>
          <div className="w-full flex-col gap-2 flex">
            <p className="text-lg font-semibold mb-5">Indicadores</p>
            <div className="flex justify-between items-center gap-4">
              <BloodPressure />
              <Glucose />
              <HeartRate />
              <Temperature />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-5">
            <HealthAverage />
            <Activities />
          </div>
        </div>
        <div className="max-sm:w-full border-l px-3 h-full justify-center">
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default Page;
