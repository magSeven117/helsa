'use client';

import { Symptom } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentType } from '@helsa/engine/appointment/domain/appointment-type';
import { createAppointment } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Button } from '@helsa/ui/components/button';
import { DatePicker } from '@helsa/ui/components/date-picker';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

interface TimeSlot {
  id: string;
  time: string;
}

const paymentMethods = [
  { id: 'mobile', name: 'Pago móvil' },
  { id: 'visa', name: 'Visa' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bitcoin', name: 'Bitcoin' },
];

const formSchema = z.object({
  date: z.date(),
  time: z.string().min(5, 'Selecciona una hora'),
  motive: z.string().min(2, 'Describe tus síntomas'),
  paymentMethod: z.string().min(2, 'Selecciona un método de pago'),
  priceId: z.string().min(2, 'Selecciona un precio'),
});

export default function DoctorAppointment({
  doctor,
  types,
  symptoms,
}: {
  doctor: Primitives<Doctor>;
  types: Primitives<AppointmentType>[];
  symptoms: Primitives<Symptom>[];
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: '',
      motive: '',
      paymentMethod: '',
      priceId: '',
    },
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const { mutateAsync } = useMutation({
    mutationFn: async (data: {
      date: Date;
      motive: string;
      symptoms: string[];
      doctorId: string;
      typeId: string;
      id: string;
      specialtyId: string;
      priceId: string;
    }) => createAppointment(data),
    onSuccess: (data, variables, context) => {
      toast.success('Cita creada correctamente');
      router.push(`/appointments?id=${variables.id}`);
    },
    onError: (error, variables, context) => {
      console.error('Error creating appointment:', error);
      toast.error('Ha ocurrido un error al agendar la cita');
    },
  });

  useEffect(() => {
    if (!date) {
      return;
    }

    const hours = doctor.schedule?.days.find((day) => day.day === format(date, 'EEEE').toLowerCase())?.hours ?? [];
    const availableSlots = hours.filter(
      (hour) =>
        !doctor.appointments!.some(
          (appointment) => appointment.hour === hour.hour && appointment.day === format(date, 'yyyy-MM-dd'),
        ),
    );
    setTimeSlots(availableSlots.map((hour) => ({ id: hour.hour, time: hour.hour })));
    form.setValue('date', date);
  }, [date]);

  useEffect(() => {
    if (!selectedSlot) {
      return;
    }
    form.setValue('time', selectedSlot);
  }, [selectedSlot]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!doctor) {
      toast.error('No se pudo encontrar el doctor');
      return;
    }

    // Encontrar el precio seleccionado para obtener su typeId
    const selectedPrice = doctor.prices?.find(price => price.id === data.priceId);
    if (!selectedPrice) {
      toast.error('No se pudo encontrar el precio seleccionado');
      return;
    }

    const appointmentId = v4();
    const appointmentData = {
      date: data.date,
      motive: data.motive,
      symptoms: symptoms.map((s) => s.id),
      doctorId: doctor.id,
      typeId: selectedPrice.typeId, // 👉 Usar el typeId del precio seleccionado
      id: appointmentId,
      specialtyId: doctor.specialtyId,
      priceId: data.priceId, // 👉 Este está correcto
    };

    await mutateAsync(appointmentData);
  };

  if (!doctor) {
    return null;
  }

  const finalTypes = [...(doctor.prices ?? [])];

  return (
    <div className="w-full flex flex-col flex-1">
      <DoctorInfo doctor={doctor} />
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex-1  flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <div className="w-full grid grid-cols-2 gap-3">
                <DatePicker onSelect={setDate} selected={date} />
                <FormField
                  control={form.control}
                  name="priceId"
                  render={({ field }) => (
                    <FormItem className="flex-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full rounded-md">
                            <SelectValue placeholder="Tipo de consulta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md">
                          {finalTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id} className="rounded-md">
                              <div className="flex justify-start items-center gap-3">
                                <div
                                  className="size-3"
                                  style={{ backgroundColor: types.find((t) => t.id === type.typeId)?.color }}
                                ></div>
                                {type.name} - ${type.amount}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot === slot.id ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSlot(slot.id);
                      form.setValue('time', slot.time);
                    }}
                    type="button"
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="motive"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormControl>
                        <Textarea
                          placeholder="Describe la razón de tu consulta aquí"
                          {...field}
                          className="min-h-[100px] rounded-md resize-none"
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full rounded-md">
                            <SelectValue placeholder="Selecciona un método de pago" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md">
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id} className="rounded-md">
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Agendar cita'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function DoctorInfo({ doctor }: { doctor: Primitives<Doctor> }) {
  return (
    <div className="flex items-center space-x-4 mb-5">
      <Avatar className="h-16 w-16 bg-secondary">
        <AvatarImage src={doctor.user?.image} alt={doctor.user?.name} className="object-contain" />
        <AvatarFallback>
          {doctor.user?.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 w-1/3">
        <h2 className="text-xl font-semibold">{doctor.user?.name}</h2>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < doctor.score ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
