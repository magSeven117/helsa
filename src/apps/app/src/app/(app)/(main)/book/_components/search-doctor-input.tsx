'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Input } from '@helsa/ui/components/input';
import { cn } from '@helsa/ui/lib/utils';
import { Briefcase, CalendarDays, ListFilter, Search, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Calendar } from '@helsa/ui/components/calendar';
import { formatISO, isValid } from 'date-fns';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { z } from 'zod';
import { useSpecialties } from '../../../../../modules/profile/hooks/use-doctor';
import ExperienceRange from './filter-experience-range';
import RateRange from './filter-rate-range';
import DoctorFilterList from './search-doctor-filters';
const defaultSearch = {
  q: null,
  availability: null,
  minRate: null,
  experience: null,
};

const parseDateSchema = z
  .date()
  .transform((value) => new Date(value))
  .transform((v) => isValid(v))
  .refine((v) => !!v, { message: 'Invalid date' });
const filterDoctorSchema = z.object({
  name: z.string().optional().describe('The name to search for'),
  availability: parseDateSchema.optional().describe('The date to filter by. Return ISO-8601 format.'),
  specialties: z.array(z.string()).optional().describe('The medical specialties to filter by'),
  minRate: z.number().optional().describe('The min score rate to filter by'),
  experience: z.number().optional().describe('The minimal experience years to filter by'),
});

const SearchDoctorInput = () => {
  const { specialties } = useSpecialties();
  const [prompt, setPrompt] = useState('');
  const [filters, setFilters] = useQueryStates(
    {
      q: parseAsString,
      availability: parseAsString,
      minRate: parseAsInteger,
      experience: parseAsInteger,
    },
    {
      shallow: false,
    },
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setPrompt(value);
    } else {
      setPrompt('');
      setFilters(defaultSearch);
    }
  };

  const { object, submit, isLoading } = useObject({
    api: '/api/v1/appointment/filters',
    schema: filterDoctorSchema,
  });

  useEffect(() => {
    setFilters((prev) => ({
      q: (object as any)?.name ?? null,
      minRate: (object as any)?.minRate ?? null,
      experience: (object as any)?.experience ?? null,
    }));
  }, [object]);

  useHotkeys(
    'esc',
    () => {
      setPrompt('');
      setFilters(defaultSearch);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
    },
  );

  return (
    <DropdownMenu>
      <div className="flex  md:items-center w-full flex-col md:flex-row gap-2">
        <form
          action=""
          className="relative w-full lg:w-fit"
          onSubmit={(e) => {
            e.preventDefault();
            if (prompt.split(' ').length > 1) {
              submit({
                prompt,
                context: `
                  specialties: ${specialties.map((s) => s.name).join(', ')}
                `,
              });
            } else {
              setFilters({ q: prompt.length > 0 ? prompt : null });
            }
          }}
        >
          <Search className="absolute pointer-events-none left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            value={prompt}
            onChange={handleSearch}
            className="pl-9 w-full lg:w-[350px] pr-8 rounded-md h-9 focus-visible:outline-none focus-visible:ring-0"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Busca o filtra"
          />
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                'absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-0',
                isOpen && 'opacity-100',
              )}
            >
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <DoctorFilterList filters={filters} onRemove={setFilters} loading={isLoading} specialties={specialties} />
      </div>
      <DropdownMenuContent className="rounded-md w-[350px]" align="end" sideOffset={19} alignOffset={-11} side="bottom">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-md">
            <CalendarDays className="size-4 mr-2" />
            <span>Disponibilidad en</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 rounded-md">
              <Calendar
                mode="single"
                initialFocus
                fromDate={new Date()}
                selected={filters.availability ? new Date(`${filters.availability} 00:00:00`) : new Date()}
                onSelect={(date) => {
                  setFilters({ availability: formatISO(date!, { representation: 'date' }) });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-md">
            <Star className="size-4 mr-2" />
            <span>Calificación minima</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 rounded-md w-[250px] min-h-[150px]">
              <RateRange
                onSelect={(min) => {
                  setFilters({ minRate: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-md">
            <Briefcase className="size-4 mr-2" />
            <span>Experiencia minima</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 rounded-md w-[250px] min-h-[150px]">
              <ExperienceRange
                onSelect={(min) => {
                  setFilters({ experience: min });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDoctorInput;
