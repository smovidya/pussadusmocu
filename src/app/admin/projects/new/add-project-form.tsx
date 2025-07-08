"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { StudentCard } from "./student-card";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  id: z.string(),
  published: z.boolean(),
  name: z.string(),
  status: ProjectStatusEnumSchema,
  owner: ProjectOwnerEnumSchema,
  students: z.array(StudentSchema),
});

export function AddProjectForm() {
  const addProjectMutation = api.project.addProjectAndStudents.useMutation();
  const router = useRouter();
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "students",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    addProjectMutation.mutate(
      {
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
            title: "โครงการถูกบันทึกแล้ว",
            description: `โครงการ ${data.project.title} ถูกบันทึกสำเร็จ`,
            variant: "default",
          });
          router.push("/admin/projects");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto grid w-full grid-cols-1 gap-4 space-y-4 sm:grid-cols-2"
      >
        <div>
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
                        field.onChange(
                          `proj-${Math.random().toString(36).substr(2, 9)}`,
                        )
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
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
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
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
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
        <div>
          <h2 className="mb-2 text-xl font-bold">นิสิตยืมพัสดุ</h2>
          <p>กดขยายเพื่อแก้ไขรายละเอียด</p>
          {fields.map((field, index) => (
            <StudentCard
              fieldId={field.id}
              key={field.id}
              control={form.control}
              index={index}
              remove={remove}
              setValue={form.setValue}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                student_id: "",
                name: "",
                email: "",
                department: "SMO",
                isAdmin: false,
                line_id: "",
              })
            }
            className="w-full"
          >
            เพิ่มนิสิต
          </Button>
        </div>
        <Button type="submit" className="sm:col-span-2">
          บันทึกโครงการ
        </Button>
      </form>
    </Form>
  );
}
