"use client";
import { Navbar } from "~/app/_components/Navbar";
import { Button } from "~/components/ui/button";
import PopupCard from "~/components/ui/popCard";
import Dropdown from "~/components/ui/dropdown";
import React, { useState } from "react";
import { Parcel_Project, Project, Parcel, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
};

async function fetchParcelsProjects() {
  const parcelsProjects = await prisma.parcel_Project.findMany({
    include: {
      project: true,
      parcel: true,
    },
  });
  return parcelsProjects;
}

function Sta({ parcelsProjects }: { parcelsProjects: ParcelProjectWithDetails[] }) {
  const [parcel_status, changeSta] = useState("Pending");
  const buttonTheme = "default";
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const updateAccept = () => {
    setIsOpen(false);
    changeSta("Accept");
  };

  const updateReject = () => {
    setIsOpen(false);
    changeSta("Reject");
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <Navbar />
      <Dropdown />
      {parcelsProjects?.map((parcelsProject) => (
        <div key={parcelsProject.id} className="flex w-4/6 flex-grow flex-col rounded-lg border-gray-300 px-6 py-4 shadow-md">
          <h1 className="mb-3 border-b border-gray-300 pb-2">
            {parcelsProject.project.project_id} | {parcelsProject.project.title}
          </h1>
          <div className="text-md grid grid-cols-5 items-center justify-center gap-3 border-black">
            <div>
              <img src={parcelsProject.parcel.image_url}/>
            </div>
            <div>
              <p>
                {parcelsProject.parcel.parcel_id} | {parcelsProject.parcel.title}
              </p>
            </div>
            <div>
              <p>{parcelsProject.amount}</p>
            </div>
            <div>
              <p>{new Date(parcelsProject.startDate).toLocaleDateString()}</p>
              <p>{new Date(parcelsProject.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Button type="button" onClick={openPopup} variant={buttonTheme}>
                {parcelsProject.status}
              </Button>
              {isOpen && (
                <PopupCard
                  onClose={closePopup}
                  onAccept={updateAccept}
                  onReject={updateReject}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Page() {
  const parcelsProjects = await fetchParcelsProjects();
  return <Sta parcelsProjects={parcelsProjects} />;
}