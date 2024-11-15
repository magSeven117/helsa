import { Activities } from "@/app/(app)/components/dashboard/patient-dash/activities";
import BloodPressure from "@/app/(app)/components/dashboard/patient-dash/blood-pressure";
import Glucose from "@/app/(app)/components/dashboard/patient-dash/glucose";
import { HealthAverage } from "@/app/(app)/components/dashboard/patient-dash/health-average";
import HeartRate from "@/app/(app)/components/dashboard/patient-dash/heart-rate";
import Appoint from "@/app/(app)/components/dashboard/patient-dash/schudule-appoint/appoint-button";
import Temperature from "@/app/(app)/components/dashboard/patient-dash/temperature";
import { UpcomingAppointments } from "@/app/(app)/components/dashboard/patient-dash/upcoming-appointments";
import { Button } from "@/libs/shadcn-ui/components/button";
import { PlusCircle } from "lucide-react";

const Page = () => {
  return (
    <div className="md:pl-9 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex items-center gap-4">
            <Appoint />
            <Button className="rounded-none" variant="outline">Informar <PlusCircle /> </Button>
          </div>
          <div className="w-full flex-col gap-2 flex">
            <p className="text-lg font-semibold mb-5">
              Indicadores
            </p>
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
}

export default Page;
