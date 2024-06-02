import { type Parcel_Project } from "@prisma/client";
import { NavbarUser } from "~/app/_components/NavbarUser";
import { Statuesbox } from "~/app/_components/statusbox";
import { RegisterParcel } from "~/app/_components/register-project";
import { api } from "~/trpc/server";

const Profile = async () => {
  const Parcel_Project: Parcel_Project[] = await api.parcel_Project.getAll();
  const grouped: Record<string, Parcel_Project[]> = Parcel_Project.reduce(
    (
      result: Record<string, Parcel_Project[]>,
      currentValue: Parcel_Project,
    ) => {
      (result[currentValue.project_id] =
        result[currentValue.project_id] ?? []).push(currentValue);
      return result;
    },
    {},
  );
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <NavbarUser />
      <div className="flex flex-row justify-center gap-6">
        <div className="gap- grid grid-cols-5 bg-gray-100">
          <Statuesbox parcelslist={grouped} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
