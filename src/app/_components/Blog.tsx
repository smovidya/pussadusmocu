"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Parcel } from "@prisma/client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  departments,
  FormSchema,
  type FormSchemaType,
  groups,
  types,
  type UploadResponse,
} from "~/utils/constant";
import { Types } from "./combobox/type";
import { Group } from "./combobox/group";
import { Textarea } from "~/components/ui/textarea";
import { Departments } from "./combobox/department";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface BlogProps {
  parcel: Parcel;
}

const Blog = ({ parcel }: BlogProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parcel_id: parcel.parcel_id,
      parcel_title: parcel.title,
      description: parcel.description ?? "",
      type: parcel.type,
      group: parcel.group,
      amount: parcel.amount,
      available: parcel.available,
      department: parcel.department ?? "SMO",
      image: undefined,
    },
  });
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [image_url, setImageUrl] = useState<string | undefined>();
  const { toast } = useToast();

  const editParcel = api.parcel.edit.useMutation({
    onSuccess: () => {
      setDisabled(false);
      toast({
        title: "Alert",
        description: "แก้ไขพัสดุสำเร็จ",
        className: "font-noto-sans",
        action: <ToastAction altText="close button">close</ToastAction>,
      });
      router.refresh();
    },
  });

  const deleteParcel = api.parcel.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Alert",
        variant: "destructive",
        description: "ลบพัสดุสำเร็จ",
        className: "font-noto-sans",
        action: <ToastAction altText="close button">close</ToastAction>,
      });
      router.refresh();
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
      setImageUrl(result.split("data:image/png;base64,")[1] ?? "");
    };
    reader.onerror = (error) => {
      console.error("Error:", error);
    };
  }

  async function onSubmit(data: FormSchemaType) {
    setDisabled(true);
    try {
      let imageUrl;
      if (image_url) {
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
        const jsonData: UploadResponse =
          (await response.json()) as UploadResponse;
        imageUrl = `https://smo-api.bunyawatapp37204.workers.dev/images/${jsonData.key}`;
      } else {
        imageUrl = parcel.image_url; // Use the existing image URL if no new image is uploaded
      }

      editParcel.mutate({
        name: data.parcel_title,
        amount: data.amount,
        available: data.available,
        department: data.department,
        description: data.description,
        group: data.group,
        image_url: imageUrl,
        type: data.type,
        id: parcel.parcel_id,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function onDelete() {
    deleteParcel.mutate({
      parcel_id: parcel.parcel_id,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-auto w-44 font-noto-sans hover:scale-105 hover:cursor-pointer">
          <CardHeader>
            <CardTitle>{parcel.title}</CardTitle>
            <CardDescription>{parcel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {parcel.image_url && (
              <Image
                src={parcel.image_url}
                width={172}
                height={172}
                alt="Parcel Image"
              />
            )}
          </CardContent>
          <CardFooter>
            <p>Remain {parcel.amount}</p>
            <p>{parcel.available}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] font-noto-sans sm:max-w-[425px]">
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
                  disabled
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
            <div className="grid grid-cols-2 gap-4">
              <Button type="submit" disabled={disabled}>
                {" "}
                {editParcel.isPending ? "กำลังสร้าง..." : "แก้ไข"}
              </Button>
              <Button type="button" variant="destructive" onClick={onDelete}>
                ลบ
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Blog;
