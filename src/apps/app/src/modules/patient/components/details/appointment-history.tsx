import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Calendar } from 'lucide-react';

const appointments = [
  {
    id: 1,
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'Consulta de seguimiento',
    therapist: 'Dr. Ana Martínez',
    status: 'Completada',
    notes: 'Paciente muestra mejoría en síntomas de ansiedad',
  },
  {
    id: 2,
    date: '2024-03-08',
    time: '2:30 PM',
    type: 'Terapia grupal',
    therapist: 'Lic. Roberto Silva',
    status: 'Completada',
    notes: 'Participación activa en sesión grupal',
  },
  {
    id: 3,
    date: '2024-03-22',
    time: '11:00 AM',
    type: 'Evaluación psiquiátrica',
    therapist: 'Dr. Ana Martínez',
    status: 'Programada',
    notes: 'Revisión de medicación',
  },
];

const AppointmentHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Citas</CardTitle>
        <CardDescription>Registro completo de citas médicas y terapéuticas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-violet-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{apt.type}</h3>
                  <Badge variant={apt.status === 'Completada' ? 'secondary' : 'default'}>{apt.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {apt.date} - {apt.time} | {apt.therapist}
                </p>
                <p className="text-sm">{apt.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentHistory;
