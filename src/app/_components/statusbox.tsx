"use client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Parcellist } from "~/utils/constant";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";

interface Props {
  parcelslist: Parcellist;
}

export const Statuesbox = ({ parcelslist }: Props) => {
  // console.log(parcelslist)
  const router = useRouter();
  const updateparcel = api.parcel_Project.updatestatus.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });
  async function Updatestatus(project_id: string) {
    console.log("StatusINUSE")
    updateparcel.mutate({
      project_id: project_id
    })
  }
  const renderedCards = [];
  for (const projectId in parcelslist) {
    const parcels = parcelslist[projectId];
    if (parcels !== undefined) {
      const table = (
        <Table className="font-noto-sans h-auto w-full bg-white" key={projectId}>

          <TableHeader>
            <TableRow>
              <TableCell className="text-right ">{projectId} | {parcels[0]?.project.owner}</TableCell>
              <TableCell className="text-right">{parcels[0]?.status}</TableCell>
            </TableRow>
          </TableHeader>


          <TableBody>
            {Array.isArray(parcels) &&
              parcels.map((parcel) => (
                <TableRow className="" key={parcel.project_id}>
                  <TableCell>
                    <div>
                      <Image
                        src={parcel.parcel.image_url}
                        width={200}
                        height={200}
                        alt={parcel.parcel.image_url}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="grid grid-cols-2 ">
                    <div className=" grid h-36 w-96 grid-rows-5 ">
                      <div className="">
                        {parcel.parcel_id} | {parcel.parcel.title}
                      </div>
                      <div className="row-start-2 row-end-4 text-gray-500">
                        {parcel.description}
                      </div>
                      <div className="row-start-5">x{parcel.amount}</div>
                    </div>

                    <div className="grid h-36  grid-rows-5 text-right text-gray-500">
                      <div className="row-start-1">
                        <div className="flex justify-end ">
                          <p className="pr-6 ">ระยะเวลายืม</p>
                          {parcel.startDate && format(new Date(parcel.startDate), 'dd/MM/yyyy')}
                        </div>
                      </div>
                      <div className="row-start-2 py-4">
                        {parcel.endDate && format(new Date(parcel.endDate), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>


          <TableFooter>
            <TableRow>
              <TableCell>
                <div className="grid h-20 grid-rows-5">
                  <p className="row-start-1 text-red-500">
                    วันสุดท้ายของการคืนพัสดุ <br />
                  </p>
                  <p className="row-start-2 py-1 text-red-500">
                    {" "}
                    12/02/2547 <br />
                    <br />
                  </p>
                  <p className="row-start-5 text-gray-500">
                    กรุณาตรวจสอบเมื่อได้รับพัสดุแล้ว
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="grid h-20 grid-rows-5">
                  <div className="row-start-1 text-yellow-300">
                    <a href="">
                      Read more <br></br>
                    </a>
                  </div>
                  <div className="row-start-4">
                    <Button className="bg-yellow-400" type="button" onClick={() => parcels[0]?.project_id && Updatestatus(parcels[0]?.project_id)}>ได้รับพัสดุเรียบร้อยแล้ว</Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>


        </Table>
      );

      renderedCards.push(table);
    }
  }

  return renderedCards.length > 0 ? (
    <>
      {renderedCards.map((table) => (
        <div key={table.key}>{table}</div>
      ))}
    </>
  ) : null;
};
