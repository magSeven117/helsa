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
import { useSpecialties } from '@/modules/doctor/presentation/graphql/hooks/use-get-specialties';
import { CheckIcon, FilterX, ListFilter, Loader2, LucideIcon, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SearchDoctor = ({ setSelectedDoctor }) => {
  const { specialties } = useSpecialties();
  const [textSearch, setTextSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const resultsRef = useRef<HTMLDivElement>(null)

  const searchResults = async (search: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setResults(doctors);
    setSelectedIndex(-1)
    setIsSearching(false);
  };

  useEffect(() => {
    if (!textSearch || textSearch === '') {
      setResults([]);
      setIsSearching(false);
      setSelectedIndex(-1)
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      await searchResults(textSearch);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [textSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      setSelectedDoctor(results[selectedIndex])
      setResults([])
    }
  }

  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLDivElement
      selectedElement.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-full">
        <div className="w-full relative">
          <Input
            className="outline-none text-secondary-foreground rounded-none box-border focus-visible:ring-transparent pl-[40px]"
            placeholder="Buscar"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            onKeyDown={handleKeyDown}
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
          {!isSearching && textSearch && results.length === 0 && (
            <div className="absolute z-50 bg-background w-full h-[250px] rounded shadow border left-[0px] top-[50px]">
              <div className="flex justify-center items-center h-full text-xl font-bold">No results found</div>
            </div>
          )}
          {!isSearching && textSearch && results.length > 0 && (
            <div className="absolute w-full z-50 bg-background left-0 top-[50px]">
              <div className="w-full h-[300px] overflow-y-scroll styled-scroll rounded-none shadow border p-2 space-y-2" ref={resultsRef}>
                {results.map((result, index) => (
                  <div key={index} className={cn("flex gap-2 w-full p-2 cursor-pointer hover:bg-border border", {
                    'bg-primary-foreground text-primary': selectedIndex === index
                  })} onClick={() => setSelectedDoctor(result)}>
                    <img src={result.avatar} alt={result.name} className="h-[50px] w-[50px] rounded-full" />
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-[1rem]">
                        {result.name} - <span className="font-bold">{result.specialty}</span>
                      </div>
                      <div className="text-xs">
                        {result.availability} - <span className="italic">Rate {result.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <FacetedFilter
            title="Filtros"
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
      <Button variant="outline" className="border rounded-none h-10" size="icon" onClick={() => setSelectedValues([])}>
        <FilterX />
      </Button>
    </div>
  );
}

const doctors = [
  {
    id: '1',
    name: 'Dr. Jose Veliz',
    specialty: 'Internal Medicine',
    avatar: 'https://avatars.githubusercontent.com/u/1403241?v=4',
    rating: 4.5,
    availability: '2021-10-10',
  },
  {
    id: '2',
    name: 'Dr. Maria Lopez',
    specialty: 'Cardiology',
    avatar: 'https://avatars.githubusercontent.com/u/14032?v=4',
    rating: 4.7,
    availability: '2021-11-12',
  },
  {
    id: '3',
    name: 'Dr. John Doe',
    specialty: 'Neurology',
    avatar: 'https://avatars.githubusercontent.com/u/98182988?v=4',
    rating: 4.8,
    availability: '2021-12-15',
  },
  {
    id: '4',
    name: 'Dr. Jane Smith',
    specialty: 'Pediatrics',
    avatar: 'https://avatars.githubusercontent.com/u/1403242?v=4',
    rating: 4.6,
    availability: '2022-01-20',
  },
  {
    id: '5',
    name: 'Dr. Emily Davis',
    specialty: 'Dermatology',
    avatar: 'https://avatars.githubusercontent.com/u/659832?v=4',
    rating: 4.9,
    availability: '2022-02-25',
  },
];
