"use client";

import { Navbar } from "~/app/_components/Navbar";
import { Button } from "~/components/ui/button";
import PopupCard from "~/app/_components/popCard";
import Dropdown from "~/app/_components/dropdown";
import StatusDropdown from "~/app/_components/StatusDropdown";
import React, { useState } from "react";
import { type ParcelProjectWithDetails } from "./page";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Sta({
  parcelsProjects,
}: {
  parcelsProjects: ParcelProjectWithDetails[];
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [currentParcelProject, setCurrentParcelProject] =
    useState<ParcelProjectWithDetails | null>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const openPopup = (parcelsProject: ParcelProjectWithDetails) => {
    setCurrentParcelProject(parcelsProject);
    setIsOpen(true);
  };

  const updateparcel = api.parcel_Project.updateChecking.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });

  const rejectParcel = api.parcel_Project.rejectBooking.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });

  const returnParcel = api.parcel_Project.returnParcel.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("REturn error", error);
    },
  });

  const closePopup = () => {
    setIsOpen(false);
    setCurrentParcelProject(null);
  };

  const updateAccept = async (id: string, description_input: string) => {
    setIsOpen(false);
    updateparcel.mutate({
      parcel_project_id: id,
      description: description_input,
    });
  };

  const updateReject = async (id: string, description_input: string) => {
    setIsOpen(false);
    rejectParcel.mutate({
      parcel_project_id: id,
      description: description_input,
    });
  };

  const updateTostock = async (id: string, quantity: number) => {
    setIsOpen(false);
    returnParcel.mutate({
      parcel_project_id: id,
      parcel_return: quantity,
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredParcelsProjects = parcelsProjects
    .filter((pp) =>
      selectedProjectId ? pp.project.project_id === selectedProjectId : true,
    )
    .filter((pp) => (selectedStatus ? pp.status === selectedStatus : true));

  return (
    <div className="flex h-full w-full flex-col items-center gap-2 font-noto-sans">
      <Navbar />
      <div className="flex-grid mx-5 flex w-full sm:w-5/6 lg:w-4/6">
        <Dropdown setSelectedProjectId={setSelectedProjectId} />
        <StatusDropdown setSelectedStatus={setSelectedStatus} />
      </div>
      {filteredParcelsProjects?.map((parcelsProject) => (
        <div
          key={parcelsProject.id}
          className="mx-20 flex w-full flex-grow flex-col rounded-lg border-gray-300 px-6 py-4 shadow-md lg:w-4/6"
        >
          <h1 className="mb-3 border-b border-gray-300 pb-2">
            {parcelsProject.project.project_id} | {parcelsProject.project.title}
          </h1>

          <div
            className="text-md grid grid-cols-2 items-center justify-center gap-3 
          border-black sm:grid-cols-5"
          >
            <div className="sm:col-span-1">
              <img
                src={parcelsProject.parcel.image_url}
                alt={parcelsProject.id}
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>

            <div className="flex flex-col justify-items-center sm:col-span-4 sm:grid sm:grid-cols-4 ">
              <div>
                <p>
                  {parcelsProject.parcel.parcel_id} |{" "}
                  {parcelsProject.parcel.title}
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
                  className={`text-base font-bold text-white ${
                    parcelsProject.status === "BORROWING"
                      ? "text-blue-700"
                      : parcelsProject.status === "REJECT"
                        ? "text-red-700"
                        : parcelsProject.status === "PENDING"
                          ? "text-yellow02"
                          : "text-green-700"
                  }`}
                >
                  {parcelsProject.status}
                </Button>
                {isOpen && currentParcelProject?.id === parcelsProject.id && (
                  <PopupCard
                    onClose={closePopup}
                    onAccept={(description_input: string) =>
                      updateAccept(parcelsProject.id, description_input)
                    }
                    onReject={(description_input: string) =>
                      updateReject(parcelsProject.id, description_input)
                    }
                    onReturn={(quantity: number) =>
                      updateTostock(parcelsProject.id, quantity)
                    }
                    parcelProject={currentParcelProject}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sta;
