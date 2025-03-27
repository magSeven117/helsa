import { Pencil } from 'lucide-react';

export function VitalSign({
  icon,
  label,
  value,
  unit,
  max,
  min,
  toggle,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  max: number;
  min: number;
  toggle?: VoidFunction;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const status = value < min || value > max ? 'critical' : 'normal';

  return (
    <div className="relative overflow-hidden  border p-4 rounded-xl">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${status === 'critical' ? 'bg-red-500' : 'bg-green-500'}`}>{icon}</div>
          <div className="flex flex-col">
            <span className="font-medium text-sm ">{label}</span>
            <span className={`text-lg font-bold ${status === 'critical' ? 'text-red-500' : 'text-greenbg-green-500'}`}>
              {value} {unit}
            </span>
          </div>
        </div>
        <div onClick={toggle} className="cursor-pointer">
          <Pencil className="size-4" />
        </div>
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
