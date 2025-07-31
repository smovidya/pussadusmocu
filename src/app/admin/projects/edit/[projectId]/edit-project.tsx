"use client";

import { Navbar } from "~/components/shared/nav/NavbarAdmin";
import { EditProjectForm } from "./edit-project-form";

interface EditProjectProps {
  projectId: string;
}

export default function EditProject({ projectId }: EditProjectProps) {
  return (
    <div className="font-noto-sans flex h-full w-full flex-col items-center gap-2">
      <Navbar />

      <div className="container m-auto p-5">
        <h1 className="text-2xl font-bold text-gray-800">แก้ไขโครงการ</h1>
        <div className="mt-4">
          <EditProjectForm projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
