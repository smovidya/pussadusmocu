"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "~/components/ui/textarea";
import { Types } from "./combobox/type";
import { Group } from "./combobox/group";
import { Departments } from "./combobox/department";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { typeSelector } from "~/stores/slices/type";
import { groupSelector } from "~/stores/slices/group";
import { departmentSelector } from "~/stores/slices/department";
import {
  departments,
  FormSchemaRegister,
  type FormSchemaRegisterType,
  groups,
  STUDENT_ID,
  types,
} from "~/utils/constant";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { Projects } from "./combobox/project";
import { projectSelector } from "~/stores/slices/project";

export function RegisterParcel() {
  const router = useRouter();
  const project = [
    {
      value: "112345",
      label: "ค่ายอาสาพัฒนา",
    },
    {
      value: "112346",
      label: "พี่น้องร้องเล่น",
    },
    {
      value: "112347",
      label: "ค่ายอนุรักษ์",
    },
  ];
  const { toast } = useToast();
  const [image_url, setImageUrl] = useState("");
  const [close, setClose] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const typeReducer = useSelector(typeSelector);
  const groupReducer = useSelector(groupSelector);
  const departmentReducer = useSelector(departmentSelector);
  const projectReducer = useSelector(projectSelector);
  const type = typeReducer.key;
  const department = departmentReducer.key;
  const group = groupReducer.key;
  const project_id = projectReducer.key;
  const registerProject = api.project.registerProject.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      project_id: "",
    },
  });

  async function onSubmit(_data: FormSchemaRegisterType) {
    registerProject.mutate({
      project_id: project_id,
      student_id: STUDENT_ID,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">เลือกโครง</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] font-noto-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>กรอกข้อมูลพัสดุใหม่</DialogTitle>
          <DialogDescription>กรุณาใส่ข้อมูลให้ครบถ้วน.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full space-y-6"
        >
          <div className="grid w-full gap-4 py-4">
            <div className="grid grid-cols-2 gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="">
                  เลือกโครง
                </Label>
                <Projects
                  disabled={disabled}
                  options={project}
                  {...form.register("project_id")}
                />
              </div>
            </div>
            {!close && (
              <Button type="submit" disabled={disabled}>
                {" "}
                {registerProject.isPending
                  ? "กำลังดำเนินการ..."
                  : "เลือกโครง!!!"}
              </Button>
            )}
          </div>
        </form>
        {close && (
          <DialogClose asChild>
            <Button type="submit" onClick={() => setClose(false)}>
              ปิด
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}
