'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { DialogTitle } from '@/libs/shadcn-ui/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/libs/shadcn-ui/components/sheet';
import { useState } from 'react';

type DaySchedule = {
  [key: string]: string[];
};

type WeekSchedule = {
  [key: string]: DaySchedule;
};

export default function DoctorScheduleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<WeekSchedule>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleAddTime = () => {
    if (selectedDay && selectedTime) {
      setSchedule((prev) => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedTime]: [],
        },
      }));
    }
  };

  const handleRemoveTime = (day: string, time: string) => {
    setSchedule((prev) => {
      const newDay = { ...prev[day] };
      delete newDay[time];
      return { ...prev, [day]: newDay };
    });
  };

  const renderSchedule = () => {
    return days.map((day) => (
      <div key={day} className="mb-4">
        <h3 className="font-semibold mb-2">{day}</h3>
        {schedule[day] && Object.keys(schedule[day]).length > 0 ? (
          <div className="grid grid-cols-3 flex-wrap gap-2">
            {Object.keys(schedule[day]).map((time) => (
              <div
                key={time}
                className="flex items-center justify-center bg-background rounded-none border px-3 col-span-1 py-1"
              >
                <span className="mr-2">{time}</span>
                <button onClick={() => handleRemoveTime(day, time)} className="text-red-500 hover:text-red-700">
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">No time slot available</span>
        )}
      </div>
    ));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Create Doctor Schedule</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/2 sm:max-w-full overflow-y-scroll styled-scroll">
        <SheetHeader>
          <DialogTitle>Agrega tu disponibilidad</DialogTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={(value) => setSelectedDay(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedTime(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddTime} disabled={!selectedDay || !selectedTime}>
            Add Time Slot
          </Button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>
          <div className="grid grid-cols-3 gap-4">{renderSchedule()}</div>
        </div>
        <Button className="mt-4" onClick={() => setIsOpen(false)}>
          Save Schedule
        </Button>
      </SheetContent>
    </Sheet>
  );
}
