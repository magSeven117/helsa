import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';

const diagnoses = [
  {
    id: 1,
    primary: true,
    condition: 'Trastorno de Ansiedad Generalizada',
    code: 'F41.1',
    date: '15 Enero 2024',
    severity: 'Moderado',
    status: 'Activo',
  },
  {
    id: 2,
    primary: false,
    condition: 'Episodio Depresivo Leve',
    code: 'F32.0',
    date: '22 Enero 2024',
    severity: 'Leve',
    status: 'En remisión',
  },
];

const Diagnoses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnósticos</CardTitle>
        <CardDescription>Diagnósticos actuales y históricos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {diagnosis.condition}
                    {diagnosis.primary && <Badge variant="default">Principal</Badge>}
                  </h3>
                  <p className="text-sm text-muted-foreground">Código: {diagnosis.code}</p>
                </div>
                <Badge
                  variant={diagnosis.status === 'Activo' ? 'destructive' : 'secondary'}
                  className="text-foreground"
                >
                  {diagnosis.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Fecha de diagnóstico:</span>
                  <p>{diagnosis.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Severidad:</span>
                  <p>{diagnosis.severity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Diagnoses;
