import { AppointmentTypes } from '@/app/(app)/components/dashboard/doctor-dash/appointment-types';
import { Revenue } from '@/app/(app)/components/dashboard/doctor-dash/revenue';
import { UpcomingAppointments } from '@/app/(app)/components/dashboard/doctor-dash/upcoming-appointments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { DatePicker } from '@/libs/shadcn-ui/components/date-picker';
import { DateRangePicker } from '@/libs/shadcn-ui/components/date-range-picker';
import { Calendar, DollarSign, Stethoscope, Users } from 'lucide-react';

const Page = () => {
  return (
    <div className="px-9 py-5 w-full h-full">
      <div className="w-full flex-col h-full flex gap-10">
        <div className="flex justify-start items-center">
          <DateRangePicker />
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <Card className="rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancia total</CardTitle>
              <DollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3000,00</div>
              <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio de pacients</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">46</div>
              <p className="text-xs text-muted-foreground">-16.4% del mes pasado</p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio de edad</CardTitle>
              <Calendar />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33</div>
              <p className="text-xs text-muted-foreground">La mayoría esta por debajo de los 40</p>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipos de consulta</CardTitle>
              <Stethoscope />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Revision</div>
              <p className="text-xs text-muted-foreground">La mayoría ha venido con anterioridad</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <AppointmentTypes />
          <Revenue />
          <Card className="col-span-1 rounded-none">
            <CardHeader className='flex flex-row justify-between items-center'>
              <div>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Citas del dia</CardDescription>
              </div>
              <DatePicker></DatePicker>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
