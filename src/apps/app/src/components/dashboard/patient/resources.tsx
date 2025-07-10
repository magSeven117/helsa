import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { BookOpen, Download, ExternalLink, FileText, Video } from 'lucide-react';

interface ResourcesSectionProps {
  expanded?: boolean;
}

export function ResourcesSection({ expanded = false }: ResourcesSectionProps) {
  const displayResources = expanded ? resources : resources.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi progreso</CardTitle>
        <CardDescription>Seguimiento de tu tratamiento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayResources.map((resource, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className="mt-0.5">
                {resource.type === 'article' && <FileText className="h-5 w-5 text-blue-500" />}
                {resource.type === 'video' && <Video className="h-5 w-5 text-red-500" />}
                {resource.type === 'exercise' && <BookOpen className="h-5 w-5 text-teal-600" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium leading-tight">{resource.title}</p>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {resource.type === 'article' && 'Artículo'}
                    {resource.type === 'video' && 'Video'}
                    {resource.type === 'exercise' && 'Ejercicio'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
                <div className="pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                  >
                    {resource.type === 'exercise' ? (
                      <>
                        <Download className="mr-1 h-3 w-3" />
                        Descargar
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Abrir
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {!expanded && resources.length > 3 && (
            <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
              Ver todos los recursos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const resources = [
  {
    title: 'Técnicas de respiración para reducir la ansiedad',
    description:
      'Aprende 5 ejercicios de respiración que puedes practicar en cualquier momento para reducir los síntomas de ansiedad.',
    type: 'exercise',
  },
  {
    title: 'Entendiendo la depresión: causas y tratamientos',
    description:
      'Un artículo completo sobre los factores que contribuyen a la depresión y las opciones de tratamiento disponibles.',
    type: 'article',
  },
  {
    title: 'Meditación guiada para principiantes',
    description:
      'Video de 10 minutos con una meditación guiada ideal para quienes están comenzando a practicar mindfulness.',
    type: 'video',
  },
  {
    title: 'Diario de pensamientos: plantilla y guía',
    description:
      'Herramienta para identificar y desafiar pensamientos negativos automáticos, con instrucciones paso a paso.',
    type: 'exercise',
  },
  {
    title: 'Cómo mejorar la calidad del sueño',
    description: 'Consejos prácticos y hábitos recomendados por especialistas para lograr un descanso reparador.',
    type: 'article',
  },
];
