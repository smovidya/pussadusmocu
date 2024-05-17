import { type Parcel } from "@prisma/client";
import { NavbarUser } from "~/app/_components/NavbarUser";
import ParcelUser from "~/app/_components/Parcel.user";
import { api } from "~/trpc/server";

const Home = async () => {
  const mockParcels: Parcel[] = await api.parcel.getAll();
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <NavbarUser />
      <div className="flex flex-row justify-center gap-6">
        <div className="grid grid-cols-5 gap-2">
          {mockParcels.map((parcel) => (
            <ParcelUser key={parcel.parcel_id} parcel={parcel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
