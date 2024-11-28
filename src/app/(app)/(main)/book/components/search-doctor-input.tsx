'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Input } from '@/libs/shadcn-ui/components/input';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { ListFilter, Search, Stethoscope } from 'lucide-react';
import { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SelectSpecialty from './select-specialty';

import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import FilterList from './filter-list';
const defaultSearch = {
  q: null,
  specialties: null,
};

type Props = {
  specialties: any[];
};

const SearchDoctorInput = ({ specialties }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [filters, setFilters] = useQueryStates(
    {
      q: parseAsString,
      specialties: parseAsArrayOf(parseAsString),
    },
    {
      shallow: false,
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  useHotkeys(
    'esc',
    () => {
      setPrompt('');
      setFilters(defaultSearch);
      setIsOpen(false);
    },
    {
      enableOnFormTags: true,
    }
  );

  return (
    <DropdownMenu>
      <div className="flex space-x-4">
        <form
          action=""
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            setFilters({ q: prompt });
          }}
        >
          <Search className="absolute pointer-events-none left-3 top-[11px] size-4" />
          <Input
            ref={inputRef}
            value={prompt}
            onChange={handleSearch}
            className="pl-9 w-full md:w-[350px] pr-8 rounded-none h-9 focus-visible:outline-none focus-visible:ring-0"
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
                isOpen && 'opacity-100'
              )}
            >
              <ListFilter className="size-4" />
            </button>
          </DropdownMenuTrigger>
        </form>
        <FilterList filters={filters} onRemove={setFilters} loading={false} specialties={specialties} />
      </div>
      <DropdownMenuContent
        className="rounded-none w-[350px]"
        align="end"
        sideOffset={19}
        alignOffset={-11}
        side="bottom"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="rounded-none">
            <Stethoscope className="size-4 mr-2" />
            <span>Especialidad</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14} alignOffset={-4} className="p-0 w-[250px] h-[270px] rounded-none">
              <SelectSpecialty
                headless
                specialties={specialties}
                onChange={(selected) => {
                  setFilters({
                    specialties: filters?.specialties?.includes(selected.name)
                      ? filters.specialties.filter((s) => s !== selected.name).length > 0
                        ? filters.specialties.filter((s) => s !== selected.name)
                        : null
                      : [...(filters.specialties ?? []), selected.name],
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

export default SearchDoctorInput;
