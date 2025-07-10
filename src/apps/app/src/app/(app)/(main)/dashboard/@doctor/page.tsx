import { AppointmentTypes } from '@/src/components/dashboard/doctor/appointment-types';
import { AppointmentsCalendar } from '@/src/components/dashboard/doctor/appointments-calendar';
import { PatientsList } from '@/src/components/dashboard/doctor/patient-list';
import { Revenue } from '@/src/components/dashboard/doctor/revenue';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Calendar, Clock, TrendingUp, Users, Video } from 'lucide-react';

const Page = async () => {
  return (
    <div className="md:pl-9 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col mb-3">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex justify-between items-center gap-4">
            <p className="text-lg font-semibold">Hola, Dr José Véliz</p>
            <Button variant={'primary'} className="gap-3">
              <Video />
              Agendar cita
            </Button>
          </div>

          <div className="w-full flex-col gap-2 flex">
            <div className="flex justify-between items-center gap-4">
              <Card className=" w-1/4 rounded-lg border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total pacientes</CardTitle>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">172</div>
                  <p className="text-xs text-muted-foreground">+4 nuevos esta semana</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Citas programadas</CardTitle>
                  <Calendar />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Para los próximos 7 días</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas de consulta</CardTitle>
                  <Clock />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32.5</div>
                  <p className="text-xs text-muted-foreground">Este mes (+12% vs anterior)</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de asistencia</CardTitle>
                  <TrendingUp />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">+2% respecto al mes anterior</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1 glass-card rounded-lg border shadow-none">
              <CardHeader>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Tienes 5 citas programadas para hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsCalendar />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 glass-card rounded-lg border shadow-none">
              <CardHeader>
                <CardTitle>Pacientes recientes</CardTitle>
                <CardDescription>Ultimos 10 pacientes atendidos</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientsList />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Revenue />
            <AppointmentTypes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
