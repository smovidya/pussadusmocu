"use client";

import React from "react";
import { PARCEL_GROUP } from "@prisma/client";

type StatusDropdownProps = {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
};

export function GroupDropdown({ setSelectedType }: StatusDropdownProps) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="w-2/6 px-2 py-2">
      <p>หมวด</p>
      <select
        className="w-full border border-yellow-200 px-1 py-2"
        onChange={handleStatusChange}
      >
        <option value="">Select a group</option>
        {Object.keys(PARCEL_GROUP).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
