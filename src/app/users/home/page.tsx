import { type Project } from "@prisma/client";
import { cookies } from "next/headers";
import { NavbarUser } from "~/app/_components/NavbarUser";
import { ProjectBlog } from "~/app/_components/ProjectsBlog";
import { api } from "~/trpc/server";
import { encryptionKey } from "~/utils/constant";
import { getCookie } from "cookies-next";
import { decrypt } from "~/utils/function";
import { redirect } from "next/navigation";

const Profile = async () => {
  const encryptedCookie = getCookie("student_id", { cookies });
  const student_id = decrypt(encryptedCookie ?? "", encryptionKey);

  try {
    const projects: Project[] = await api.project.getProjectByStudent({
      student_id: student_id,
    });
    const student = await api.auth.getUser({
      student_id: student_id,
    });

    if (!student) {
      return redirect('/login');
    }

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
  } catch (error) {
    console.error("Error fetching data", error);
    return <div>Error fetching data</div>;
  }
};

export default Profile;
