import { type Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface Props {
  project: Project;
}

export const ProjectBlog = ({ project }: Props) => {
  return (
    <Card className="bg-white01 flex h-full w-full flex-col p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {project.project_id}
        </CardDescription>
      </CardHeader>
      <CardContent className="grow pt-2">
        <p className="text-base text-gray-700">
          เจ้าของโครง: <span className="font-medium">{project.owner}</span>
        </p>
        <p className="text-base text-gray-700">
          สถานะ:{" "}
          <span
            className={`font-medium ${project.status === "INPROGRESS" ? "text-green01" : "text-red01"}`}
          >
            {project.status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
