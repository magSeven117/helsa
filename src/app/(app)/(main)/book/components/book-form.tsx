'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Calendar } from '@/libs/shadcn-ui/components/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { format } from 'date-fns';
import { useState } from 'react';

interface Doctor {
  doctorId: string;
  name: string;
  specialty: string;
  image: string;
  score: number;
}

interface TimeSlot {
  id: string;
  time: string;
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00' },
  { id: '2', time: '10:00' },
  { id: '3', time: '11:00' },
  { id: '4', time: '12:00' },
  { id: '5', time: '14:00' },
  { id: '6', time: '15:00' },
  { id: '7', time: '16:00' },
  { id: '8', time: '17:00' },
  { id: '8', time: '17:00' },
  { id: '8', time: '17:00' },
  { id: '8', time: '17:00' },
  { id: '8', time: '17:00' },
];

const paymentMethods = [
  { id: 'mobile', name: 'Pago móvil' },
  { id: 'visa', name: 'Visa' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bitcoin', name: 'Bitcoin' },
];

export default function DoctorAppointment({ doctor }: { doctor: Doctor }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();

  const handleSubmit = () => {
    console.log({
      doctor: doctor.name,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      time: selectedSlot,
      symptoms,
    });
  };

  if (!doctor) {
    return null;
  }

  return (
    <div className="w-full mt-10">
      <DoctorInfo doctor={doctor} />
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="h-full w-full flex border rounded-none mt-3"
            classNames={{
              months: 'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
              month: 'space-y-4 w-full flex flex-col',
              table: 'w-full h-full border-collapse space-y-1',
              head_row: '',
              row: 'w-full mt-2',
              cell: 'w-1/7 h-8 text-center cursor-pointer',
            }}
          />
        </div>
        <div className="col-span-1">
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
          <div className="mt-4">
            <Textarea
              placeholder="Describe tus síntomas y la razón de tu consulta aquí"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px] rounded-none"
            />
          </div>
          <div className="mt-4">
            <Select onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full rounded-none">
                <SelectValue placeholder="Selecciona un método de pago" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id} className="rounded-none">
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-4" onClick={handleSubmit} disabled={!date || !selectedSlot || !symptoms}>
            Agendar cita
          </Button>
        </div>
      </div>
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
