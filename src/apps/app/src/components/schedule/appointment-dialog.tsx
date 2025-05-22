'use client';

import { Button } from '@helsa/ui/components/button';
import { Calendar } from '@helsa/ui/components/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@helsa/ui/components/dialog';
import { Input } from '@helsa/ui/components/input';
import { Label } from '@helsa/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { Textarea } from '@helsa/ui/components/textarea';
import { cn } from '@helsa/ui/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';

const appointmentTypes = [
  'Terapia Individual',
  'Terapia de Pareja',
  'Terapia Familiar',
  'Evaluación Psicológica',
  'Sesión de Seguimiento',
  'Primera Consulta',
  'Otro',
];

const durations = [30, 45, 60, 90, 120];

export function AppointmentDialog({ appointment, isOpen, isNew, onClose }: any) {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    date: appointment?.date || new Date(),
    duration: appointment?.duration || 60,
    type: appointment?.type || 'Terapia Individual',
    notes: appointment?.notes || '',
    status: appointment?.status || 'pending',
  });

  const handleChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la cita
    console.log('Guardando cita:', formData);
    onClose();
  };

  const handleDelete = () => {
    // Aquí iría la lógica para eliminar la cita
    console.log('Eliminando cita:', appointment?.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isNew ? 'Nueva Cita' : 'Editar Cita'}</DialogTitle>
            <DialogDescription>Complete los detalles de la cita</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="patientName" className="text-right text-xs">
                Paciente
              </Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleChange('patientName', e.target.value)}
                className="col-span-3 h-8 text-sm"
                placeholder="Nombre del paciente"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label className="text-right text-xs">Fecha</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left text-sm font-normal',
                        !formData.date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {formData.date ? format(formData.date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleChange('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label className="text-right text-xs">Hora</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('w-full justify-start text-left text-sm font-normal')}>
                      <Clock className="mr-2 h-3.5 w-3.5" />
                      {formData.date ? format(formData.date, 'HH:mm') : <span>Seleccionar hora</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                        <Button
                          key={hour}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            const newDate = new Date(formData.date);
                            newDate.setHours(hour);
                            newDate.setMinutes(0);
                            handleChange('date', newDate);
                          }}
                        >
                          {`${hour}:00`}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="duration" className="text-right text-xs">
                Duración
              </Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) => handleChange('duration', Number.parseInt(value))}
              >
                <SelectTrigger className="col-span-3 h-8 text-sm">
                  <SelectValue placeholder="Seleccionar duración" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration.toString()} className="text-sm">
                      {duration} minutos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="type" className="text-right text-xs">
                Tipo
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger className="col-span-3 h-8 text-sm">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-sm">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="notes" className="text-right text-xs">
                Notas
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="col-span-3 text-sm"
                placeholder="Notas adicionales"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {!isNew && (
              <Button type="button" variant="destructive" size="sm" onClick={handleDelete} className="h-8 text-xs">
                Eliminar
              </Button>
            )}
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="h-8 text-xs">
                Cancelar
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs">
                {isNew ? 'Crear' : 'Guardar'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
