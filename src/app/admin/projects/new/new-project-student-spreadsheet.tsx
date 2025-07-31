"use client";

import { type Control, useFieldArray, useWatch, type UseFormSetValue } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
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
import { Checkbox } from "~/components/ui/checkbox";
import { StudentSchema } from "~/server/api/models/auth.model";
import { Trash2, Plus, UserPlus, Loader2 } from "lucide-react";
import { type formSchema } from "./add-project-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

interface StudentSpreadsheetProps {
  control: Control<z.infer<typeof formSchema>>;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
}

interface StudentRowProps {
  control: Control<z.infer<typeof formSchema>>;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
  index: number;
  onRemove: () => void;
  fieldId: string;
}

function StudentRow({ control, setValue, index, onRemove }: StudentRowProps) {
  const [lastFetchedId, setLastFetchedId] = useState<string>("");
  
  // Watch the student_id field for this specific row
  const studentId = useWatch({
    control,
    name: `students.${index}.student_id`,
  });

  // Query to fetch student data when student_id is 10 characters
  const { data: studentData, isLoading } = api.auth.getUser.useQuery(
    { student_id: studentId },
    {
      enabled: studentId?.length === 10 && studentId !== lastFetchedId,
      retry: false,
    }
  );

  useEffect(() => {
    // Auto-fill when student data is found
    if (studentData && studentId?.length === 10 && studentId !== lastFetchedId) {
      // Update form with fetched data
      setValue(`students.${index}.name`, studentData.name || "");
      setValue(`students.${index}.email`, studentData.email || "");
      setValue(`students.${index}.department`, (studentData.department || "SMO") as z.infer<typeof StudentSchema>["department"]);
      setValue(`students.${index}.line_id`, studentData.line_id || "");
      setValue(`students.${index}.isAdmin`, studentData.isAdmin || false);
      
      setLastFetchedId(studentId);
    }
    
    // Reset other fields when student_id changes (except when auto-filling)
    if (studentId !== lastFetchedId && studentId?.length !== 10) {
      // Only clear if not currently fetching and ID is not 10 chars
      if (!isLoading && studentId !== lastFetchedId) {
        setValue(`students.${index}.name`, "");
        setValue(`students.${index}.email`, "");
        setValue(`students.${index}.department`, "SMO");
        setValue(`students.${index}.line_id`, "");
        setValue(`students.${index}.isAdmin`, false);
        setLastFetchedId("");
      }
    }
  }, [studentData, studentId, lastFetchedId, isLoading, setValue, index]);

  return (
    <TableRow className="hover:bg-muted/30">
      <TableCell className="p-2 border relative">
        <FormField
          control={control}
          name={`students.${index}.student_id`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="680xxxxx"
                    {...field}
                    className="bg-transparent p-2 focus:bg-background focus:border-input"
                  />
                  {isLoading && field.value?.length === 10 && (
                    <Loader2 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-2 border">
        <FormField
          control={control}
          name={`students.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  {...field}
                  className="bg-transparent p-2 focus:bg-background focus:border-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-2 border">
        <FormField
          control={control}
          name={`students.${index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="student@student.chula.ac.th"
                  type="email"
                  {...field}
                  className="bg-transparent p-2 focus:bg-background focus:border-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-2 border">
        <FormField
          control={control}
          name={`students.${index}.department`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-transparent p-2 focus:bg-background focus:border-input">
                    <SelectValue placeholder="เลือก" />
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
      </TableCell>
      <TableCell className="p-2 border">
        <FormField
          control={control}
          name={`students.${index}.line_id`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="line_id"
                  {...field}
                  className="bg-transparent p-2 focus:bg-background focus:border-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-2 border text-center">
        <FormField
          control={control}
          name={`students.${index}.isAdmin`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                  className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-2 border text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function NewProjectStudentSpreadsheet({ control, setValue }: StudentSpreadsheetProps) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "students",
  });

  const addStudent = () => {
    append({
      student_id: "",
      name: "",
      email: "",
      department: "SMO",
      isAdmin: false,
      line_id: "",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          นิสิตยืมพัสดุ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[150px]">รหัสนิสิต</TableHead>
                <TableHead className="min-w-[200px]">ชื่อ-นามสกุล</TableHead>
                <TableHead className="min-w-[200px]">อีเมล</TableHead>
                <TableHead className="w-[120px]">ภาควิชา</TableHead>
                <TableHead className="min-w-[150px]">Line ID</TableHead>
                <TableHead className="w-[80px] text-center">Admin</TableHead>
                <TableHead className="w-[80px] text-center">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    ยังไม่มีนิสิต คลิก &quot;เพิ่มนิสิต&quot; เพื่อเริ่มต้น
                  </TableCell>
                </TableRow>
              ) : (
                fields.map((field, index) => (
                  <StudentRow
                    key={field.id}
                    control={control}
                    setValue={setValue}
                    index={index}
                    onRemove={() => remove(index)}
                    fieldId={field.id}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 flex justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={addStudent}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            เพิ่มนิสิต
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
