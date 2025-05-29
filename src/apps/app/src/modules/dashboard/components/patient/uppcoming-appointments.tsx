import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Calendar, Clock, Video } from 'lucide-react';

interface UpcomingAppointmentsProps {
  showAll?: boolean;
}

export function UpcomingAppointments({ showAll = false }: UpcomingAppointmentsProps) {
  const displayAppointments = showAll ? appointments : appointments.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas citas</CardTitle>
        <CardDescription>Tus próximas sesiones programadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAppointments.map((appointment, index) => (
            <div
              key={index}
              className="flex max-sm:flex-col md:items-center md:justify-between p-3 gap-3 rounded-lg border"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={appointment.doctorAvatar || '/placeholder.svg'} alt={appointment.doctorName} />
                <AvatarFallback>{appointment.doctorInitials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{appointment.doctorName}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span className="mr-3">{appointment.date}</span>
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{appointment.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                  className={
                    appointment.status === 'confirmed' ? 'bg-emerald-600 text-foreground hover:text-background' : ''
                  }
                >
                  {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </Badge>
                {appointment.status === 'confirmed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-violet-500 border-violet-600 hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
                  >
                    <Video className="mr-1 h-4 w-4" />
                    Unirse
                  </Button>
                )}
                {appointment.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      Confirmar
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}

          {!showAll && appointments.length > 3 && (
            <Button variant="ghost" className="w-full text-violet-600 hover:text-violet-700 hover:bg-violet-50">
              Ver todas mis citas
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const appointments = [
  {
    doctorName: 'Dr. Martínez',
    doctorInitials: 'DM',
    doctorAvatar: '/placeholder.svg?height=40&width=40',
    date: '22 Mayo, 2023',
    time: '10:00 AM',
    type: 'Terapia individual - 45 minutos',
    status: 'confirmed',
  },
  {
    doctorName: 'Dra. Rodríguez',
    doctorInitials: 'DR',
    doctorAvatar: '/placeholder.svg?height=40&width=40',
    date: '29 Mayo, 2023',
    time: '3:30 PM',
    type: 'Evaluación de seguimiento - 30 minutos',
    status: 'pending',
  },
  {
    doctorName: 'Dr. Martínez',
    doctorInitials: 'DM',
    doctorAvatar: '/placeholder.svg?height=40&width=40',
    date: '5 Junio, 2023',
    time: '11:00 AM',
    type: 'Terapia individual - 45 minutos',
    status: 'confirmed',
  },
  {
    doctorName: 'Dra. López',
    doctorInitials: 'DL',
    doctorAvatar: '/placeholder.svg?height=40&width=40',
    date: '12 Junio, 2023',
    time: '2:00 PM',
    type: 'Consulta de medicación - 20 minutos',
    status: 'confirmed',
  },
  {
    doctorName: 'Dr. Martínez',
    doctorInitials: 'DM',
    doctorAvatar: '/placeholder.svg?height=40&width=40',
    date: '19 Junio, 2023',
    time: '10:00 AM',
    type: 'Terapia individual - 45 minutos',
    status: 'confirmed',
  },
];
