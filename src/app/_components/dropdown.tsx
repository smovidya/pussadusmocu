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
    <div className="mb-2 mt-2 w-4/6 px-2 py-2">
      <p>โครงการ</p>
      <select className="w-full border border-yellow-200 py-2 px-1">
        {projects?.map((project) => (
          <option key={project.project_id}>{project.title}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
