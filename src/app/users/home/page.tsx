import { type Project } from "@prisma/client";
import { redirect } from "next/navigation";
import { ProjectBlog } from "~/components/ProjectsBlog";
import { getCurrentUser } from "~/lib/getCurrentUser";
import { api } from "~/trpc/server";

const Home = async () => {
  const student = await getCurrentUser();

  if (!student) {
    return redirect("/login");
  }

  try {
    const projects: Project[] = await api.project.getProjectByStudent({
      student_id: student.student_id,
    });

    return (
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
        <div className="font-noto-sans text-lg font-medium md:text-2xl">
          สวัสดี <span className="font-bold">{student.name}</span>{" "}
          สามารถเลือกโครงและยืมของได้เลย สู้ ๆ นะครับทุกคน 😙
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
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
    );
  } catch (error) {
    console.error("Error fetching data", error);
    return redirect("/login");
  }
};

export default Home;
