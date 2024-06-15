import { type Project } from "@prisma/client";
import { cookies } from "next/headers";
import { NavbarUser } from "~/app/_components/NavbarUser";
import { ProjectBlog } from "~/app/_components/ProjectsBlog";
import { RegisterParcel } from "~/app/_components/register-project";
import { api } from "~/trpc/server";
import { STUDENT_ID } from "~/utils/constant";

const Profile = async () => {
  const cookieStore = cookies();
  const student_id = cookieStore.get("student_id");
  console.log("COOKIE", student_id);
  const projects: Project[] = await api.project.getProjectByStudent({
    student_id: STUDENT_ID,
  });
  const student = await api.auth.getUser({
    student_id: student_id?.value ?? "",
  });

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <NavbarUser />
      <div className="flex flex-row justify-center gap-6">
        <div className="grid grid-cols-5 gap-2">
          {projects.map((project) => (
            <a
              key={project.project_id}
              href={`/users/shipping/${project.project_id}`}
            >
              <ProjectBlog project={project} />
            </a>
          ))}
        </div>
        <div className="item-end flex w-24 flex-col gap-1 font-noto-sans">
          <RegisterParcel />
          <p>{student_id?.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
