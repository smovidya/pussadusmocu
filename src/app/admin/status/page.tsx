import { type Parcel_Project, type Project, type Parcel } from "@prisma/client";
import Sta from "./bokking_status";
import { api } from "~/trpc/server";

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
};

export default async function Page() {
  const parcelsProjects = await api.parcel_Project.getAll();
  return <Sta parcelsProjects={parcelsProjects} />;
}
