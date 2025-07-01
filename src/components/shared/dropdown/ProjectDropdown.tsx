"use client";
import { api } from "~/trpc/react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

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

  return (
    <div className="w-full px-2 py-2">
      <label htmlFor="project-select">โครงการ</label>
      <Select onValueChange={setSelectedProjectId}>
        <SelectTrigger id="project-select" className="w-full">
          <SelectValue placeholder="ทั้งหมด" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          {projects?.map((project) => (
            <SelectItem key={project.project_id} value={project.project_id}>
              {project.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Dropdown;
