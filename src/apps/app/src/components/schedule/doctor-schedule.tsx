'use client';

import { Clock, Loader2 } from 'lucide-react';
import * as React from 'react';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Schedule } from '@helsa/engine/doctor/domain/schedule';
import { saveSchedule } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { Button } from '@helsa/ui/components/button';
import { Label } from '@helsa/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { Switch } from '@helsa/ui/components/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { cn } from '@helsa/ui/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type DoctorScheduleProps = {
  doctorId: string;
  schedule: Primitives<Schedule>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const daysLocale = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export default function DoctorSchedule({ doctorId, schedule }: DoctorScheduleProps) {
  const [selectedHours, setSelectedHours] = React.useState<{ [key: string]: string[] }>({
    monday: schedule.days.find((day) => day.day === 'monday')?.hours.map((hour) => hour.hour) ?? [],
    tuesday: schedule.days.find((day) => day.day === 'tuesday')?.hours.map((hour) => hour.hour) ?? [],
    wednesday: schedule.days.find((day) => day.day === 'wednesday')?.hours.map((hour) => hour.hour) ?? [],
    thursday: schedule.days.find((day) => day.day === 'thursday')?.hours.map((hour) => hour.hour) ?? [],
    friday: schedule.days.find((day) => day.day === 'friday')?.hours.map((hour) => hour.hour) ?? [],
    saturday: schedule.days.find((day) => day.day === 'saturday')?.hours.map((hour) => hour.hour) ?? [],
    sunday: schedule.days.find((day) => day.day === 'sunday')?.hours.map((hour) => hour.hour) ?? [],
  });

  const [enabledDays, setEnabledDays] = React.useState<{ [key: string]: boolean }>({
    monday: schedule.days.find((day) => day.day === 'monday')!.hours.length > 0,
    tuesday: schedule.days.find((day) => day.day === 'tuesday')!.hours.length > 0,
    wednesday: schedule.days.find((day) => day.day === 'wednesday')!.hours.length > 0,
    thursday: schedule.days.find((day) => day.day === 'thursday')!.hours.length > 0,
    friday: schedule.days.find((day) => day.day === 'friday')!.hours.length > 0,
    saturday: schedule.days.find((day) => day.day === 'saturday')!.hours.length > 0,
    sunday: schedule.days.find((day) => day.day === 'sunday')!.hours.length > 0,
  });

  const hours = Array.from({ length: 15 }, (_, i) => {
    const hour = (i + 7).toString().padStart(2, '0');
    return { label: `${hour}:00`, value: `${hour}:00` };
  });

  const handleHourAdd = (day: string, hour: string) => {
    if (selectedHours[day]?.includes(hour)) {
      handleHourRemove(day, hour);
      return;
    }
    setSelectedHours((prev) => ({
      ...prev,
      [day]: [...prev[day]!, hour].sort(),
    }));
  };

  const handleHourRemove = (day: string, hour: string) => {
    setSelectedHours((prev) => ({
      ...prev,
      [day]: prev[day]!.filter((h) => h !== hour),
    }));
  };

  const toggleDay = (day: string) => {
    setEnabledDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
    if (enabledDays[day]) {
      setSelectedHours((prev) => ({
        ...prev,
        [day]: [],
      }));
    }
  };

  const [duration, setDuration] = React.useState('30');
  const [maxDaysInAdvance, setMaxDaysInAdvance] = React.useState('7');

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await saveSchedule({
        doctorId: doctorId,
        days: Object.entries(selectedHours).map(([day, hours]) => ({
          day,
          hours: hours.map((hour) => ({ hour })),
        })),
        duration: parseInt(duration),
        maxAppointment: parseInt(maxDaysInAdvance),
      });
    },
    onSuccess: () => {
      toast.success('Horario guardado correctamente');
    },
    onError: (error) => {
      toast.error(`Error al guardar el horario: ${error.message}`);
    },
  });

  return (
    <div className="flex flex-col gap-5 justify-between flex-1">
      <div className="flex">
        <Button className="mt-4" onClick={() => mutate()} disabled={isPending} variant="outline">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Guardar horario'}
        </Button>
      </div>
      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">
            <span className="text-sm">Horario</span>
          </TabsTrigger>
          <TabsTrigger value="conf">
            <span className="text-sm">Configuration</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="flex flex-col gap-5 max-h-[600px] overflow-y-scroll no-scroll">
          {Object.entries(enabledDays).map(([day, enabled]: [string, boolean]) => (
            <div key={day} className="space-y-4 rounded-lg border px-3 py-3 flex flex-col items-center justify-center">
              <div className="flex items-center justify-between gap-3 w-full">
                <Label htmlFor={day} className="text-sm capitalize ">
                  {daysLocale[day as keyof typeof daysLocale]}
                </Label>
                <Switch className="" id={day} checked={enabled} onCheckedChange={() => toggleDay(day)} />
              </div>
              {enabled && (
                <div className="flex flex-wrap gap-2 w-full">
                  {hours?.map((hour) => (
                    <Button
                      key={hour.value}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedHours[day]?.includes(hour.value)) {
                          handleHourRemove(day, hour.value);
                          return;
                        }
                        handleHourAdd(day, hour.value);
                      }}
                      className={cn('gap-2', {
                        'bg-primary text-primary-foreground hover:bg-primary/80': selectedHours[day]?.includes(
                          hour.value,
                        ),
                        'text-muted-foreground': !selectedHours[day]?.includes(hour.value),
                      })}
                    >
                      <Clock className="h-4 w-4" />
                      {hour.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
        <TabsContent value="conf">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="defaultSessionDuration" className="text-sm">
                Duración de sesiones
              </Label>
              <Select value={duration} onValueChange={(value) => setDuration(value)}>
                <SelectTrigger id="defaultSessionDuration" className="h-8 text-xs">
                  <SelectValue placeholder="Seleccionar duración" />
                </SelectTrigger>
                <SelectContent>
                  {[30, 45, 60, 90, 120].map((duration) => (
                    <SelectItem key={duration} value={duration.toString()} className="text-xs">
                      {duration} minutos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxDaysInAdvance" className="text-sm">
                Máximo de citas por día
              </Label>
              <Select value={maxDaysInAdvance} onValueChange={(value) => setMaxDaysInAdvance(value)}>
                <SelectTrigger id="maxDaysInAdvance" className="h-8 text-xs">
                  <SelectValue placeholder="Seleccionar cantidad" />
                </SelectTrigger>
                <SelectContent>
                  {[7, 14, 30, 60, 90].map((days) => (
                    <SelectItem key={days} value={days.toString()} className="text-xs">
                      {days} citas
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
