'use client';

import { createAppointment } from '@/app/(server)/actions/appointment/create-appointment';
import { getDoctorAppointments } from '@/app/(server)/actions/appointment/get-doctor-appointments';
import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Button } from '@/libs/shadcn-ui/components/button';
import { DatePicker } from '@/libs/shadcn-ui/components/date-picker';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface Doctor {
  doctorId: string;
  name: string;
  specialty: string;
  image: string;
  score: number;
  days: {
    day: string;
    hours: { hour: string }[];
  }[];
}

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
  symptoms: z.string().min(2, 'Describe tus síntomas'),
  paymentMethod: z.string().min(2, 'Selecciona un método de pago'),
});

export default function DoctorAppointment({ doctor }: { doctor: Doctor }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: '',
      symptoms: '',
      paymentMethod: '',
    },
  });
  const { executeAsync, isPending, hasErrored } = useAction(getDoctorAppointments);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Primitives<Appointment>[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await executeAsync({ doctorId: doctor.doctorId });
      setAppointments(response?.data ?? []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!date) {
      return;
    }

    const hours = doctor.days.find((day) => day.day === format(date, 'EEEE').toLowerCase())?.hours ?? [];
    const availableSlots = hours.filter(
      (hour) => !appointments.some((appointment) => format(appointment.initDate, 'HH:mm') === hour.hour)
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
    try {
      await createAppointment({
        doctorId: doctor.doctorId,
        initDate: new Date(`${format(data.date, 'yyyy-MM-dd')} ${data.time}`),
        symptoms: data.symptoms,
      });
    } catch (error) {
      console.log(error);
      toast.error('Ha ocurrido un error al agendar la cita');
    }
  };

  if (isPending) {
    return <div>Cargando...</div>;
  }

  if (!doctor || hasErrored) {
    return null;
  }

  return (
    <div className="w-full mt-10">
      <DoctorInfo doctor={doctor} />
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1 grid grid-cols-1 gap-3">
              <div className="w-full">
                <DatePicker onSelect={setDate} selected={date} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot === slot.id ? 'default' : 'outline'}
                    onClick={() => setSelectedSlot(slot.id)}
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
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormControl>
                        <Textarea
                          placeholder="Describe tus síntomas y la razón de tu consulta aquí"
                          {...field}
                          className="min-h-[100px] rounded-none"
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
                          <SelectTrigger className="w-full rounded-none">
                            <SelectValue placeholder="Selecciona un método de pago" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id} className="rounded-none">
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
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
              >
                {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Agendar cita'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

function DoctorInfo({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex items-center space-x-4 mb-5">
      <Avatar className="h-16 w-16 border">
        <AvatarImage src={doctor.image} alt={doctor.name} className="object-contain" />
        <AvatarFallback>
          {doctor.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 w-1/3">
        <h2 className="text-xl font-semibold">{doctor.name}</h2>
        <p className="text-muted-foreground">{doctor.specialty}</p>
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
