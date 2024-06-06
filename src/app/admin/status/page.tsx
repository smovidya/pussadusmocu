import { PrismaClient, Parcel_Project, Project, Parcel } from '@prisma/client';
import Sta from './Sta';

const prisma = new PrismaClient();

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
};

export default async function Page() {
  const parcelsProjects = await prisma.parcel_Project.findMany({
    include: {
      project: true,
      parcel: true,
    },
  });
  return <Sta parcelsProjects={parcelsProjects} />;
}
