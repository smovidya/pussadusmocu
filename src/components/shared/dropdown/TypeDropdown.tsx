"use client";

import React from "react";
import { types } from "~/lib/constant";

type StatusDropdownProps = {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
};

export function TypeDropdown({ setSelectedType }: StatusDropdownProps) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="w-full px-2 py-2">
      <p>ประเภท</p>
      <select
        className="w-full bg-background border border-yellow-200 px-1 py-2"
        onChange={handleStatusChange}
      >
        <option value="">ทั้งหมด</option>
        {types.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}
