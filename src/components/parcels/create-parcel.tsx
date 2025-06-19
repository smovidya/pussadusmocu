"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Compressor from "compressorjs"; // Import Compressor
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
import { Types } from "~/components/shared/combobox/type";
import { Group } from "~/components/shared/combobox/group";
import { Departments } from "~/components/shared/combobox/department";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { typeSelector } from "~/stores/slices/type";
import { groupSelector } from "~/stores/slices/group";
import { departmentSelector } from "~/stores/slices/department";
import {
  departments,
  FormSchema,
  groups,
  ParcelDepartmentSchema,
  ParcelGroupSchema,
  ParcelTypeSchema,
  types,
  type FormSchemaType,
  type UploadResponse,
} from "~/lib/constant";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";

export function CreateParcel() {
  const router = useRouter();
  const { toast } = useToast();
  const [image_url, setImageUrl] = useState("");
  const [close, setClose] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const typeReducer = useSelector(typeSelector);
  const groupReducer = useSelector(groupSelector);
  const departmentReducer = useSelector(departmentSelector);
  const type = typeReducer.key;
  const department = departmentReducer.key;
  const group = groupReducer.key;
  const createParcel = api.parcel.create.useMutation({
    onSuccess: () => {
      setClose(true);
      setDisabled(false);
      router.refresh();
    },

    onError: (error) => {
      toast({
        title: "Alert",
        variant: "destructive",
        description: error.message,
        className: "font-noto-sans",
        action: <ToastAction altText="close button">close</ToastAction>,
      });
      setDisabled(false);
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parcel_id: "",
      parcel_title: "",
      description: "",
      type: ParcelTypeSchema.Values.NORMAL,
      group: ParcelGroupSchema.Values.OFFICE,
      amount: 0,
      unit: "ชิ้น",
      available: true,
      department: ParcelDepartmentSchema.Values.SMO,
      image: undefined,
    },
  });

  function getBase64(event: HTMLInputElement) {
    const target = event;
    const file = target.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    new Compressor(file, {
      quality: 0.6, // Adjust quality as needed
      maxWidth: 1000, // Adjust max width as needed
      success(compressedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          const result = reader.result?.toString() ?? "";
          let split_result = result.split("data:image/png;base64,");
          if (split_result.length !== 2) {
            split_result = result.split("data:image/jpeg;base64,");
          }
          setImageUrl(split_result[1] ?? "");
        };
        reader.onerror = (error) => {
          console.error("Error:", error);
        };
      },
      error(err) {
        console.error(err.message);
      },
    });
  }

  async function onSubmit(data: FormSchemaType) {
    try {
      setDisabled(true);
      const response = await fetch(
        "https://smo-api.bunyawatapp37204.workers.dev/images/upload",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: image_url,
            height: 100,
          }),
        },
      );
      const jsonData: unknown = await response.json();
      const _data = jsonData as UploadResponse;
      const img =
        "https://smo-api.bunyawatapp37204.workers.dev/images/" + _data.key;
      const _amount = data.amount;
      createParcel.mutate({
        amount: _amount,
        available: data.available,
        department: department,
        type: type,
        group: group,
        image_url: img,
        id: data.parcel_id,
        unit: data.unit,
        name: data.parcel_title,
        description: data.description,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">สร้างพัสดุใหม่</Button>
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
            <div className="grid w-full grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  เลขไอดี
                </Label>
                <Input
                  disabled={disabled}
                  type="text"
                  {...form.register("parcel_id")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  ชื่อพัสดุ
                </Label>
                <Input
                  disabled={disabled}
                  type="text"
                  {...form.register("parcel_title")}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  หมวดหมู่
                </Label>
                <Group
                  disabled={disabled}
                  options={groups}
                  {...form.register("group")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  ประเภท
                </Label>
                <Types
                  disabled={disabled}
                  options={types}
                  {...form.register("type")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  รูปพัสดุ
                </Label>
                <Input
                  disabled={disabled}
                  type="file"
                  {...form.register("image")}
                  className="col-span-3 hover:cursor-pointer"
                  onChange={(event) => getBase64(event.target)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  รายละเอียด
                </Label>
                <Textarea
                  disabled={disabled}
                  {...form.register("description")}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  จำนวน
                </Label>
                <Input
                  disabled={disabled}
                  type="number"
                  {...form.register("amount")}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="">
                  หน่วยงาน
                </Label>
                <Departments
                  disabled={disabled}
                  options={departments}
                  {...form.register("department")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  หน่วย
                </Label>
                <Input
                  disabled={disabled}
                  type="text"
                  {...form.register("unit")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  ใช้งานได้
                </Label>
                <Input
                  disabled={disabled}
                  type="checkbox"
                  {...form.register("available")}
                  className=" w-6"
                />
              </div>
            </div>
            {!close && (
              <Button
                type="submit"
                className="bg-black text-white hover:bg-grey01"
                disabled={disabled}
              >
                {" "}
                {createParcel.isPending ? "กำลังสร้าง..." : "สร้างเลย!!!"}
              </Button>
            )}
          </div>
        </form>
        {close && (
          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-red01 text-white hover:bg-red-500"
              onClick={() => setClose(false)}
            >
              ปิด
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}
