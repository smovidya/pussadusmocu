import { type Parcel } from "@prisma/client";
import { NavbarUser } from "~/app/_components/NavbarUser";
import ParcelUser from "~/app/_components/Parcel.user";
import { api } from "~/trpc/server";

const Home = async ({ params }: { params: { id: string } }) => {
  const mockParcels: Parcel[] = await api.parcel.getRemain();
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarUser />
      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockParcels.map((parcel) => (
            <ParcelUser
              key={parcel.parcel_id}
              parcel={parcel}
              project_id={params.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
