"use client";
import { api } from "~/trpc/react";
import React from "react";

function Dropdown() {
  const {
    data: projects,
    error,
    isLoading,
  } = api.project.getProject.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-4/6 px-2 py-2">
      <p>โครงการ</p>
      <select className="w-full border border-yellow-200 px-1 py-2">
        {projects?.map((project) => (
          <option key={project.project_id}>{project.title}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
