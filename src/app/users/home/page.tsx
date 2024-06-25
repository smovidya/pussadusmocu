import { type Project } from "@prisma/client";
import { cookies } from "next/headers";
import { NavbarUser } from "~/app/_components/NavbarUser";
import { ProjectBlog } from "~/app/_components/ProjectsBlog";
import { api } from "~/trpc/server";
import { type UserData } from "~/utils/constant";
import { getCookie } from "cookies-next";
import { decrypt } from "~/utils/function";
import { redirect } from "next/navigation";

const Profile = async () => {
  const encryptedCookie = getCookie("student_id", { cookies });
  const student_id = await decrypt(encryptedCookie ?? "");
  const ouid =
    typeof student_id === "string"
      ? (student_id as string)
      : (student_id as UserData).ouid;
  try {
    const projects: Project[] = await api.project.getProjectByStudent({
      student_id: ouid,
    });
    const student = await api.auth.getUser({
      student_id: ouid,
    });

    if (!student) {
      return redirect("/login");
    }

    return (
      <div className="flex min-h-full w-full flex-col gap-2 bg-slate-100 text-gray-900">
        <NavbarUser />
        <div className="flex flex-row justify-center gap-6">
          <div className="w-full max-w-5xl p-4">
            <div className="font-noto-sans text-lg font-medium md:text-2xl">
              สวัสดี <span className="font-bold">{student.name}</span>{" "}
              ยินดีต้อนรับสู่เว็บพัสดุ สามารถเลือกโครงและยืมของได้เลย 😙
            </div>
            <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <a
                  key={project.project_id}
                  href={`/users/shipping/${project.project_id}`}
                  className="transform transition-transform duration-300 hover:scale-105"
                >
                  <ProjectBlog project={project} />
                </a>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data", error);
    return redirect("/login");
  }
};

export default Profile;
