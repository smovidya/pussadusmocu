import type { Owner } from '@prisma/client';
import { SingleBadgeSelector } from '~/components/shared/select/badge';
import { toast } from '~/components/ui/use-toast';
import { api } from '~/trpc/react';

export function OwnerSelector({ projectId, owner }: { projectId: string, owner: Owner }) {
  const setProjectOwner = api.project.setProjectOwner.useMutation();
  const utils = api.useUtils();

  return (
    <SingleBadgeSelector
      options={[
        { value: "PRESSIDENT", label: () => <span className="text-blue-600">นายก</span> },
        { value: "VICE1", label: () => <span className="text-green-600">อุป 1</span> },
        { value: "VICE2", label: () => <span className="text-yellow-600">อุป 2</span> },
        { value: "SECRETARY", label: () => <span className="text-purple-600">เลขานุการ</span> },
        { value: "TRASURER", label: () => <span className="text-red-600">เหรัญญิก</span> },
        { value: "STUDENT_RELATION", label: () => <span className="text-pink-600">นิสิตสัมพันธ์</span> },
        { value: "ARTS", label: () => <span className="text-orange-600">ศิลปะวัฒนธรรม</span> },
        { value: "ACADEMIC", label: () => <span className="text-teal-600">วิชาการ</span> },
        { value: "SPORT", label: () => <span className="text-cyan-600">กีฬา</span> },
        { value: "SOCIAL_DEVELOPMENT", label: () => <span className="text-lime-600">พัฒนาสังคม</span> },
        { value: "KORKOR_CLUB", label: () => <span className="text-gray-600">กก</span> },
        { value: "SCIREN_CLUB", label: () => <span className="text-indigo-600">SCIREN</span> },
        { value: "VATA_CLUB", label: () => <span className="text-violet-600">วิทยาวาทะ</span> },
        { value: "EDUCATION_CLUB", label: () => <span className="text-fuchsia-600">การศึกษา</span> },
        { value: "ANURAK_CLUB", label: () => <span className="text-sky-600">อนุรักษ์</span> },
        { value: "ASA_CLUB", label: () => <span className="text-amber-600">อาสา</span> },
        { value: "ETC", label: () => <span className="text-gray-500">อื่นๆ</span> },
      ]}
      onValueChange={async (newOwner) => {
        try {
          await setProjectOwner.mutateAsync({ projectId, owner: newOwner as Owner });
          toast({
            title: "เจ้าของโครงการถูกเปลี่ยนแล้ว",
            description: `เจ้าของโครงการถูกเปลี่ยนเป็น ${newOwner}`,
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
      value={owner}
    />
  );
}