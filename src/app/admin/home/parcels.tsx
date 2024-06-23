"use client";

import { type Parcel } from "@prisma/client";
import { useState } from "react";
import { TypeDropdown } from "~/app/_components/TypeDropdown";
import { CreateParcel } from "~/app/_components/create-parcel";
import { Navbar } from "~/app/_components/Navbar";
import ParcelAdmin from "~/app/_components/Parcel.admin";
import { GroupDropdown } from "~/app/_components/GroupDropdown";

interface ParcelProps {
  parcels: Parcel[];
}

export function Parcels({ parcels }: ParcelProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredParcelsProjects = parcels
    .filter((pp) => (selectedType ? pp.type === selectedType : true))
    .filter((pp) => (selectedGroup ? pp.group === selectedGroup : true));

  return (
    <div className="flex h-full w-full flex-col gap-2 font-noto-sans">
      <Navbar />
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <TypeDropdown setSelectedType={setSelectedType} />
          <GroupDropdown setSelectedType={setSelectedGroup} />
          <CreateParcel />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredParcelsProjects.map((parcel) => (
            <ParcelAdmin key={parcel.parcel_id} parcel={parcel} />
          ))}
        </div>
      </div>
    </div>
  );
}
