import type { Parcel } from "@prisma/client";
import { api } from "~/trpc/server";
import { Parcels } from "./parcels";

const Home = async () => {
  const mockParcels: Parcel[] = await api.parcel.getAll();
  return <Parcels parcels={mockParcels} />;
};

export default Home;
