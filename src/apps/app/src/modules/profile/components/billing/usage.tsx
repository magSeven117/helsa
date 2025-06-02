import { Card } from '@helsa/ui/components/card';
import { Skeleton } from '@helsa/ui/components/skeleton';

export function getPlanData(
  meters: {
    consumedUnits: number;
    creditedUnits: number;
    meter: {
      name: string;
    };
  }[],
  plan: string,
) {
  const planData: Record<
    string,
    {
      current: number;
      max: number;
      unlimited: boolean;
      disabled: boolean;
    }
  > = {
    ai_usage: {
      current: meters.find((m) => m.meter.name === 'AI usage')?.consumedUnits || 0,
      max: meters.find((m) => m.meter.name === 'AI usage')?.creditedUnits || 0, // This will be set based on the plan
      unlimited: plan === 'pro', // This will be set based on the plan
      disabled: false, // This will be set based on the plan
    },
    monthly_appointments: {
      current: meters.find((m) => m.meter.name === 'Monthly Appointments')?.consumedUnits || 0,
      max: meters.find((m) => m.meter.name === 'Monthly Appointments')?.creditedUnits || 0, // This will be set based on the plan
      unlimited: plan === 'pro' || plan === 'standard', // This will be set based on the plan
      disabled: false,
    },
    monthly_reports: {
      current: meters.find((m) => m.meter.name === 'Monthly Reports')?.consumedUnits || 0,
      max: meters.find((m) => m.meter.name === 'Monthly Reports')?.creditedUnits || 0, // This will be set based on the plan
      unlimited: plan === 'pro' || plan === 'standard',
      disabled: false,
    },
    family_members: {
      current: meters.find((m) => m.meter.name === 'Family Members')?.consumedUnits || 0,
      max: meters.find((m) => m.meter.name === 'Family Members')?.creditedUnits || 0, // This will be set based on the plan
      unlimited: false,
      disabled: plan === 'free' || plan === 'standard',
    },
  };

  return planData;
}
interface UsageItemProps {
  label: string;
  current: number;
  max: number;
  unit?: string;
  period?: string;
  percentage?: number;
  unlimited?: boolean;
  disabled?: boolean;
}

function CircularProgress({ value }: { value: number }) {
  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      <svg className="h-6 w-6" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle className="stroke-muted fill-none" cx="18" cy="18" r="16" strokeWidth="4" />
        {/* Progress circle */}
        <circle
          className="stroke-primary fill-none"
          cx="18"
          cy="18"
          r="16"
          strokeWidth="4"
          strokeDasharray={`${value * 0.01 * 100.53} 100.53`}
          strokeDashoffset="0"
          transform="rotate(-90 18 18)"
        />
      </svg>
    </div>
  );
}

function UsageItem({ label, current, max, unit, period, percentage, unlimited, disabled }: UsageItemProps) {
  // Calculate percentage if not explicitly provided
  const calculatedPercentage = percentage !== undefined ? percentage : Math.min((current / max) * 100, 100);

  // Format values differently based on whether we have a unit or not
  let formattedCurrent: string;
  let formattedMax: string;

  if (unit) {
    // For values with units (like GB), show the decimal value
    formattedCurrent = current.toFixed(1).replace(/\.0$/, '');
    formattedMax = max.toFixed(1).replace(/\.0$/, '');
  } else {
    // For counts without units, use k formatting for large numbers
    formattedCurrent = current >= 1000 ? `${(current / 1000).toFixed(1)}k` : current.toString();

    if (max >= 1000000) {
      // If max is large, format it as well
      formattedMax = `${(max / 1000000).toFixed(0)}M`;
    } else if (max >= 1000) {
      formattedMax = `${(max / 1000).toFixed(0)}k`;
      // If max is very large, format it as millions
    } else {
      formattedMax = max.toString();
    }
  }

  return (
    <div className="flex items-center justify-between py-3 px-4">
      <div className="flex items-center gap-4">
        <CircularProgress value={disabled ? 0 : unlimited ? 0 : calculatedPercentage} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {unlimited && !disabled && <span className="text-sm text-muted-foreground">Ilimitados</span>}
      {!unlimited && !disabled && (
        <div className="text-sm text-muted-foreground">
          {formattedCurrent} / {formattedMax} {unit} {period && <span>per {period}</span>}
        </div>
      )}
      {disabled && (
        <div className="text-sm text-muted-foreground">
          <span className="line-through">
            {formattedCurrent} / {formattedMax} {unit}
          </span>{' '}
          (Mejora tu plan para desbloquear)
        </div>
      )}
    </div>
  );
}

export function Usage({
  meters,
  plan,
}: {
  plan: string;
  meters: {
    consumedUnits: number;
    creditedUnits: number;
    meter: {
      name: string;
    };
  }[];
}) {
  const data = getPlanData(meters, plan);
  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Uso</h2>
      <Card className="divide-y">
        <UsageItem
          label="Tokens de uso de IA"
          current={data.ai_usage.current}
          max={data.ai_usage.max}
          disabled={data.ai_usage.disabled}
          unlimited={data.ai_usage.unlimited}
          period="mes"
        />
        <UsageItem
          label="Citas mensuales"
          current={data.monthly_appointments.current}
          max={data.monthly_appointments.max}
          disabled={data.monthly_appointments.disabled}
          unlimited={data.monthly_appointments.unlimited}
          period="mes"
        />
        <UsageItem
          label="Reportes emocionales"
          current={data.monthly_reports.current}
          max={data.monthly_reports.max}
          disabled={data.monthly_reports.disabled}
          unlimited={data.monthly_reports.unlimited}
          period="mes"
        />
        <UsageItem
          label="Miembros de la familia"
          current={data.family_members.current}
          max={data.family_members.max}
          disabled={data.family_members.disabled}
          unlimited={data.family_members.unlimited}
        />
      </Card>
    </div>
  );
}

export function UsageSkeleton() {
  // Define labels to use for keys instead of array indices
  const skeletonItems = [
    'users',
    'connections',
    // "storage",
    'inbox',
    'invoices',
  ];

  return (
    <div>
      <h2 className="text-lg font-medium leading-none tracking-tight mb-4">Usage</h2>

      <Card className="divide-y rounded-none">
        {skeletonItems.map((item) => (
          <div key={item} className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </Card>
    </div>
  );
}
