'use client';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { AppointmentStatusEnum } from '@helsa/engine/appointment/domain/status';
import { getAppointmentTypes } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { Calendar } from '@helsa/ui/components/calendar';
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
import { useQuery } from '@tanstack/react-query';
import { formatISO, isValid } from 'date-fns';
import { CalendarDays, ListFilter, Route, Search, SquareStack } from 'lucide-react';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { z } from 'zod';
import AppointmentSearchFilters from './appointment-search-filters';
import SelectState from './state-filter';
import SelectType from './type-filter';

const parseDateSchema = z
  .date()
  .transform((value) => new Date(value))
  .transform((v) => isValid(v))
  .refine((v) => !!v, { message: 'Invalid date' });
const filterAppointmentSchema = z.object({
  date: parseDateSchema.optional().describe('The date to filter by. Return ISO-8601 format.'),
  types: z.array(z.string()).optional().describe('The appointment types to filter by'),
  states: z.array(z.string()).optional().describe('The states to filter by'),
});

const defaultSearch = {
  types: null,
  specialties: null,
  start: null,
  end: null,
  states: null,
};

const AppointmentSearchInput = () => {
  const { data: types } = useQuery({
    initialData: [],
    queryKey: ['appointment-types'],
    queryFn: async () => getAppointmentTypes(),
    refetchOnWindowFocus: false,
  });
  const states = [...Object.values(AppointmentStatusEnum)];
  const [prompt, setPrompt] = React.useState('');
  const [filters, setFilters] = useQueryStates(
    {
      types: parseAsArrayOf(parseAsString),
      start: parseAsString,
      end: parseAsString,
      states: parseAsArrayOf(parseAsString),
    },
    {
      shallow: false,
    },
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    schema: filterAppointmentSchema,
  });

  useEffect(() => {
    setFilters((prev) => ({
      types: (object as any)?.types?.map((name: string) => types?.find((type) => type.name === name)?.name) ?? null,
      states: (object as any)?.states?.map((name: string) => states?.find((state) => state === name) ?? null) ?? null,
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
          types: ${types.map((t) => t.name).join(', ')}
          states: ${states.join(', ')}
        `,
              });
            }
          }}
        >
          <Search className="absolute pointer-events-none left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            value={prompt}
            onChange={handleSearch}
            className="pl-9 w-full lg:w-[350px] pr-8  h-9 focus-visible:outline-none focus-visible:ring-0"
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
        <AppointmentSearchFilters
          filters={filters}
          onRemove={setFilters}
          loading={isLoading}
          states={states}
          types={types}
        />
      </div>
      <DropdownMenuContent className=" w-[350px]" align="end" sideOffset={19} alignOffset={-11} side="bottom">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <CalendarDays className="size-4 mr-2" />
            <span>Fechas</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 ">
              <Calendar
                mode="range"
                initialFocus
                selected={{
                  from: filters.start ? new Date(filters.start) : undefined,
                  to: filters.end ? new Date(filters.end) : undefined,
                }}
                onSelect={(range) => {
                  if (!range) return;

                  const newRange = {
                    start: range.from ? formatISO(range.from, { representation: 'date' }) : filters.start,
                    end: range.to ? formatISO(range.to, { representation: 'date' }) : filters.end,
                  };

                  setFilters(newRange);
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <Route className="size-4 mr-2" />
            <span>Estado de la cita</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] ">
              <SelectState
                headless
                states={states}
                onChange={(selected) => {
                  setFilters({
                    states: filters?.states?.includes(selected)
                      ? filters.states.filter((s) => s !== selected).length > 0
                        ? filters.states.filter((s) => s !== selected)
                        : null
                      : [...(filters.states ?? []), selected],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="">
            <SquareStack className="size-4 mr-2" />
            <span>Tipo de cita</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] ">
              <SelectType
                headless
                types={types}
                onChange={(selected) => {
                  setFilters({
                    types: filters?.types?.includes(selected.name)
                      ? filters.types.filter((s) => s !== selected.name).length > 0
                        ? filters.types.filter((s) => s !== selected.name)
                        : null
                      : [...(filters.types ?? []), selected.name],
                  });
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentSearchInput;
