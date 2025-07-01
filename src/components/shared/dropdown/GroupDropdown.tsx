"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { groups } from "~/lib/constant";

type StatusDropdownProps = {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
};

export function GroupDropdown({ setSelectedType }: StatusDropdownProps) {
  return (
    <div className="w-full px-2 py-2">
      <label>หมวด</label>
      <Select onValueChange={setSelectedType}>
        <SelectTrigger className="bg-background w-full border border-yellow-200">
          <SelectValue placeholder="ทั้งหมด" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          {groups.map((group) => (
            <SelectItem key={group.value} value={group.value}>
              {group.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
