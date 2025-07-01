"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { types } from "~/lib/constant";

type StatusDropdownProps = {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
};

export function TypeDropdown({ setSelectedType }: StatusDropdownProps) {
  return (
    <div className="w-full px-2 py-2">
      <label htmlFor="parcel-type">ประเภท</label>
      <Select onValueChange={setSelectedType}>
        <SelectTrigger className="bg-background w-full border border-yellow-200">
          <SelectValue placeholder="ทั้งหมด" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
