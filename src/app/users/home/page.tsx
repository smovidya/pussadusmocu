import { type Project } from "@prisma/client";
import { NavbarUser } from "~/app/_components/NavbarUser";
import { ProjectBlog } from "~/app/_components/ProjectsBlog";
import { api } from "~/trpc/server";
import { STUDENT_ID } from "~/utils/constant";

const Profile = async () => {
  const projects: Project[] = await api.project.getProjectByStudent({
    student_id: STUDENT_ID,
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
      </div>
    </div>
  );
};

export default Profile;
