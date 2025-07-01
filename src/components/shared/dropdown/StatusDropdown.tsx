"use client";

import React from "react";
import { BORROWING_STATUS } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type StatusDropdownProps = {
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
};

function StatusDropdown({ setSelectedStatus }: StatusDropdownProps) {
  return (
    <div className="w-full px-2 py-2">
      <label htmlFor="status-select">สถานะ</label>
      <Select onValueChange={setSelectedStatus}>
        <SelectTrigger id="status-select" className="w-full">
          <SelectValue placeholder="ทั้งหมด" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          {Object.keys(BORROWING_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {BORROWING_STATUS[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusDropdown;
