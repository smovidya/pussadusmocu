import EditProject from "./edit-project";

interface EditProjectPageProps {
  params: {
    projectId: string;
  };
}

export default async function Page({ params }: EditProjectPageProps) {
  return <EditProject projectId={params.projectId} />;
}
