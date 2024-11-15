'use client';
import { Badge } from '@/libs/shadcn-ui/components/badge';
import { Button } from '@/libs/shadcn-ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/libs/shadcn-ui/components/command';
import { Input } from '@/libs/shadcn-ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/libs/shadcn-ui/components/popover';
import { Separator } from '@/libs/shadcn-ui/components/separator';
import { cn } from '@/libs/shadcn-ui/utils/utils';
import { useGetSpecialties } from '@/modules/doctor/presentation/graphql/hooks/use-get-specialties';
import { CheckIcon, FilterX, ListFilter, Loader2, LucideIcon, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const SearchDoctor = () => {
  const [specialties, setSpecialties] = useState([]);
  const { getSpecialties } = useGetSpecialties();
  const [textSearch, setTextSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getSpecialties().then((data) => {
      setSpecialties(data);
    });
  }, []);

  useEffect(() => {
    if (textSearch.length < 3) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  }, [textSearch]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-full">
        <div className="w-full relative">
          <Input
            className="outline-none text-secondary-foreground rounded-none box-border focus-visible:ring-transparent pl-[40px]"
            placeholder="Buscar"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
          {isSearching && (
            <div className="absolute z-20 left-[8px] top-[7px] bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs">
              <Loader2 className="size-4 animate-spin" />
            </div>
          )}
          {!isSearching && textSearch && (
            <div
              className="absolute z-20 left-[8px] top-[7px] bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs cursor-pointer"
              onClick={() => setTextSearch('')}
            >
              <X className="size-4" />
            </div>
          )}
          {!isSearching && !textSearch && (
            <div className="absolute z-20 left-[8px] top-[7px] bg-sidebar p-1 flex justify-center items-center border rounded-none text-xs">
              <Search className="size-4" />
            </div>
          )}
        </div>
        <div className="flex">
          <FacetedFilter
            title="Especialidades"
            options={specialties.map((specialty) => ({
              label: specialty.name,
              value: specialty.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;

interface FacetedFilterProps {
  title: string;
  options: { label: string; value: string; icon?: LucideIcon }[];
}

function FacetedFilter({ title, options }: FacetedFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...(selectedValues || []), value]);
    }
  };

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className="h-10 border border-l-0 rounded-none"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.length} selected
                  </Badge>
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0 rounded-none w-full" align="end">
          <Command>
            <CommandInput placeholder={title} className="h-8" />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-none border border-primary',
                          isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={() => setSelectedValues([])} className="justify-center text-center">
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="outline" className="border rounded-none h-10" size='icon' onClick={() => setSelectedValues([])}>
        <FilterX />
      </Button>
    </div>
  );
}
