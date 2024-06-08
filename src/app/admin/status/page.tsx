import { api } from '~/trpc/server';
import Sta from './Sta';
import { type Parcel_Project, type Parcel, type Project } from '@prisma/client';

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
};

export default async function Page() {
  const parcelsProjects = await api.parcel_Project.getAll();
  return <Sta parcelsProjects={parcelsProjects} />;
}
