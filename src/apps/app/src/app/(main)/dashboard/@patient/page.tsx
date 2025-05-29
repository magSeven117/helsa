import BloodPressure from '@/src/modules/dashboard/components/patient/blood-pressure';
import RegisterDays from '@/src/modules/dashboard/components/patient/days';
import Glucose from '@/src/modules/dashboard/components/patient/glucose';
import { HealthAverage } from '@/src/modules/dashboard/components/patient/health-average';
import HeartRate from '@/src/modules/dashboard/components/patient/heart-rate';
import TreatmentProgress from '@/src/modules/dashboard/components/patient/progress';
import { ResourcesSection } from '@/src/modules/dashboard/components/patient/resources';
import Temperature from '@/src/modules/dashboard/components/patient/temperature';
import { UpcomingAppointments } from '@/src/modules/dashboard/components/patient/uppcoming-appointments';
import { Button } from '@helsa/ui/components/button';
import { Calendar, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="px-8 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex items-center gap-4">
            <Link href={'/book'}>
              <Button className="rounded-md gap-2" variant="outline">
                Agendar <Calendar />
              </Button>
            </Link>
            <Button className="rounded-md gap-2" variant="outline">
              Informar <PlusCircle />{' '}
            </Button>
          </div>
          <div className="w-full flex-col gap-2 flex">
            <p className="text-lg font-semibold mb-5">Indicadores</p>
            <div className="grid grid-cols-1  md:grid-cols-5 gap-3">
              <BloodPressure />
              <Glucose />
              <HeartRate />
              <Temperature />
              <RegisterDays />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-5">
            <TreatmentProgress />
            <UpcomingAppointments />
            <HealthAverage />
            <ResourcesSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
