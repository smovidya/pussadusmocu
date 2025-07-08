"use client";

import { Navbar } from "~/components/shared/nav/NavbarAdmin";
import { AddProjectForm } from "./add-project-form";

export default function NewProject() {
  return (
    <div className="font-noto-sans flex h-full w-full flex-col items-center gap-2">
      <Navbar />

      <div className="container m-auto p-5">
        <h1 className="text-2xl font-bold text-gray-800">เพิ่มโครงการใหม่</h1>
        <div className="mt-4">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
