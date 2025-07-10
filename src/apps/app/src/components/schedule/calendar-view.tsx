'use client';

import { addDays, addWeeks, format, isSameDay, startOfWeek, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card } from '@helsa/ui/components/card';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { AppointmentDialog } from './appointment-dialog';

// Datos de ejemplo para las citas
const APPOINTMENTS = [
  {
    id: 1,
    patientName: 'María García',
    date: new Date(2025, 4, 21, 9, 0),
    duration: 60,
    type: 'Terapia Individual',
    notes: 'Primera sesión',
    status: 'confirmed',
  },
  {
    id: 2,
    patientName: 'Juan Pérez',
    date: new Date(2025, 4, 21, 11, 0),
    duration: 60,
    type: 'Evaluación',
    notes: 'Seguimiento mensual',
    status: 'confirmed',
  },
  {
    id: 3,
    patientName: 'Ana Martínez',
    date: new Date(2025, 4, 22, 10, 0),
    duration: 45,
    type: 'Terapia Individual',
    notes: '',
    status: 'confirmed',
  },
  {
    id: 4,
    patientName: 'Carlos Rodríguez',
    date: new Date(2025, 4, 23, 16, 0),
    duration: 60,
    type: 'Terapia de Pareja',
    notes: 'Con su esposa Laura',
    status: 'confirmed',
  },
  {
    id: 5,
    patientName: 'Sofía López',
    date: new Date(2025, 4, 24, 14, 30),
    duration: 45,
    type: 'Terapia Individual',
    notes: 'Problemas de ansiedad',
    status: 'confirmed',
  },
];

// Horas de trabajo
const WORK_HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 8am a 6pm

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewAppointment, setIsNewAppointment] = useState(false);

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Semana comienza el lunes
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startDate, i)); // Lunes a viernes

  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const handleNewAppointment = (day: any, hour: any) => {
    const appointmentDate = new Date(day);
    appointmentDate.setHours(hour);
    appointmentDate.setMinutes(0);

    setSelectedAppointment({
      id: null,
      patientName: '',
      date: appointmentDate,
      duration: 60,
      type: 'Terapia Individual',
      notes: '',
      status: 'pending',
    });
    setIsNewAppointment(true);
    setIsDialogOpen(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsNewAppointment(false);
    setIsDialogOpen(true);
  };

  const getAppointmentsForDayAndHour = (day: Date, hour: any) => {
    return APPOINTMENTS.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === day.getDate() &&
        appointmentDate.getMonth() === day.getMonth() &&
        appointmentDate.getFullYear() === day.getFullYear() &&
        appointmentDate.getHours() === hour
      );
    });
  };

  const isToday = (day: Date) => {
    return isSameDay(day, new Date());
  };

  return (
    <Card className="overflow-hidden  p-0 shadow-none">
      <div className="flex items-center justify-between  p-4">
        <Button variant="outline" size="icon" onClick={handlePrevWeek} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">{format(startDate, 'MMMM yyyy', { locale: es })}</div>
        <Button variant="outline" size="icon" onClick={handleNextWeek} className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-6  divide-x border-t ">
        {/* Columna de horas */}
        <div className="">
          <div className="h-12 border-b "></div>
          {WORK_HOURS.map((hour) => (
            <div key={hour} className="h-24 border-b  px-2 py-1 text-xs t">
              {`${hour}:00`}
            </div>
          ))}
        </div>

        {/* Columnas de días */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className={`w-full`}>
            <div className={`h-12 border-b  p-2 text-center ${isToday(day) ? 'bg-emerald-500/30' : ''}`}>
              <div className="text-xs font-medium">{format(day, 'EEEE', { locale: es })}</div>
              <div className={`text-sm font-bold ${isToday(day) ? 'text-emerald-500' : ''}`}>
                {format(day, 'd', { locale: es })}
              </div>
            </div>

            {WORK_HOURS.map((hour) => {
              const appointments = getAppointmentsForDayAndHour(day, hour);
              return (
                <div key={`${dayIndex}-${hour}`} className="h-24 border-b  p-1">
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        onClick={() => handleEditAppointment(appointment)}
                        className="flex h-full cursor-pointer flex-col justify-between rounded-sm border p-1 text-xs shadow-sm transition-all hover:bg-white hover:border-black hover:text-black group"
                      >
                        <div className="font-medium text-violet-500 truncate">{appointment.patientName}</div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-[10px] group-hover:text-black">
                            {appointment.type}
                          </Badge>
                          <span className="text-[10px]">{appointment.duration}m</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <button
                      className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-slate-200 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      onClick={() => handleNewAppointment(day, hour)}
                    >
                      <Plus className="h-3 w-3 text-slate-400" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <AppointmentDialog
          appointment={selectedAppointment}
          isOpen={isDialogOpen}
          isNew={isNewAppointment}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </Card>
  );
}
