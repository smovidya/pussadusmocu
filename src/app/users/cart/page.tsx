import { getCookie } from "cookies-next";
import { NavbarUser } from "~/app/_components/shared/nav/NavbarUser";
import { Statuesbox } from "~/app/_components/statusbox";
import { api } from "~/trpc/server";
import { cookies } from "next/headers";
import {
  type Projectinparcel,
  type Parcellist,
  STUDENT_ID,
} from "~/lib/constant";
import { decrypt } from "~/lib/function";
import { type Student } from "@prisma/client";

const Profile = async () => {
  const encryptedCookie = getCookie("student_id", { cookies });
  const student_id = await decrypt(encryptedCookie ?? "");
  const student =
    process.env.NODE_ENV === "development"
      ? await api.auth.getUser({
          student_id: student_id as string,
        })
      : (student_id as Student);
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

  return (
    <div className="flex flex-col gap-2 bg-stone-100">
      <NavbarUser />
      <div>{rows}</div>
    </div>
  );
};

export default Profile;
