import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Progress } from '@helsa/ui/components/progress';
import { cn } from '@helsa/ui/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';
const treatmentGoals = [
  {
    title: 'Reducir síntomas de ansiedad',
    description:
      'Disminuir la frecuencia e intensidad de los ataques de ansiedad mediante técnicas de respiración y mindfulness.',
    completed: true,
  },
  {
    title: 'Mejorar calidad del sueño',
    description: 'Establecer una rutina de sueño saludable y aplicar técnicas de higiene del sueño.',
    completed: false,
  },
  {
    title: 'Desarrollar habilidades de afrontamiento',
    description: 'Aprender a identificar y manejar pensamientos negativos automáticos.',
    completed: false,
  },
  {
    title: 'Fortalecer relaciones interpersonales',
    description: 'Mejorar habilidades de comunicación y establecer límites saludables en relaciones personales.',
    completed: false,
  },
  {
    title: 'Practicar autocuidado diario',
    description: 'Incorporar actividades de autocuidado en la rutina diaria para mejorar el bienestar general.',
    completed: true,
  },
];
interface TreatmentProgressProps {
  expanded?: boolean;
}

const TreatmentProgress = ({ expanded = false }: TreatmentProgressProps) => {
  const displayGoals = expanded ? treatmentGoals : treatmentGoals.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi progreso</CardTitle>
        <CardDescription>Seguimiento de tu tratamiento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso general</span>
              <span className="font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2 bg-gray-200" />
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-medium">Objetivos terapéuticos</h4>

            {displayGoals.map((goal, index) => (
              <div key={index} className="flex items-start space-x-2">
                {goal.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex md:items-center justify-between max-sm:flex-col">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <Badge
                      variant={goal.completed ? 'default' : 'outline'}
                      className={cn('max-sm:w-fit', {
                        'bg-emerald-500 text-white': goal.completed,
                      })}
                    >
                      {goal.completed ? 'Completado' : 'En progreso'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>

          {!expanded && treatmentGoals.length > 3 && (
            <button className="text-sm text-teal-600 hover:text-teal-700 w-full text-center pt-2">
              Ver todos los objetivos
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentProgress;
