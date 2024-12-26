'use client';

import { Check, ChevronsUpDown, LucideIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@helsa/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@helsa/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { cn } from '@helsa/ui/lib/utils';

export interface ComboBoxProps {
  options: { label: string; value: string; icon?: LucideIcon }[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}
export const Combobox = React.forwardRef<any, ComboBoxProps>(
  ({ options, placeholder = 'Select item', value, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? options.find((element) => element.value === value)?.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((element) => (
                  <CommandItem
                    key={element.value}
                    value={element.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : element.value);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === element.value ? 'opacity-100' : 'opacity-0')} />
                    {element.icon && (
                      <element.icon
                        className={cn('mr-2 h-4 w-4', element.value === value ? 'opacity-100' : 'opacity-40')}
                      />
                    )}
                    {element.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = 'Combobox';
