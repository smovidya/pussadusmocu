"use client";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Parcellist } from "~/lib/constant";

interface Props {
  parcelslist: Parcellist;
  student_id: string;
}

export const Statuesbox = ({ parcelslist, student_id }: Props) => {
  const [expandedProjectIds, setExpandedProjectIds] = useState<string[]>([]);

  const renderedCards = [];

  for (const projectId in parcelslist) {
    const parcels = parcelslist[projectId];

    if (parcels !== undefined) {
      const isExpanded = expandedProjectIds.includes(projectId);

      const shownParcels = isExpanded ? parcels : parcels.slice(0, 3);

      const table = (
        <Table
          className="item-center mx-auto h-auto w-full min-w-[200px] max-w-[85%] bg-white font-noto-sans sm:w-[200px] sm:max-w-[1100px] md:w-[700px] lg:w-[1100px]"
          key={projectId}
        >
          <TableHeader>
            <TableRow>
              <TableCell className="text-left">
                {projectId} | {parcels[0]?.project.title}
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(shownParcels) &&
              shownParcels.map((parcel) => (
                <TableRow key={parcel.project_id}>
                  <TableCell>
                    <div>
                      <Image
                        src={parcel.parcel.image_url}
                        width={300}
                        height={300}
                        alt={parcel.parcel.image_url}
                        className="flex items-center justify-center"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    <div className="h-30 grid grid-rows-4 text-left">
                      <div>
                        {parcel.parcel_id} | {parcel.parcel.title}
                      </div>
                      <div className="row-start-2 row-end-4 text-gray-500">
                        {parcel.description}
                      </div>
                      <div className="row-start-5">x{parcel.amount}</div>
                    </div>

                    <div className="h-30 grid grid-rows-4 text-right text-gray-500">
                      <div className="row-start-1">
                        <div className="flex justify-end">
                          <p className="pr-6">ระยะเวลายืม</p>
                          {parcel.startDate &&
                            format(new Date(parcel.startDate), "dd/MM/yyyy")}
                        </div>
                      </div>
                      <div className="row-start-2 py-4">
                        {parcel.endDate &&
                          format(new Date(parcel.endDate), "dd/MM/yyyy")}
                      </div>
                    </div>
                    <div
                      className={`text-base font-bold ${parcel.status === "BORROWING"
                          ? "text-blue-700"
                          : parcel.status === "REJECT"
                            ? "text-red-700"
                            : parcel.status === "PENDING"
                              ? "text-yellow02"
                              : "text-green-700"
                        }`}
                    >
                      {parcel.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>
                <div className="h-21 grid grid-rows-3">
                  <p className="row-start-1 text-sm text-red-500">
                    วันสุดท้ายของการคืนพัสดุ <br />
                  </p>
                  <p className="row-start-2 py-1 text-sm text-red-500">
                    {parcels[0]?.endDate.toISOString()} <br />
                    <br />
                  </p>
                  <p className="row-start-3 text-sm text-gray-500">
                    กรุณาตรวจสอบเมื่อได้รับพัสดุแล้ว
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="grid h-20 grid-rows-5">
                  <div className="row-start-1 text-yellow-300">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedProjectIds((prev) =>
                          prev.includes(projectId)
                            ? prev.filter((id) => id !== projectId)
                            : [...prev, projectId],
                        );
                      }}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                      <br />
                    </a>
                  </div>
                  <div className="row-start-3"></div>
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
