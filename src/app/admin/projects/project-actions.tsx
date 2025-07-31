import { MoreHorizontal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '~/components/ui/alert-dialog';
import { toast } from '~/components/ui/use-toast';
import { api } from '~/trpc/react';
import Link from 'next/link';

export function ProjectRowActions({ projectId }: { projectId: string }) {
  const utils = api.useUtils();
  const removeProject = api.project.removeProject.useMutation({
    onError(error, variables) {
      toast({
        title: "ลบโครงการล้มเหลว",
        description: `ไม่สามารถลบโครงการ ${variables.projectId} ได้: ${error.message}`,
        variant: "destructive",
      });
    },
    async onSuccess(data, variables) {
      toast({
        title: "ลบโครงการสำเร็จ",
        description: `โครงการ ${variables.projectId} ได้ถูกลบเรียบร้อยแล้ว`,
        variant: "default",
      });
      await utils.project.getAllProjects.invalidate();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">เปิดเมนู</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>ดำเนินการ</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(projectId);
            toast({
              title: "คัดลอกสำเร็จ",
              description: `ID โครงการ ${projectId} ได้ถูกคัดลอกไปยังคลิปบอร์ด`,
              duration: 2000,
            });
          }}
        >
          คัดลอก ID โครงการ
        </DropdownMenuItem>
        <Link href={`/admin/projects/edit/${projectId}`}>
          <DropdownMenuItem>แก้ไขโครงการ</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              ลบโครงการ
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการลบโครงการ</AlertDialogTitle>
              <AlertDialogDescription>
                คุณแน่ใจหรือไม่ที่จะลบโครงการ &quot;{projectId}&quot;? 
                การดำเนินการนี้ไม่สามารถยกเลิกได้
                และข้อมูลทั้งหมดของโครงการจะหายไปอย่างถาวร
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={async () => {
                  await removeProject.mutateAsync({ projectId });
                }}
              >
                ลบโครงการ
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
