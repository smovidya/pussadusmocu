import type { Status } from '@prisma/client';
import { Badge } from '~/components/ui/badge';
import { toast } from '~/components/ui/use-toast';
import { api } from "~/trpc/react"
import { SingleBadgeSelector } from '~/components/shared/select/badge';

export function ProjectStatusSelector({ projectId, status }: { projectId: string, status: Status }) {
  const setProjectStatus = api.project.setProjectStatus.useMutation();
  const utils = api.useUtils();

  return <SingleBadgeSelector
    options={[
      { value: "NOTSTART", label: () => <Badge className="bg-neutral-200">ยังไม่เริ่ม</Badge> },
      { value: "INPROGRESS", label: () => <Badge className="bg-yellow-200">ดำเนินอยู่</Badge> },
      { value: "COMPLETE", label: () => <Badge className="bg-green-200">เสร็จสิ้น</Badge> },
      { value: "EVALUATE", label: () => <Badge className="bg-blue-200">กำลังประเมิน</Badge> },
    ]}
    onValueChange={async (newStatus) => {
      try {
        await setProjectStatus.mutateAsync({ projectId, status: newStatus as Status });
        toast({
          title: "สถานะโครงการถูกเปลี่ยนแล้ว",
          description: `สถานะโครงการถูกเปลี่ยนเป็น ${newStatus}`,
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: (error instanceof Error ? error.message : "Unknown error"),
          variant: "destructive",
        });
      } finally {
        await utils.project.getAllProjects.invalidate();
      }
    }}
    value={status}
  />;
}