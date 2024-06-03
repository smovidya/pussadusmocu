"use client";
import { Navbar } from "~/app/_components/Navbar";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import PopupCard from "~/components/ui/popCard";
import Dropdown from "~/components/ui/dropdown";
import { X } from "lucide-react";
import { api } from "~/trpc/react";

function Sta() {
  const [parcel_status, changeSta] = useState("Pending");
  const updateAccept = () => {
    setIsOpen(false);
    changeSta("Accept");
  };
  const updateReject = () => {
    setIsOpen(false);
    changeSta("Reject");
  };

  // const projects = api.project.getAll ; เขียน project.getAll ใน routers/project

  // <Dropdown projects={projects}/>

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <Navbar />
      <Dropdown />
      <div className="flex w-4/6 flex-grow flex-col rounded-lg border-gray-300 px-6 py-4 shadow-md">
        <h1 className="mb-3 border-b border-gray-300 pb-2">
          ไอดีโครงการ | ชื่อโครงการ
        </h1>
        <div className="text-md grid grid-cols-5 items-center justify-center  gap-3 border-black">
          <div>
            <p>img</p>
          </div>
          <p>ไอดีของ | พัสดุ</p>
          <p>จำนวน</p>
          <div>
            <p>วันยืม</p>
            <p>วันคืน</p>
          </div>
          <div>
            <Button type="button" onClick={openPopup} variant="destructive">
              {parcel_status}
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
    </div>
  );
}

export default Sta;