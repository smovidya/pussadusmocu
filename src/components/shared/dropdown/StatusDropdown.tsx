"use client";

import React from "react";
import { BORROWING_STATUS } from "@prisma/client";

type StatusDropdownProps = {
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
};

function StatusDropdown({ setSelectedStatus }: StatusDropdownProps) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="w-2/6 px-2 py-2">
      <p>สถานะ</p>
      <select
        className="bg-background w-full border border-yellow-200 px-1 py-2"
        onChange={handleStatusChange}
      >
        <option value="">ทั้งหมด</option>
        {Object.keys(BORROWING_STATUS).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatusDropdown;
