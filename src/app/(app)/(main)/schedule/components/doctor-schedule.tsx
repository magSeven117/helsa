'use client';

import { Check, ChevronDown, Clock, Loader2 } from 'lucide-react';
import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/libs/shadcn-ui/components/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/libs/shadcn-ui/components/alert-dialog';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/libs/shadcn-ui/components/command';
import { Label } from '@/libs/shadcn-ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/shadcn-ui/components/popover';
import { Switch } from '@/libs/shadcn-ui/components/switch';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { Schedule } from '@/modules/doctor/domain/schedule';
import { useCreateSchedule } from '@/modules/doctor/presentation/graphql/hooks/use-create-schedule';
import { Primitives } from '@/modules/shared/domain/types/primitives';
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

export default function DoctorSchedule({ doctorId, schedule, setIsOpen }: DoctorScheduleProps) {
  const { createSchedule, loading, error, reset } = useCreateSchedule();
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

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
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

  const save = async () => {
    try {
      await createSchedule({
        variables: {
          doctorId: doctorId,
          days: Object.entries(selectedHours).map(([day, hours]) => ({
            day,
            hours: hours.map((hour) => ({ hour })),
          })),
        },
      });
      setIsOpen?.(false);
    } catch (error) {
      toast.error('Error al guardar el horario');
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-between flex-1">
      <div className="flex flex-col gap-5 max-h-[600px] overflow-y-scroll no-scroll border p-3">
        {Object.entries(enabledDays).map(([day, enabled]: [string, boolean]) => (
          <div key={day} className="space-y-4 rounded-none border px-3 py-3 flex flex-col items-center justify-center">
            <div className="flex items-center justify-between gap-3 w-full">
              <Label htmlFor={day} className="text-sm capitalize ">
                {daysLocale[day as keyof typeof daysLocale]}
              </Label>
              <Switch className="" id={day} checked={enabled} onCheckedChange={() => toggleDay(day)} />
            </div>
            {enabled && (
              <Accordion type="multiple" className="w-full border-none">
                <AccordionItem value={`hours-${day}`} className="border-none">
                  <AccordionTrigger className="hover:no-underline text-xs">Ver horas</AccordionTrigger>
                  <AccordionContent className="flex flex-col w-full gap-3 ">
                    <div className="w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="h-10 border   rounded-none w-full">
                            Agrega horas a tu dia
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[371px] p-0 rounded-none" align="end">
                          <Command>
                            <CommandInput placeholder="Search hour..." />
                            <CommandList>
                              <CommandEmpty>No hour found.</CommandEmpty>
                              <CommandGroup>
                                {hours.map((hour) => (
                                  <CommandItem key={hour.value} onSelect={() => handleHourAdd(day, hour.value)}>
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        selectedHours[day]?.includes(hour.value) ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {hour.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full">
                      {selectedHours[day]?.map((hour) => (
                        <Button
                          key={hour}
                          variant="outline"
                          size="sm"
                          onClick={() => handleHourRemove(day, hour)}
                          className="gap-2 rounded-none"
                        >
                          <Clock className="h-4 w-4" />
                          {hour}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={save} disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : 'Guardar horario'}
      </Button>
      <AlertDialog open={error ? true : false}>
        <AlertDialogContent className="sm:rounded-none">
          <AlertDialogHeader className="rounded-none">
            <AlertDialogTitle>Ups, error.</AlertDialogTitle>
            <AlertDialogDescription>Error al guardar el horario, por favor intenta de nuevo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button className="rounded-none" variant={'default'} onClick={reset}>
                Entendido
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
