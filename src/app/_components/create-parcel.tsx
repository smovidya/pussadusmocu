"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "~/components/ui/textarea";
import { ComboboxDemo } from "./combobox";
import { useAppContext } from "~/context";

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
    }),
  description: z.string(),
  type: z.string(),
  group: z.string(),
  amount: z.number().positive(),
  available: z.boolean(),
  department: z.string(),
});

const types = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const group = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function CreateParcel() {
  const [image_url, setImageUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parcel_id: "",
      parcel_title: "",
      description: "",
      type: "",
      group: "",
      amount: 1,
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
      const result = reader.result?.toString() || "";
      setImageUrl(result.split("data:image/png;base64,")[1] || "");
    };
    reader.onerror = (error) => {
      console.error("Error:", error);
    };
  }

  function onSubmit(data: any) {
    console.log(data);
    //console.log(image_url);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">สร้างพัสดุใหม่</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[700px] font-noto-sans sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>กรอกข้อมูลพัสดุใหม่</DialogTitle>
            <DialogDescription>กรุณาใส่ข้อมูลให้ครบถ้วน.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
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
                <Label htmlFor="desc" className="text-right">
                  ประเภท
                </Label>
                <ComboboxDemo options={types} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  หมวดหมู่
                </Label>
                <ComboboxDemo options={group} {...form.register("group")} />
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
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  จำนวน
                </Label>
                <Input
                  type="number"
                  {...form.register("amount")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  ใช้งานได้
                </Label>
                <Input
                  type="checkbox"
                  {...form.register("available")}
                  className="col-span-3 w-6"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  หน่วยงาน
                </Label>
                <ComboboxDemo options={group} {...form.register("department")} />
              </div>
          </div>
          <DialogFooter>
            <Button type="submit">สร้างเลย !!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
