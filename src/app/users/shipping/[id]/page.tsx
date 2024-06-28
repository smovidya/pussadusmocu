import { type Parcel } from "@prisma/client";
import { Shipping } from "~/app/_components/Shipping";
import { api } from "~/trpc/server";

const Home = async ({ params }: { params: { id: string } }) => {
  const mockParcels: Parcel[] = await api.parcel.getRemain();
  return (
    <Shipping id={params.id} key={params.id} parcels={mockParcels}/>
  );
};

export default Home;
