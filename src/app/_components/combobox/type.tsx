"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { typeSelector, selectedOption } from "~/stores/slices/type";
import { useAppDispatch } from "~/stores/store";
import { useSelector } from "react-redux";
import type { PARCEL_TYPE } from "@prisma/client";
interface Framework {
    value: string;
    label: string;
  }
  
  interface Props {
    options: Framework[];
  }
export function Types({options}:Props) {
  const [open, setOpen] = React.useState(false);
  const typeReducer = useSelector(typeSelector);
  const dispatch = useAppDispatch();
  const type = typeReducer.key;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {type
            ? options.find((option) => option.value === type.toUpperCase())?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={(currentValue) => {
                  setOpen(false);
                  dispatch(selectedOption({key:option.value as PARCEL_TYPE, label:currentValue}))
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    type === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
