import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Stethoscope, TrendingUp } from 'lucide-react';

const results = [
  {
    id: 1,
    test: 'Escala de Ansiedad de Hamilton (HAM-A)',
    date: '2024-03-15',
    score: '12/56',
    interpretation: 'Ansiedad leve',
    previousScore: '28/56',
    trend: 'mejora',
  },
  {
    id: 2,
    test: 'Inventario de Depresión de Beck (BDI-II)',
    date: '2024-03-15',
    score: '8/63',
    interpretation: 'Mínima depresión',
    previousScore: '18/63',
    trend: 'mejora',
  },
];
const Tests = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados de Evaluaciones</CardTitle>
        <CardDescription>Escalas y pruebas psicológicas aplicadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <h3 className="font-medium">{result.test}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {result.trend === 'mejora' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  <span className="text-sm text-muted-foreground">{result.date}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Puntuación actual:</span>
                  <p className="font-medium">{result.score}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Interpretación:</span>
                  <p className="font-medium">{result.interpretation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Puntuación anterior:</span>
                  <p className="font-medium">{result.previousScore}</p>
                </div>
              </div>
              {result.trend === 'mejora' && (
                <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700">
                  ✓ Mejoría significativa respecto a la evaluación anterior
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tests;
