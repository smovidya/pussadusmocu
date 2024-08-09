"use client";

import React from "react";
import { groups } from "~/utils/constant";

type StatusDropdownProps = {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
};

export function GroupDropdown({ setSelectedType }: StatusDropdownProps) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="w-full px-2 py-2">
      <p>หมวด</p>
      <select
        className="w-full border border-yellow-200 px-1 py-2"
        onChange={handleStatusChange}
      >
        <option value="">Select a group</option>
        {groups.map((group) => (
          <option key={group.value} value={group.value}>
            {group.label}
          </option>
        ))}
      </select>
    </div>
  );
}
