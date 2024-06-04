"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Parcellist } from "~/utils/constant";
import Image from "next/image";
import { Button } from "~/components/ui/button"
interface Props {
  parcelslist: Parcellist;
}

export const Statuesbox = ({ parcelslist }: Props) => {
  const renderedCards = [];
  for (const projectId in parcelslist) {
    const parcels = parcelslist[projectId];
    if (parcels !== undefined) {
      const table = (
        <Table
          className="h-auto w-full font-noto-sans"
          key={projectId}
        >
          <TableHeader>

            <TableHead>
              <TableRow>
                <TableCell>{projectId}</TableCell>
                <TableCell>{parcels[0]?.project.owner}</TableCell>
              </TableRow>
            </TableHead>
            <TableHead className="text-right  ">{parcels[0]?.status}</TableHead>
          </TableHeader>
          <TableBody>
            {Array.isArray(parcels) &&
              parcels.map((parcel) => (
                <TableRow className="" key={parcel.project_id}>
                  <TableCell>
                    <div>
                      <Image src={parcel.parcel.image_url}
                        width={200}
                        height={200}
                        alt={parcel.parcel.image_url} />
                    </div>
                  </TableCell>
                  <TableCell className="grid grid-cols-2 ">
                    <div className=" h-36 grid grid-rows-5 w-52">
                      <div className="">
                        {parcel.parcel_id} | {parcel.parcel.title}
                      </div>
                      <div className="row-start-2 row-end-4">
                        {parcel.description}
                      </div>
                      <div className="row-start-5">
                        x{parcel.amount}
                      </div>
                    </div>

                    <div className="h-36 grid grid-rows-5 w-52 text-right ">
                      <div className="row-start-1">
                        <div className="flex justify-end">
                          <p className="pr-6">ระยะเวลายืม</p>
                          {parcel.startDate.toLocaleDateString()}
                        </div>

                      </div>
                      <div className="row-start-2 py-4">
                        {parcel.endDate.toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <div className="h-20 grid grid-rows-5">
                  <p className="row-start-1">วันสุดท้ายของการคืนพัสดุ <br /></p>
                  <p className="row-start-2"> 12/02/2547 <br /><br /></p>
                  <p className="row-start-5">กรุณาตรวจสอบเมื่อได้รับพัสดุแล้ว</p>
                </div>
              </TableCell>
              <TableCell colSpan={2} className="text-right" >
                <div className="h-20 grid grid-rows-5">
                  <div className="row-start-1"><a href="">Read more <br></br></a></div>
                  <div className="row-start-4"><Button>ได้รับพัสดุเรียบร้อยแล้ว</Button> </div>    
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
        <div key={table.key}>
          {table}
        </div>
      ))}
    </>
  ) : null;

};
