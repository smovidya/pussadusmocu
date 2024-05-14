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
import { useSelector } from "react-redux";
import { departmentSelector, selectedOption } from "~/stores/slices/department";
import { useAppDispatch } from "~/stores/store";
import type { Department } from "@prisma/client";

interface Framework {
    value: string;
    label: string;
  }
  
  interface Props {
    options: Framework[];
  }
export function Departments({options}:Props) {
  const [open, setOpen] = React.useState(false);
  const departmentReducer = useSelector(departmentSelector);
  const dispatch = useAppDispatch();
  const department = departmentReducer.key;

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {department
            ? options.find((option) => option.value === department.toUpperCase())?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 top-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  dispatch(selectedOption({key:option.value as Department, label:currentValue}))
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    department === option.value ? "opacity-100" : "opacity-0",
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
