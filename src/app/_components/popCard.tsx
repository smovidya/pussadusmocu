import { Button } from "~/components/ui/button";
import React , { useState } from "react";
import { X } from "lucide-react";
import { type ParcelProjectWithDetails } from "~/app/admin/status/page";
import Image from "next/image";
import { Input } from "~/components/ui/input";


interface PopupCardProps {
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  onReturn: (quantity: number) => void;
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

const PopupCard: React.FC<PopupCardProps> = ({
  onClose,
  onAccept,
  onReject,
  onReturn,
  parcelProject,
}) => {

  const [returnQuantity, setReturnQuantity] = useState<number>(0);

  const handleReturn = () => {
    onReturn(returnQuantity);
  };

  const renderButton = () => {
    switch (parcelProject.status) {
      case "PENDING":
        return (
          <>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                className="bg-green01 text-white"
                onClick={onAccept}
              >
                Accept
              </Button>
              <Button
                type="button"
                className="bg-red01 text-white"
                onClick={onReject}
              >
                Reject
              </Button>
            </div>
          </>
        );
      case "INUSE":
        return (
          <>
          <Input placeholder="จำนวนของที่คืน" type="number" value={returnQuantity} 
            onChange={(e) => setReturnQuantity(parseInt(e.target.value, 10))} />
          <Button type="button" className="bg-green01 text-white" onClick={handleReturn}> Return </Button>
          </>
          
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-3/5 w-3/4 max-w-xl rounded-lg bg-white p-1 shadow-lg">
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
            />
          </div>
          <div className="flex flex-col gap-4 p-2">
            <div>
              <h2>
                {parcelProject.project.project_id} |{" "}
                {parcelProject.project.title}
              </h2>
            </div>
            <div>
              <h3>
                {parcelProject.parcel.parcel_id} | {parcelProject.parcel.title}
              </h3>
            </div>
            <div>
              <h3>{formatDate(parcelProject.startDate.toString())}</h3>
              <h3>{formatDate(parcelProject.endDate.toString())}</h3>
            </div>
            <div>
              <h3>จำนวน: {parcelProject.amount}</h3>
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
