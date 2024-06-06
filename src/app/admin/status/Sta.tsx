"use client";

import { Navbar } from '~/app/_components/Navbar';
import { Button } from '~/components/ui/button';
import PopupCard from '~/app/_components/popCard';
import Dropdown from '~/app/_components/dropdown';
import React, { useState } from 'react';
import { ParcelProjectWithDetails } from './page';

function Sta({ parcelsProjects }: { parcelsProjects: ParcelProjectWithDetails[] }) {
  const [parcelStatus, setParcelStatus] = useState("Pending");
  const buttonTheme = "default";
  const [isOpen, setIsOpen] = useState(false);
  const [currentParcelProject, setCurrentParcelProject] = useState<ParcelProjectWithDetails | null>(null);

  const openPopup = (parcelsProject: ParcelProjectWithDetails) => {
    setCurrentParcelProject(parcelsProject);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setCurrentParcelProject(null);
  };

  const updateAccept = () => {
    setIsOpen(false);
    setParcelStatus("Accept");
  };

  const updateReject = () => {
    setIsOpen(false);
    setParcelStatus("Reject");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <Navbar />
      <Dropdown />
      {parcelsProjects?.map((parcelsProject) => (
        <div
          key={parcelsProject.id}
          className="flex w-4/6 flex-grow flex-col rounded-lg border-gray-300 px-6 py-4 shadow-md"
        >
          <h1 className="mb-3 border-b border-gray-300 pb-2">
            {parcelsProject.project.project_id} | {parcelsProject.project.title}
          </h1>
          <div className="text-md grid grid-cols-5 items-center justify-center gap-3 border-black">
            <div>
              <img src={parcelsProject.parcel.image_url} />
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
              <p>{formatDate(parcelsProject.startDate.toString())}</p>
              <p>{formatDate(parcelsProject.endDate.toString())}</p>
            </div>
            <div>
            <Button
                type="button"
                onClick={() => openPopup(parcelsProject)}
                variant={buttonTheme}
              >
                {parcelStatus}
              </Button>
              {isOpen && currentParcelProject?.id === parcelsProject.id && (
                <PopupCard
                  onClose={closePopup}
                  onAccept={updateAccept}
                  onReject={updateReject}
                  parcelProject={currentParcelProject}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sta;
