'use client';
import ImagePicker from '@/libs/ducen-ui/components/image-picker';
import { Badge } from '@/libs/shadcn-ui/components/badge';
import { Calendar } from '@/libs/shadcn-ui/components/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { Textarea } from '@/libs/shadcn-ui/components/textarea';
import { File } from 'lucide-react';
import { useState } from 'react';

const CompleteData = () => {
  const [date, setDate] = useState(new Date());
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { value: 'zinli', label: 'Zinli' },
    { value: 'pago-movil', label: 'Pago móvil' },
    { value: 'debito', label: 'Débito Visa/Master card' },
    { value: 'credito', label: 'Crédito Visa/Master card' },
    { value: 'paypal', label: 'PayPal' },
  ];
  return (
    <div className="">
      <div className="flex flex-col mt-10">
        <div className="flex justify-start items-start gap-3">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <p>
              <span className="font-bold">Selecciona el día y la hora</span> en la que deseas agendar tu citaz
            </p>
            <div className="w-full flex justify-center">
              <Calendar
                selected={date}
                onSelect={setDate}
                mode="single"
                className="h-full w-full flex border rounded-none"
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
            <div className="w-full grid grid-cols-4 gap-3 h-full">
              {hours.map((hour, index) => (
                <Badge
                  key={index}
                  className="items-center justify-center rounded-none bg-background border border-border py-3 cursor-pointer text-foreground hover:bg-sidebar hover:text-foreground"
                >
                  {hour.label}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-2/3 gap-4 px-4 flex flex-col justify-start">
            <div>
              <p className="font-bold">Motivo</p>
              <p className="text-sm text-muted-foreground mb-3">
                Describe brevemente el motivo de tu consulta y cualquier información adicional que consideres relevante
              </p>
              <Textarea className="h-full rounded-none min-h-6" />
            </div>
            <div>
              <ImagePicker value="" />
              <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center justify-center border rounded-none p-3 hover:bg-sidebar hover:border-color-brand-primary cursor-pointer">
                  <File />
                  <div>
                    <p className="text-sm text-muted-foreground text-center">Exámenes de orine</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Select onValueChange={setSelectedMethod} value={selectedMethod}>
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue placeholder="Selecciona un método de pago" />
                </SelectTrigger>
                <SelectContent className='rounded-none'>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const hours = [
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '24:00', label: '24:00' },
];

export default CompleteData;
