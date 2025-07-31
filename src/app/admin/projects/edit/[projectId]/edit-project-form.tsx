"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ProjectOwnerEnumSchema,
  ProjectStatusEnumSchema,
} from "~/server/api/models/project.model";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Dice5 } from "lucide-react";
import { StudentSchema } from "~/server/api/models/auth.model";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { StudentSpreadsheet } from "./student-spreadsheet";

export const formSchema = z.object({
  id: z.string(),
  published: z.boolean(),
  name: z.string(),
  status: ProjectStatusEnumSchema,
  owner: ProjectOwnerEnumSchema,
  students: z.array(StudentSchema),
});

interface EditProjectFormProps {
  projectId: string;
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter();
  
  // Fetch existing project data
  const { data: projectData, isLoading, error } = api.project.getProjectById.useQuery({
    projectId: projectId,
  });

  const updateProjectMutation = api.project.updateProject.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      published: false,
      name: "",
      status: "NOTSTART",
      owner: "ETC",
      students: [],
    },
  });

  // Populate form when project data is loaded
  useEffect(() => {
    if (projectData) {
      form.reset({
        id: projectData.project_id,
        published: projectData.published,
        name: projectData.title,
        status: projectData.status as z.infer<typeof ProjectStatusEnumSchema>,
        owner: projectData.owner as z.infer<typeof ProjectOwnerEnumSchema>,
        students: projectData.students.map((studentProject) => ({
          student_id: studentProject.student.student_id,
          name: studentProject.student.name,
          email: studentProject.student.email,
          department: studentProject.student.department as z.infer<typeof StudentSchema>["department"],
          isAdmin: studentProject.student.isAdmin ?? false,
          line_id: studentProject.student.line_id ?? "",
        })),
      });
    }
  }, [projectData, form]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateProjectMutation.mutate(
      {
        projectId: projectId,
        project: {
          id: data.id,
          published: data.published,
          name: data.name,
          status: data.status,
          owner: data.owner,
        },
        users: data.students.map((student) => ({
          student_id: student.student_id,
          name: student.name,
          email: student.email,
          department: student.department,
          isAdmin: student.isAdmin,
          line_id: student.line_id,
        })),
      },
      {
        onError(error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description:
              error instanceof Error ? error.message : "Unknown error",
            variant: "destructive",
          });
        },
        onSuccess(data) {
          toast({
            title: "โครงการถูกอัปเดตแล้ว",
            description: `โครงการ ${data.project.title} ถูกอัปเดตสำเร็จ`,
            variant: "default",
          });
          router.push("/admin/projects");
        },
      },
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="text-lg font-semibold text-red-800">เกิดข้อผิดพลาด</h3>
        <p className="text-red-600">{error.message}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          className="mt-2"
        >
          กลับไปหน้าโครงการ
        </Button>
      </div>
    );
  }

  // Project not found
  if (!projectData) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h3 className="text-lg font-semibold text-yellow-800">ไม่พบโครงการ</h3>
        <p className="text-yellow-600">ไม่พบโครงการที่มี ID: {projectId}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          className="mt-2"
        >
          กลับไปหน้าโครงการ
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Information Section */}
        <div className="rounded-lg border p-6 bg-background">
          <h2 className="text-xl font-bold mb-4 text-foreground">ข้อมูลโครงการ</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสโครงการ</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input placeholder="680001" {...field} />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          field.onChange(`proj-${Math.random().toString(36).substr(2, 9)}`)
                        }
                        className="flex items-center gap-2"
                      >
                        <Dice5 className="size-4" />
                        <span className="hidden sm:inline">สุ่มรหัส</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อโครงการ</FormLabel>
                  <FormControl>
                    <Input placeholder="รับน้องวิทยาปี 2049" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>สถานะโครงการ</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสถานะโครงการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NOTSTART">ยังไม่เริ่ม</SelectItem>
                        <SelectItem value="INPROGRESS">กำลังดำเนินการ</SelectItem>
                        <SelectItem value="EVALUATE">กำลังประเมินผล</SelectItem>
                        <SelectItem value="COMPLETE">เสร็จสิ้น</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ฝ่ายของโครงการ</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกฝ่ายของโครงการ" />
                      </SelectTrigger>
                      <SelectContent>
                        {ProjectOwnerEnumSchema.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Student Spreadsheet Section */}
        <StudentSpreadsheet 
          control={form.control}
          setValue={form.setValue}
        />

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            ยกเลิก
          </Button>
          <Button 
            type="submit"
            disabled={updateProjectMutation.isPending}
          >
            {updateProjectMutation.isPending ? "กำลังอัปเดต..." : "อัปเดตโครงการ"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
