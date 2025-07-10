import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { FileText } from 'lucide-react';
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

const Notes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Observaciones Clínicas</CardTitle>
        <CardDescription>Notas y observaciones del equipo médico</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {observations.map((obs) => (
            <div key={obs.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-medium">{obs.type}</h3>
                </div>
                <span className="text-sm text-muted-foreground">{obs.date}</span>
              </div>
              <p className="text-sm mb-2">{obs.content}</p>
              <p className="text-xs text-muted-foreground">Autor: {obs.author}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notes;
