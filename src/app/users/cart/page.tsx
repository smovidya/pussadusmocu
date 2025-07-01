import { Statuesbox } from "~/components/statusbox";
import { api } from "~/trpc/server";
import {
  type Projectinparcel,
  type Parcellist,
  STUDENT_ID,
} from "~/lib/constant";
import { getCurrentUser } from "~/lib/getCurrentUser";

const Profile = async () => {
  const student = await getCurrentUser();

  const Parcel_Project: Projectinparcel[] = await api.parcel_Project.getAll({
    student_id: student?.student_id ?? STUDENT_ID,
  });

  const grouped = Parcel_Project.reduce<Parcellist>((result, currentValue) => {
    const { project_id } = currentValue;
    result[project_id] = [...(result[project_id] ?? []), currentValue];
    return result;
  }, {});

  const rows = Object.keys(grouped).map((projectId) => (
    <div key={projectId} className="mb-4 flex justify-center py-8">
      <Statuesbox
        parcelslist={{ [projectId]: grouped[projectId] ?? [] }}
        student_id={student?.student_id ?? STUDENT_ID}
      />
    </div>
  ));

  return <div>{rows}</div>;
};

export default Profile;
