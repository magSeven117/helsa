import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Activity, Heart, TreesIcon as Lungs, Thermometer, Weight } from 'lucide-react';
type Props = {
  appointment: Primitives<Appointment>;
  toggle: VoidFunction;
};
type PatientVitals = {
  heartRate: number;
  temperature: number;
  bloodPressure: string;
  weight: number;
  systolic: number;
  diastolic: number;
  respiratoryRate: number;
  oxygenSaturation: number;
};

const mockPatientData: PatientVitals = {
  heartRate: 72,
  temperature: 36.6,
  bloodPressure: '120/80',
  weight: 120,
  systolic: 120,
  diastolic: 80,
  respiratoryRate: 16,
  oxygenSaturation: 98,
};
const VitalsInfo = ({ appointment, toggle }: Props) => {
  return (
    <div className="flex justify-between flex-col gap-4 flex-1">
      <div className="grid grid-cols-2 gap-4 py-4">
        <VitalSign
          icon={<Heart className="h-5 w-5" />}
          label="Ritmo Cardíaco"
          value={appointment.telemetry?.heartRate ?? mockPatientData.heartRate}
          unit="bpm"
          max={100}
          min={60}
        />
        <VitalSign
          icon={<Thermometer className="h-5 w-5" />}
          label="Temperatura"
          value={appointment.telemetry?.temperature ?? mockPatientData.temperature}
          unit="°C"
          max={37.5}
          min={36}
        />
        <VitalSign
          icon={<Activity className="h-5 w-5" />}
          label="Presión"
          value={appointment.telemetry?.bloodPressure ?? mockPatientData.bloodPressure}
          unit="mmHg"
          max={140}
          min={90}
        />
        <VitalSign
          icon={<Weight className="h-5 w-5" />}
          label="Peso"
          value={appointment.telemetry?.weight ?? mockPatientData.weight}
          unit="kg"
          max={100}
          min={50}
        />
        <VitalSign
          icon={<Lungs className="h-5 w-5" />}
          label="Frec. Respiratoria"
          value={mockPatientData.respiratoryRate}
          unit="rpm"
          max={20}
          min={12}
        />
        <VitalSign
          icon={<Activity className="h-5 w-5" />}
          label="Saturación O2"
          value={mockPatientData.oxygenSaturation}
          unit="%"
          max={100}
          min={95}
        />
      </div>
      <Button onClick={toggle}>
        <Heart className="size-4" />
        Informar signos vitales
      </Button>
    </div>
  );
};

export default VitalsInfo;

function VitalSign({
  icon,
  label,
  value,
  unit,
  max,
  min,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  max: number;
  min: number;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const status = value < min || value > max ? 'critical' : 'normal';

  return (
    <div className="relative overflow-hidden  border p-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${status === 'critical' ? 'bg-red-500' : 'bg-green-500'}`}>{icon}</div>
          <span className="font-medium text-sm ">{label}</span>
        </div>
        <span className={`text-lg font-bold ${status === 'critical' ? 'text-red-500' : 'text-greenbg-green-500'}`}>
          {value} {unit}
        </span>
      </div>
      <div className="w-full bg-secondary-foreground/20 rounded-full h-2 mb-2">
        <div
          className={`h-full rounded-full ${status === 'critical' ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: `${percentage > 100 ? 100 : percentage}%`, transition: 'width 1s ease-in-out' }}
        />
      </div>
      <div className="flex justify-between text-xs text-secondary-foreground/70">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
