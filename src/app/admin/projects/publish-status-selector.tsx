import { Badge } from "~/components/ui/badge";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { SingleBadgeSelector } from "~/components/shared/select/badge";

export function PublishStatusSelector({
  projectId,
  isPublished,
}: {
  projectId: string;
  isPublished: boolean;
}) {
  const setProjectPublished = api.project.setProjectPublished.useMutation();
  const utils = api.useUtils();
  const status = isPublished ? "yes" : "no";
  return (
    <SingleBadgeSelector
      options={[
        {
          value: "yes",
          label: () => <Badge className="bg-green-300">เผยแพร่แล้ว</Badge>,
        },
        {
          value: "no",
          label: () => <Badge className="bg-neutral-200">ไม่</Badge>,
        },
      ]}
      onValueChange={async (newStatus) => {
        try {
          await setProjectPublished.mutateAsync({
            projectId,
            isPublished: newStatus === "yes",
          });
          toast({
            title: "สถานะการเผยแพร่โครงการถูกเปลี่ยนแล้ว",
            description: `สถานะการเผยแพร่โครงการถูกเปลี่ยนเป็น ${newStatus === "yes" ? "เผยแพร่แล้ว" : "ยังไม่เผยแพร่"}`,
            variant: "default",
          });
        } catch (error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description:
              error instanceof Error ? error.message : "Unknown error",
            variant: "destructive",
          });
        } finally {
          await utils.project.getAllProjects.invalidate();
        }
      }}
      value={status}
    />
  );
}
