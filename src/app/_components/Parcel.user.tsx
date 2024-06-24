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
  FormSchemaBooking,
  type FormSchemaBookingType,
} from "~/utils/constant";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "./Datepicker";
import { useSelector } from "react-redux";
import { datepickerSelector } from "~/stores/slices/datepicker";

interface BlogProps {
  parcel: Parcel;
  project_id: string;
}

const ParcelUser = ({ parcel, project_id }: BlogProps) => {
  const router = useRouter();
  const bookedParcel = api.parcel.booking.useMutation({
    onSuccess: () => {
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
    console.log("Work");
    bookedParcel.mutate({
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
                loading="eager"
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
          <div className="grid w-full grid-cols-2">
            <Image
              src={parcel.image_url}
              width={300}
              height={300}
              alt={parcel.parcel_id}
              loading="eager"
            />
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
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
              <Button
                type="submit"
                className="bg-black text-white"
                disabled={bookedParcel.isPending}
              >
                {bookedParcel.isPending ? "กำลังยืม..." : "ยืมเลย!!!"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelUser;
