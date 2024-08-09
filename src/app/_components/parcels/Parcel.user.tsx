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
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  FormSchemaBooking,
  type FormSchemaBookingType,
} from "~/utils/constant";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "../shared/Datepicker";
import { useSelector } from "react-redux";
import { datepickerSelector } from "~/stores/slices/datepicker";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface BlogProps {
  parcel: Parcel;
  project_id: string;
  student_id: string;
}

const ParcelUser = ({ parcel, project_id, student_id }: BlogProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [close, setClose] = useState(false);
  const bookedParcel = api.parcel.booking.useMutation({
    onSuccess: () => {
      setClose(true);
      toast({
        title: "แจ้งเตือน",
        variant: "default",
        description: "ยืมพัสดุสำเร็จ",
        className: "font-noto-sans",
        action: <ToastAction altText="close button">close</ToastAction>,
      });
      router.refresh();
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });

  const form = useForm<FormSchemaBookingType>({
    resolver: zodResolver(FormSchemaBooking),
    defaultValues: {
      project_id: project_id,
      description: "",
      amount: 1,
    },
  });

  const datepickerReducer = useSelector(datepickerSelector);
  const _date = datepickerReducer.date;

  async function onSubmit(data: FormSchemaBookingType) {
    bookedParcel.mutate({
      student_id: student_id,
      amount: data.amount,
      parcel_id: parcel.parcel_id,
      description: data.description,
      startDate: _date?.from ?? new Date(),
      endDate: _date?.to ?? new Date(),
      project_id: data.project_id,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-50 h-auto font-noto-sans hover:scale-105 hover:cursor-pointer">
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
                loading="eager"
              />
            )}
            <div className="mt-3 flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full ${
                  parcel.amount > 10
                    ? "bg-green-500"
                    : parcel.amount > 2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              ></div>
              <p className="text-base">
                {parcel.amount} {parcel.unit}
              </p>
            </div>
            <p className="text-sm">{parcel.available}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full min-w-[300px] max-w-[85%] font-noto-sans sm:w-[200px] sm:max-w-[700px] md:w-[500px] lg:w-[700px]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src={parcel.image_url}
                width={300}
                height={300}
                alt={parcel.parcel_id}
                loading="eager"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="parcel_id" className="text-right">
                  เลขไอดี
                </Label>
                <Input
                  disabled
                  type="text"
                  value={parcel.parcel_id}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parcel_title" className="text-right">
                  ชื่อพัสดุ
                </Label>
                <Input disabled value={parcel.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right">
                  รายละเอียด
                </Label>
                <Textarea
                  {...form.register("description")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  จำนวน
                </Label>
                <Input
                  type="number"
                  {...form.register("amount")}
                  className="col-span-3"
                  max={parcel.amount}
                  min={0}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  project id
                </Label>
                <Input
                  type="text"
                  disabled
                  value={project_id}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="datepicker" className="text-right">
                  วันยืม
                </Label>
                <DatePickerWithRange />
              </div>
              {!close && (
                <Button
                  type="submit"
                  className="bg-black text-white"
                  disabled={bookedParcel.isPending}
                >
                  {bookedParcel.isPending ? "กำลังยืม..." : "ยืมเลย!!!"}
                </Button>
              )}
            </div>
          </div>
        </form>
        {close && (
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => setClose(false)}
            >
              ปิด
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelUser;
