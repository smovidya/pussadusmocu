"use client";
import { Navbar } from "~/app/_components/Navbar";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import PopupCard from "~/components/ui/popCard";

function Sta() {
  const [parcel_status, changeSta] = useState("Pending");
  const updateAccept = () => {
    changeSta("Accept");
  };
  const upDateReject = () => {
    changeSta("Reject");
  };

  // const project = "projectname" ; ดึงดาต้าโปรเจกต์มาใช้

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <Navbar />
      <select className="mb-2 mt-2 w-4/6 px-2 py-2">
        <option value="">โครงการ</option>
        <option>โครงการ2</option>
        <option>โครงการ3</option>
        <option>โครงการ4</option>
        <option>โครงการ5</option>
      </select>
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
              รอการอนุมัติ
            </Button>
            {isOpen && <PopupCard onClose={closePopup} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sta;
