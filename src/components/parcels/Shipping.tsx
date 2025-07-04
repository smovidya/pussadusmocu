"use client";

import { type Parcel } from "@prisma/client";
import ParcelUser from "./Parcel.user";
import { useSelector } from "react-redux";
import { parcelSelector } from "~/stores/slices/search";
import { useState } from "react";
import { GroupDropdown } from "~/components/shared/dropdown/GroupDropdown";
import { TypeDropdown } from "~/components/shared/dropdown/TypeDropdown";

interface ParcelProps {
  parcels: Parcel[];
  id: string;
  student_id: string;
}

export const Shipping = ({ id, parcels, student_id }: ParcelProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const parcelReducer = useSelector(parcelSelector);
  const name = parcelReducer.name;
  const filteredParcelsProjects = parcels
    .filter((pp) =>
      name !== "" ? pp.title.toLowerCase().includes(name.toLowerCase()) : true,
    )
    .filter((pp) =>
      selectedType && selectedType !== "all" ? pp.type === selectedType : true,
    )
    .filter((pp) =>
      selectedGroup && selectedGroup !== "all"
        ? pp.group === selectedGroup
        : true,
    );

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
        <TypeDropdown setSelectedType={setSelectedType} />
        <GroupDropdown setSelectedType={setSelectedGroup} />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredParcelsProjects.map((parcel) => (
          <ParcelUser
            key={parcel.parcel_id}
            parcel={parcel}
            project_id={id}
            student_id={student_id}
          />
        ))}
      </div>
    </div>
  );
};
