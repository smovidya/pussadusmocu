import { Button } from "~/components/ui/button";
import React from "react";
import { X } from "lucide-react";

interface PopupCardProps {
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({
  onClose,
  onAccept,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-end justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          <div>img</div>
          <div className="flex flex-col gap-4 p-2">
            <div>
              <h2>ไอดีโครงการ</h2>
            </div>
            <div>
              <h3>ไอดีพัสดุ</h3>
            </div>
            <div>
              <h3>ยืม</h3>
              <h3>คืน</h3>
            </div>
            <div>
              <h3>จำนวน</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={onAccept}>
                Accpet
              </Button>
              <Button type="button" variant="destructive" onClick={onReject}>
                Cancle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
