"use client";
import { api } from "~/trpc/react";
import React from "react";

type DropdownProps = {
  setSelectedProjectId: React.Dispatch<React.SetStateAction<string | null>>;
};

function Dropdown({ setSelectedProjectId }: DropdownProps) {
  const {
    data: projects,
    error,
    isLoading,
  } = api.project.getProject.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectId(event.target.value);
  };

  return (
    <div className="w-4/6 px-2 py-2">
      <p>โครงการ</p>
      <select
        className="w-full bg-background border border-yellow-200 px-1 py-2"
        onChange={handleProjectChange}
      >
        <option value="">ทั้งหมด</option>
        {projects?.map((project) => (
          <option key={project.project_id} value={project.project_id}>
            {project.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
