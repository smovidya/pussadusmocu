import {
  type Parcel_Project,
  type Project,
  type Parcel,
  type Student,
} from "@prisma/client";
import BookingStatus from "./booking_status";
import { api } from "~/trpc/server";

export type ParcelProjectWithDetails = Parcel_Project & {
  project: Project;
  parcel: Parcel;
  student: Student;
};

export default async function Page() {
  const parcelsProjects = await api.parcel_Project.getAll({
    student_id: undefined,
  });
  return <BookingStatus parcelsProjects={parcelsProjects} />;
}
