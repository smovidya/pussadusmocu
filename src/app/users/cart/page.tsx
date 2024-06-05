import { NavbarUser } from "~/app/_components/NavbarUser";
import { Statuesbox } from "~/app/_components/statusbox";
import { api } from "~/trpc/server";
import { Projectinparcel, Parcellist } from "~/utils/constant";

const Profile = async () => {
  const Parcel_Project: Projectinparcel[] = await api.parcel_Project.getAll();
  

  const grouped = Parcel_Project.reduce<Parcellist>((result, currentValue) => {
    const { project_id } = currentValue;
    result[project_id] = [...(result[project_id] ?? []), currentValue];
    return result;
  }, {});


  const rows = Object.keys(grouped).map((projectId) => (
    <div key={projectId} className="flex justify-center mb-4 py-8">
      <Statuesbox parcelslist={{ [projectId]: grouped[projectId] ?? [] }} />
    </div>
  ));

  return (
    <div className="flex flex-col gap-2 bg-stone-100">
      <NavbarUser />
      <div>{rows}</div>
      
    </div>
  );
};

export default Profile;
