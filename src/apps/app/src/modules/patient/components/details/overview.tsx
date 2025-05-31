import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Progress } from '@helsa/ui/components/progress';
import { Calendar, Clock, Heart, TrendingUp } from 'lucide-react';

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

const observations = [
  {
    id: 1,
    date: '2024-03-15',
    author: 'Dr. Ana Martínez',
    type: 'Evaluación clínica',
    content:
      'Paciente presenta notable mejoría en síntomas de ansiedad. Reporta mejor calidad de sueño y reducción en episodios de pánico. Continúa con adherencia al tratamiento farmacológico.',
  },
  {
    id: 2,
    date: '2024-03-08',
    author: 'Lic. Roberto Silva',
    type: 'Terapia grupal',
    content:
      'Excelente participación en sesión grupal. Compartió experiencias personales y mostró empatía hacia otros miembros del grupo. Desarrollando mejores estrategias de afrontamiento.',
  },
];

const PatientOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progreso general */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progreso General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Adherencia al tratamiento</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Mejoría síntomas</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Asistencia a citas</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Próximas citas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximas Citas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments
              .filter((apt) => apt.status === 'Programada')
              .map((apt) => (
                <div key={apt.id} className="flex items-center bg-secondary gap-3 p-3  rounded-lg">
                  <Clock className="h-4 w-4 " />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{apt.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {apt.date} - {apt.time}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Estado actual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Estado Actual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Diagnóstico principal</span>
              <Badge variant="secondary">TAG</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Severidad</span>
              <Badge variant="outline">Moderado</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Medicaciones activas</span>
              <Badge>2</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Última evaluación</span>
              <span className="text-xs text-muted-foreground">15 Mar 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Últimas observaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {observations.slice(0, 2).map((obs) => (
              <div key={obs.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{obs.type}</h4>
                  <span className="text-xs text-muted-foreground">{obs.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{obs.content}</p>
                <p className="text-xs text-muted-foreground">- {obs.author}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PatientOverview;
