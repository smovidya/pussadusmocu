"use client";

import { type Control, type UseFormSetValue, useWatch } from "react-hook-form";
import { type z } from "zod";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { type formSchema } from "./add-project-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { StudentSchema } from '~/server/api/models/auth.model';
import { api } from "~/trpc/react";

interface StudentCardProps {
  control: Control<z.infer<typeof formSchema>>;
  index: number;
  remove: (index: number) => void;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
  fieldId: string;
}

interface StudentFormFieldsProps {
  control: Control<z.infer<typeof formSchema>>;
  index: number;
}

function StudentFormFields({ control, index }: StudentFormFieldsProps) {
  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name={`students.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">ชื่อ</FormLabel>
            <FormControl>
              <Input placeholder="ชื่อนิสิต" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`students.${index}.email`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">อีเมล</FormLabel>
            <FormControl>
              <Input
                placeholder="xxx@example.com"
                type="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`students.${index}.department`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">ภาควิชา</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกภาควิชา" />
                </SelectTrigger>
                <SelectContent>
                  {StudentSchema.shape.department.options.map((option) => (
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
      <FormField
        control={control}
        name={`students.${index}.line_id`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">LINE ID</FormLabel>
            <FormControl>
              <Input placeholder="line_id" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`students.${index}.isAdmin`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-yellow-600 has-[[aria-checked=true]]:bg-yellow-50 dark:has-[[aria-checked=true]]:border-yellow-900 dark:has-[[aria-checked=true]]:bg-yellow-950">
                <Checkbox
                  id={`toggle-admin-${index}`}
                  className="data-[state=checked]:border-yellow-600 data-[state=checked]:bg-yellow-600 data-[state=checked]:text-white dark:data-[state=checked]:border-yellow-700 dark:data-[state=checked]:bg-yellow-700"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    ตั้งเป็นผู้ดูแลระบบ
                  </p>
                  <p className="text-muted-foreground text-sm">
                    ผู้ดูแลระบบคือผู้ที่มีสิทธิ์ในการจัดการโครงการบนเว็บไซต์นี้
                    เช่น การแก้ไขข้อมูลนิสิต การลบโครงการ เป็นต้น
                  </p>
                </div>
              </Label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}


export function StudentAutoFillForm({
  control,
  index,
  setValue,
}: {
  control: Control<z.infer<typeof formSchema>>;
  index: number;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
}) {
  const studentId = useWatch({
    name: `students.${index}.student_id`,
    control,
    defaultValue: "",
  });

  const studentUser = api.auth.getUser.useQuery(
    {
      student_id: studentId,
    }
  );

  useEffect(() => {
    if (studentUser.data) {
      setValue(`students.${index}.name`, studentUser.data.name ?? "");
      setValue(`students.${index}.email`, studentUser.data.email ?? "");
      setValue(`students.${index}.department`, studentUser.data.department ?? "SMO");
      setValue(`students.${index}.line_id`, studentUser.data.line_id ?? "");
      setValue(`students.${index}.isAdmin`, studentUser.data.isAdmin ?? false);
    }
  }, [studentUser.data, setValue, index]);

  const handleResetToSystemData = () => {
    if (studentUser.data) {
      setValue(`students.${index}.name`, studentUser.data.name ?? "");
      setValue(`students.${index}.email`, studentUser.data.email ?? "");
      setValue(`students.${index}.department`, studentUser.data.department ?? "SMO");
      setValue(`students.${index}.line_id`, studentUser.data.line_id ?? "");
      setValue(`students.${index}.isAdmin`, studentUser.data.isAdmin ?? false);
    }
  };

  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name={`students.${index}.student_id`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">รหัสนิสิต</FormLabel>
            <FormControl>
              <Input placeholder="6xxxxxxx" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Loading state */}
      {studentUser.isLoading && studentId.length === 10 && (
        <>
          <p className="text-sm text-blue-600">กำลังโหลดข้อมูลนิสิต...</p>
          <Skeleton className="h-[200px] w-full" />
        </>
      )}

      {/* Error state */}
      {studentUser.isError && studentUser.error && studentId.length === 10 && (
        <p className="text-sm text-red-500">{studentUser.error.message}</p>
      )}

      {/* No student found message */}
      {studentUser.isSuccess && studentUser.data === null && studentId.length === 10 && (
        <p className="text-sm text-red-500">
          ไม่พบข้อมูลนิสิต เพิ่มนิสิตโดยการใส่ข้อมูลด้านล่าง
          นิสิตจะถูกเพิ่มเมื่อกดบันทึกโครงการ
        </p>
      )}

      {/* Student found message with reset button */}
      {studentUser.data && (
        <p className="text-sm text-green-600">
          มีข้อมูลนิสิตคนนี้ในระบบ
          การแก้ไขข้อความจะเป็นการอัปเดตข้อมูลของนิสิตในระบบ
          (หลังบันทึกโครงการแล้ว)
          <Button
            variant="link"
            type="button"
            onClick={handleResetToSystemData}
            className="inline ml-2 p-0 h-auto"
          >
            รีเซ็ตกลับเป็นข้อมูลในระบบ
          </Button>
        </p>
      )}

      {/* Always show form fields as fallback */}
      {!studentUser.isLoading && (
        <StudentFormFields control={control} index={index} />
      )}
    </div>
  );
}


export function StudentCard({
  control,
  index,
  remove,
  setValue,
  fieldId,
}: StudentCardProps) {
  const studentName = useWatch({
    control,
    name: `students.${index}.name`,
    defaultValue: "",
  });
  const studentDepartment = useWatch({
    control,
    name: `students.${index}.department`,
    defaultValue: "SMO",
  });
  const isAdmin = useWatch({
    control,
    name: `students.${index}.isAdmin`,
    defaultValue: false,
  });

  return (
    <Card className="mb-1 p-2" key={fieldId}>
      <Collapsible>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex w-full items-center gap-2 text-sm font-bold text-gray-700">
            <ChevronsUpDown className="size-4" />
            <h3 className="text-left text-xs">
              {index + 1}
              {studentName && `: ${studentName}`}{" "}
              {studentDepartment && `(${studentDepartment})`}
              {isAdmin && " (ผู้ดูแลระบบ)"}
            </h3>
          </CollapsibleTrigger>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            ลบ
          </Button>
        </div>
        <CollapsibleContent>
          <StudentAutoFillForm
            control={control}
            index={index}
            setValue={setValue}
          />
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
