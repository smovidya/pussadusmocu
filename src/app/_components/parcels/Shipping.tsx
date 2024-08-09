"use client";

import { NavbarUser } from "../shared/nav/NavbarUser";
import { type Parcel } from "@prisma/client";
import ParcelUser from "./Parcel.user";
import { useSelector } from "react-redux";
import { parcelSelector } from "~/stores/slices/search";
import { useState } from "react";
import { GroupDropdown } from "../shared/dropdown/GroupDropdown";
import { TypeDropdown } from "../shared/dropdown/TypeDropdown";

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
    .filter((pp) => (name !== "" ? pp.title.includes(name) : true))
    .filter((pp) => (selectedType ? pp.type === selectedType : true))
    .filter((pp) => (selectedGroup ? pp.group === selectedGroup : true));

  return (
    <div className="flex h-full w-full flex-col gap-2 font-noto-sans">
      <NavbarUser />
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
    </div>
  );
};
