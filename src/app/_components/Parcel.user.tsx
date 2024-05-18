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
  FormSchemaBooking,
  type FormSchemaBookingType,
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
import { DatePickerWithRange } from "./Datepicker";
import { useSelector } from "react-redux";
import { datepickerSelector } from "~/stores/slices/datepicker";

interface BlogProps {
  parcel: Parcel;
}

const ParcelUser = ({ parcel }: BlogProps) => {
  const form = useForm<FormSchemaBookingType>({
    resolver: zodResolver(FormSchemaBooking),
    defaultValues: {
      parcel_id: parcel.parcel_id,
      description: "",
      amount: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const datepickerReducer = useSelector(datepickerSelector);
  const _date = datepickerReducer.date;

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
          //   onSubmit={form.handleSubmit()}
          className="flex w-full space-y-6"
        >
          <div className="grid w-full grid-cols-2">
            <Image
              src={parcel.image_url}
              width={300}
              height={300}
              alt={parcel.parcel_id}
            />
            <div className="flex flex-col gap-2">
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
                <Label htmlFor="id" className="text-right">
                  ชื่อพัสดุ
                </Label>
                <Input
                  disabled
                  value={parcel.title}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="id" className="text-right">
                  รายละเอียด
                </Label>
                <Textarea
                  {...form.register("description")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  จำนวน
                </Label>
                <Input
                  type="number"
                  {...form.register("amount")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  วันยืม
                </Label>
                <DatePickerWithRange/>
              </div>
              <Button type="submit">
                ยืม
              </Button>
            </div>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelUser;
