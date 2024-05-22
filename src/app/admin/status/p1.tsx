import type { Parcel } from "@prisma/client";
import ParcelAdmin from "~/app/_components/Parcel.admin";
import { api } from "~/trpc/server";
import { Navbar } from "~/app/_components/Navbar";

const sta = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Navbar />
    </div>
  );
};

export default sta;
