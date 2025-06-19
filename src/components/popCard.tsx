import { Button } from "~/components/ui/button";
import React, { useState } from "react";
import { X } from "lucide-react";
import { type ParcelProjectWithDetails } from "~/app/admin/status/page";
import Image from "next/image";
import { Input } from "~/components/ui/input";

interface PopupCardProps {
  onClose: () => void;
  onAccept: (description: string) => void;
  onReject: (description: string) => void;
  onReturn: (quantity: number) => void;
  onRejectBorrowing: (quantity: number) => void;
  onDelivered: () => void;
  parcelProject: ParcelProjectWithDetails;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const formatThaiTime = (date: Date) => {
  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const PopupCard: React.FC<PopupCardProps> = ({
  onClose,
  onAccept,
  onReject,
  onReturn,
  onRejectBorrowing,
  onDelivered,
  parcelProject,
}) => {
  const [returnQuantity, setReturnQuantity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [description] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > parcelProject.amount) {
      setError(`จำนวนที่คืนต้องไม่เกิน ${parcelProject.amount}`);
    } else {
      setError(null);
      setReturnQuantity(value);
    }
  };

  const handleAccept = async () => {
    setIsLoading(true);
    onAccept(description);
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    onReject(description);
    setIsLoading(false);
  };

  const handleReturn = async () => {
    setIsLoading(true);
    onReturn(returnQuantity);
    setIsLoading(false);
  };

  const handleRejectBorrowing = async () => {
    setIsLoading(true);
    onRejectBorrowing(parcelProject.amount);
    setIsLoading(false);
  };

  const handleDelivered = async () => {
    setIsLoading(true);
    onDelivered();
    setIsLoading(false);
  };

  const renderButton = () => {
    switch (parcelProject.status) {
      case "PENDING":
        return (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                className="bg-green01 hover:bg-green01/90 text-white"
                onClick={handleAccept}
                disabled={isLoading}
              >
                {isLoading ? "กำลังดำเนินการ..." : "Accept"}
              </Button>
              <Button
                type="button"
                className="bg-red01 hover:bg-red01/90 text-white"
                onClick={handleReject}
                disabled={isLoading}
              >
                {isLoading ? "กำลังดำเนินการ..." : "Reject"}
              </Button>
            </div>
          </>
        );
      case "INUSE":
        return (
          <>
            <Input
              placeholder="จำนวนของที่คืน"
              type="number"
              value={returnQuantity}
              onChange={handleQuantityChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="button"
              className="bg-green01 hover:bg-green01/90 text-white"
              onClick={handleReturn}
              disabled={isLoading || returnQuantity > parcelProject.amount}
            >
              {isLoading ? "กำลังดำเนินการ..." : "Return"}
            </Button>
          </>
        );
      case "BORROWING":
        return (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                className="bg-green-500 text-white hover:bg-green-500/90"
                onClick={handleDelivered}
                disabled={isLoading}
              >
                {isLoading ? "กำลังดำเนินการ..." : "ส่งมอบแล้ว"}
              </Button>
              <Button
                type="button"
                className="bg-red01 hover:bg-red01/90 text-white"
                onClick={handleRejectBorrowing}
                disabled={isLoading}
              >
                {isLoading ? "กำลังดำเนินการ..." : "Reject"}
              </Button>
            </div>
          </>
        );
    }
  };

  // TODO: use radix dialog
  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="h-auto w-full max-w-xl rounded-lg bg-white p-1 shadow-lg">
        <div className="flex items-end justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-2 p-2">
          <div className="p-3">
            <Image
              src={parcelProject.parcel.image_url}
              alt={parcelProject.id}
              width={300}
              height={300}
              loading="eager"
            />
          </div>
          <div className="flex flex-col gap-4 p-2">
            <div>
              <h2>{parcelProject.project.title}</h2>
            </div>
            <div>
              <h3>
                {parcelProject.parcel.parcel_id} | {parcelProject.parcel.title}
              </h3>
            </div>
            <div>
              <h3>
                {formatDate(parcelProject.startDate.toString())} ถึง{" "}
                {formatDate(parcelProject.endDate.toString())}
              </h3>
            </div>
            <div>
              <h3>
                เวลายืม: {formatThaiTime(new Date(parcelProject.createdAt))}
              </h3>
            </div>
            <div>
              <h3>
                จำนวน: {parcelProject.amount} {parcelProject.parcel.unit}
              </h3>
            </div>
            <div>
              <h3>ยืมโดย {parcelProject.student.name}</h3>
            </div>
            <div>
              <h3>คำอธิบาย: {parcelProject.description}</h3>
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
