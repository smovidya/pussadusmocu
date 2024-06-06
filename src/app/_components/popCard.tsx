import { Button } from "~/components/ui/button";
import React from "react";
import { X } from "lucide-react";
import { ParcelProjectWithDetails } from '~/app/admin/status/page';

interface PopupCardProps {
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  parcelProject: ParcelProjectWithDetails;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const PopupCard: React.FC<PopupCardProps> = ({
  onClose,
  onAccept,
  onReject,
  parcelProject
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 h-3/5 max-w-xl rounded-lg bg-white p-1 shadow-lg">
        <div className="flex items-end justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 items-center justify-center">
          <div className="p-3">
            <img src={parcelProject.parcel.image_url} />
          </div>
          <div className="flex flex-col gap-4 p-2">
            <div>
              <h2>{parcelProject.project.project_id} | {parcelProject.project.title}</h2>
            </div>
            <div>
              <h3>{parcelProject.parcel.parcel_id} | {parcelProject.parcel.title}</h3>
            </div>
            <div>
              <h3>{formatDate(parcelProject.startDate.toString())}</h3>
              <h3>{formatDate(parcelProject.endDate.toString())}</h3>
            </div>
            <div>
              <h3>จำนวน: {parcelProject.amount}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={onAccept}>
                Accept
              </Button>
              <Button type="button" variant="destructive" onClick={onReject}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
