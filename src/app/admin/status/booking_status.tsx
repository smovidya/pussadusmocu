"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PopupCard from "~/components/popCard";
import Dropdown from "~/components/shared/dropdown/ProjectDropdown";
import StatusDropdown from "~/components/shared/dropdown/StatusDropdown";
import { Navbar } from "~/components/shared/nav/NavbarAdmin";
import { Button } from "~/components/ui/button";
import { getStatusText } from "~/lib/function";
import { parcelSelector } from "~/stores/slices/search";
import { api } from "~/trpc/react";
import { type ParcelProjectWithDetails } from "./page";

function match(pp: ParcelProjectWithDetails, keyword: string) {
  return (
    pp.parcel.title.toLowerCase().includes(keyword) ||
    pp.project.title.toLowerCase().includes(keyword) ||
    (pp.parcel.description?.toLowerCase().includes(keyword) ?? false) ||
    pp.description_admin.toLowerCase().includes(keyword)
  );
}

function Sta({
  parcelsProjects,
}: {
  parcelsProjects: ParcelProjectWithDetails[];
}) {
  const router = useRouter();
  const parcelReducer = useSelector(parcelSelector);
  const name = parcelReducer.name;
  const searchKeywords = useMemo(
    () =>
      parcelReducer.name
        .toLowerCase()
        .split(" ")
        .map((it) => it.trim()),
    [name],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [currentParcelProject, setCurrentParcelProject] =
    useState<ParcelProjectWithDetails | null>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      console.error("Return error", error);
    },
  });

  const reject = api.parcel_Project.rejectBorrowing.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Return error", error);
    },
  });

  const markAsDelivered = api.parcel_Project.markAsDelivered.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Mark as delivered error", error);
    },
  });

  const closePopup = () => {
    setIsOpen(false);
    setCurrentParcelProject(null);
  };

  const updateAccept = async (id: string, description_input: string) => {
    updateparcel.mutate({
      parcel_project_id: id,
      description: description_input,
    });
    setIsOpen(false);
  };

  const updateReject = async (id: string, description_input: string) => {
    rejectParcel.mutate({
      parcel_project_id: id,
      description: description_input,
    });
    setIsOpen(false);
  };

  const updateTostock = async (id: string, quantity: number) => {
    returnParcel.mutate({
      parcel_project_id: id,
      parcel_return: quantity,
    });
    setIsOpen(false);
  };

  const rejectBorrowing = async (id: string, quantity: number) => {
    reject.mutate({
      parcel_project_id: id,
      parcel_return: quantity,
    });
    setIsOpen(false);
  };

  const markBorrowingAsDelivered = async (parcel_project_id: string) => {
    markAsDelivered.mutate({
      parcel_project_id,
    });
    setIsOpen(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredParcelsProjects = useMemo(
    () =>
      parcelsProjects
        .filter((pp) =>
          selectedProjectId && selectedProjectId != "all"
            ? pp.project.project_id === selectedProjectId
            : true,
        )
        .filter((pp) =>
          selectedStatus && selectedStatus != "all"
            ? pp.status === selectedStatus
            : true,
        )
        .filter(
          (pp) =>
            searchKeywords.length === 0 ||
            searchKeywords.every((keyword) => match(pp, keyword)),
        ),
    [parcelsProjects, selectedProjectId, selectedStatus, searchKeywords],
  );

  if (!isMounted) {
    return null; // or a loading indicator
  }

  return (
    <div className="font-noto-sans flex h-full w-full flex-col items-center gap-2">
      <Navbar />

      <h1 className="text-2xl font-bold text-gray-800">สถานะการจอง</h1>
      <div className="m-auto flex w-full max-w-4/6 flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
        <Dropdown setSelectedProjectId={setSelectedProjectId} />
        <StatusDropdown setSelectedStatus={setSelectedStatus} />
      </div>

      {filteredParcelsProjects?.map((parcelsProject) => (
        <div
          key={parcelsProject.id}
          className="bg-background mx-20 flex w-full grow flex-col gap-2 rounded-lg px-6 py-4 shadow-md lg:w-4/6"
        >
          <h2 className="flex flex-col items-start gap-1 border-b border-gray-300 pb-2 text-lg font-bold text-gray-800">
            <span className="text-muted-foreground text-xs">
              {parcelsProject.project.project_id}
            </span>
            <span className="text-base font-semibold text-gray-800">
              {parcelsProject.project.title}
            </span>
          </h2>

          <div className="grid grid-cols-2 items-center justify-center gap-3 border-black sm:grid-cols-5">
            <div className="sm:col-span-1">
              <Image
                src={parcelsProject.parcel.image_url}
                alt={parcelsProject.id}
                className="bg-muted text-muted-foreground/40 h-full w-full rounded-md object-contain p-3"
                loading="eager"
                width={120}
                height={120}
              />
            </div>

            <div className="flex flex-col justify-items-center sm:col-span-4 sm:grid sm:grid-cols-4">
              <div className="flex flex-col items-start gap-1">
                <h3>{parcelsProject.parcel.title}</h3>
                <span className="text-xs">
                  {parcelsProject.parcel.parcel_id}
                </span>
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
                  variant="ghost"
                  onClick={() => openPopup(parcelsProject)}
                  className={`h-fit cursor-pointer text-base font-bold text-white ${
                    parcelsProject.status === "BORROWING"
                      ? "text-blue-700 hover:text-blue-700"
                      : parcelsProject.status === "REJECT"
                        ? "text-red-700 hover:text-red-700"
                        : parcelsProject.status === "PENDING"
                          ? "bg-yellow02 hover:text-yellow02 text-yellow-50"
                          : "text-green-700 hover:text-green-700"
                  }`}
                >
                  {getStatusText(parcelsProject.status)} (
                  {parcelsProject.status})
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
                    onRejectBorrowing={(quantity: number) =>
                      rejectBorrowing(parcelsProject.id, quantity)
                    }
                    onDelivered={() =>
                      markBorrowingAsDelivered(parcelsProject.id)
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
