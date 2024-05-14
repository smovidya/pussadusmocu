"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const FormSchema = z.object({
  parcel_id: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  parcel_title: z.string(),
  image: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "The profile picture must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    })
    .nullable()
    .optional(),
  description: z.string(),
  type: z.string(),
  group: z.string(),
  amount: z.string(),
  available: z.boolean(),
  department: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;
interface UploadResponse {
  key: string;
}

const types = [
  {
    value: "NORMAL",
    label: "ทั่วไป",
  },
  {
    value: "DURABLE",
    label: "ครุภัณฑ์",
  },
];

const groups = [
  {
    value: "OFFICE",
    label: "สำนักงาน",
  },
  {
    value: "ELECTRONIC",
    label: "เครื่องใช้ไฟฟ้า",
  },
  {
    value: "HOME",
    label: "งานบ้าน",
  },
  {
    value: "BUILDING",
    label: "งานก่อสร้าง",
  },
  {
    value: "FUEL",
    label: "เชื้อเพลิง",
  },
  {
    value: "MEDICAL_SCI",
    label: "อุปกรณ์วิทยาศาสตร์และการแพทย์",
  },
  {
    value: "ADS",
    label: "งานโฆษณา",
  },
  {
    value: "MUSICAL",
    label: "งานเพลง",
  },
  {
    value: "CLOTHING",
    label: "เสื้อผ้า",
  },
  {
    value: "COMPUTER",
    label: "คอมพิวเตอร์",
  },
];

const departments = [
  {
    value: "SMO",
    label: "สโม",
  },
  {
    value: "MATHCOM",
    label: "คณิตศาสตรและวิทยาการคอม",
  },
  {
    value: "MARINE",
    label: "Marine",
  },
  {
    value: "CHEM",
    label: "เคมี",
  },
  {
    value: "CHEMTECH",
    label: "เคมีเทคนิค",
  },
  {
    value: "BIO",
    label: "ชีววิทยา",
  },
  {
    value: "BIOCHEM",
    label: "ชีวเคมี",
  },
  {
    value: "BSAC",
    label: "BSAC",
  },
  {
    value: "BBTECH",
    label: "BBTECH",
  },
  {
    value: "FOODTECH",
    label: "Food Tech",
  },
  {
    value: "MATSCI",
    label: "วัสดุศาสตร์",
  },
  {
    value: "PHYSICS",
    label: "ฟิสิกส์",
  },
  {
    value: "BOTGEN",
    label: "พฤษศาสตร์และพันธุกรรม",
  },
  {
    value: "MICROBIO",
    label: "Micro biology",
  },
  {
    value: "PHOTO",
    label: "Photo",
  },
  {
    value: "GEO",
    label: "ธรณีวิทยา",
  },
  {
    value: "ENVI",
    label: "สิ่งแวดล้อม",
  },
  {
    value: "NISIT_OFFICER",
    label: "กิจการนิสิต",
  },
];

export function CreateParcel() {
  const router = useRouter();
  const [image_url, setImageUrl] = useState("");
  const [close, setClose] = useState(false);
  const typeReducer = useSelector(typeSelector);
  const groupReducer = useSelector(groupSelector);
  const departmentReducer = useSelector(departmentSelector);
  const type = typeReducer.key;
  const department = departmentReducer.key;
  const group = groupReducer.key;
  const createPost = api.parcel.create.useMutation({
    onSuccess: () => {
      setClose(true);
      router.refresh();
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parcel_id: "",
      parcel_title: "",
      description: "",
      type: "",
      group: "",
      amount: "0",
      available: true,
      department: "",
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //me.modelvalue = reader.result;
      const result = reader.result?.toString() ?? "";
      console.log(result);
      setImageUrl(result.split("data:image/png;base64,")[1] ?? "");
    };
    reader.onerror = (error) => {
      console.error("Error:", error);
    };
  }

  async function onSubmit(data: FormSchemaType) {
    try {
      const response = await fetch(
        "https://smo-api.bunyawatapp37204.workers.dev/images/upload",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: image_url,
            width: 100,
            height: 100,
          }),
        },
      );
      const jsonData: unknown = await response.json();
      const _data = jsonData as UploadResponse;
      const img =
        "https://smo-api.bunyawatapp37204.workers.dev/images/" + _data.key;
      const _amount = data.amount;
      createPost.mutate({
        amount: parseInt(_amount),
        available: data.available,
        department: department,
        type: type,
        group: group,
        image_url: img,
        id: data.parcel_id,
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
                  type="text"
                  {...form.register("parcel_title")}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  รูปพัสดุ
                </Label>
                <Input
                  type="file"
                  {...form.register("image")}
                  className="col-span-3 hover:cursor-pointer"
                  onChange={(event) => getBase64(event.target)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  ประเภท
                </Label>
                <Types options={types} {...form.register("type")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  หมวดหมู่
                </Label>
                <Group options={groups} {...form.register("group")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  รายละเอียด
                </Label>
                <Textarea
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
                  type="text"
                  {...form.register("amount")}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="">
                  หน่วยงาน
                </Label>
                <Departments
                  options={departments}
                  {...form.register("department")}
                />
              </div>
              <div className="grid grid-cols-2 items-center justify-start gap-4">
                <Label htmlFor="desc" className="text-right">
                  ใช้งานได้
                </Label>
                <Input
                  type="checkbox"
                  {...form.register("available")}
                  className=" w-6"
                />
              </div>
            </div>

            {!close && (
              <Button type="submit">
                {" "}
                {createPost.isPending ? "กำลังสร้าง..." : "สร้างเลย!!!"}
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
