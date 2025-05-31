import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Progress } from '@helsa/ui/components/progress';
import { Pill } from 'lucide-react';

const medications = [
  {
    id: 1,
    name: 'Sertralina',
    dosage: '50mg',
    frequency: '1 vez al día',
    startDate: '15 Enero 2024',
    prescriber: 'Dr. Ana Martínez',
    status: 'Activo',
    adherence: 95,
  },
  {
    id: 2,
    name: 'Lorazepam',
    dosage: '0.5mg',
    frequency: 'Según necesidad',
    startDate: '20 Enero 2024',
    prescriber: 'Dr. Ana Martínez',
    status: 'Activo',
    adherence: 80,
  },
];

const Treatments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicaciones</CardTitle>
        <CardDescription>Medicamentos actuales y adherencia al tratamiento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    {med.name} {med.dosage}
                  </h3>
                  <p className="text-sm text-muted-foreground">{med.frequency}</p>
                </div>
                <Badge variant={med.status === 'Activo' ? 'default' : 'secondary'}>{med.status}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Inicio:</span>
                  <p>{med.startDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Prescriptor:</span>
                  <p>{med.prescriber}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Adherencia:</span>
                  <p>{med.adherence}%</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Adherencia al tratamiento</span>
                  <span>{med.adherence}%</span>
                </div>
                <Progress value={med.adherence} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Treatments;
