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
    <Card className="font-noto-sans h-auto w-44 hover:scale-105 hover:cursor-pointer">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.project_id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-noto-sans">เจ้าของโครง {project.owner}</p>
        <p className="font-noto-sans">สถานะ {project.status}</p>
      </CardContent>
    </Card>
  );
};
