'use client';

import { Calendar } from '@helsa/ui/components/calendar';
import { Card } from '@helsa/ui/components/card';
import { addDays } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

export function CalendarFilter() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <Card className="rounded-none flex justify-center">
      <Calendar mode="range" selected={date} onSelect={setDate} className="border-none" />
    </Card>
  );
}
