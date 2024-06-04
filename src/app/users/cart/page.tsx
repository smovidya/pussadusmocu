import { NavbarUser } from "~/app/_components/NavbarUser";
import { Statuesbox } from "~/app/_components/statusbox";
import { api } from "~/trpc/server";
import { Projectinparcel } from "~/utils/constant";

const Profile = async () => {
  const Parcel_Project: Projectinparcel[] = await api.parcel_Project.getAll();
  const grouped: Record<string, Projectinparcel[]> = Parcel_Project.reduce(
    (
      result: Record<string, Projectinparcel[]>,
      currentValue: Projectinparcel,
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
      <div className="flex justify-center">
          <Statuesbox parcelslist={grouped} />
      </div>
    </div>
  );
};

export default Profile;
