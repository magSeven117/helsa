'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { BotCard } from '../messages';

export const ListDoctors = ({ data }: { data: Primitives<Doctor>[] }) => {
  return (
    <BotCard className="space-y-4">
      {data.length === 0 && <p className="text-md">No encontré doctores disponibles</p>}
      {data.length > 0 && <p className="text-md">Encontré estos doctores disponibles</p>}
      {data.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {data.map((doctor: Primitives<Doctor>) => (
            <Link
              href={`/book?id=${doctor.id}`}
              key={doctor.id}
              className="p-4 border rounded-lg shadow-sm flex flex-col items-start gap-1"
            >
              <div className="flex w-full ">
                <img src={doctor.user?.image} alt="" className="h-16" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{doctor.user?.name}</h3>
                <div className="flex items-center justify-start gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-3 font-bold ${
                        doctor.score > index ? 'text-color-brand-primary' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </BotCard>
  );
};
