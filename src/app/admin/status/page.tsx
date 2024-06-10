import { PrismaClient, Parcel_Project, Project, Parcel } from "@prisma/client";
import Sta from "./Sta";
import { api } from "~/trpc/server";

const prisma = new PrismaClient();

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
};

export default async function Page() {
  const parcelsProjects = await api.parcel_Project.getAll();
  return <Sta parcelsProjects={parcelsProjects} />;
}
