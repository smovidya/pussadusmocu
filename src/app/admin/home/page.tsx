import type { Parcel } from "@prisma/client";
import ParcelAdmin from "~/app/_components/Parcel.admin";
import { CreateParcel } from "~/app/_components/create-parcel";
import { api } from "~/trpc/server";
import { Navbar } from "../../_components/Navbar";

const Home = async () => {
  const mockParcels: Parcel[] = await api.parcel.getAll();
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Navbar />
      <div className="flex flex-row justify-center gap-6">
        <div className="grid grid-cols-5 gap-2">
          {mockParcels.map((parcel) => (
            <ParcelAdmin key={parcel.parcel_id} parcel={parcel} />
          ))}
        </div>
        <div className="item-end flex w-24 flex-col gap-1 font-noto-sans">
          <CreateParcel />
        </div>
      </div>
    </div>
  );
};

export default Home;
