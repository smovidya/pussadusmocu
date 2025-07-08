"use client";

import { Navbar } from "~/components/shared/nav/NavbarAdmin";
import { ProjectDataTable } from "./project-data-table";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FolderPlus } from "lucide-react";

export default function Projects() {
  const project = api.project.getAllProjects.useQuery();

  return (
    <div className="font-noto-sans flex h-full w-full flex-col items-center gap-2">
      <Navbar />
      <div className="container">
        <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-2xl font-bold text-gray-800">สถานะโครงการ</h1>
          <Link href="/admin/projects/new">
            <Button variant="default" className="gap-2">
              <FolderPlus className="size-5" />
              เพิ่มโครงการใหม่
            </Button>
          </Link>
        </div>
        <div>
          {project.isPending && <Skeleton className="h-44 w-full" />}
          {project.isError && (
            <p className="text-red-500">Error loading projects</p>
          )}
          {project.isSuccess && project.data.length === 0 && (
            <p className="text-gray-500">No projects found</p>
          )}
          {project.isSuccess && project.data.length > 0 && (
            <ProjectDataTable projects={project.data} />
          )}
        </div>
      </div>
    </div>
  );
}
