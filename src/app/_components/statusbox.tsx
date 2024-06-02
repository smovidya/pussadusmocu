import { Parcel_Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type ParcelList = Record<string, Parcel_Project[]>;

interface Props {
  parcelslist: ParcelList;
}

export const Statuesbox = ({ parcelslist }: Props) => {
  // console.log(parcelslist.project);

  const renderedCards = [];

  for (const projectId in parcelslist) {
    const parcels: Parcel_Project[] = parcelslist[projectId] ?? [];
    const status = parcels.length > 0 ? parcels[0]?.status : "";

    const card = (
      <Card
        className="h-auto w-full font-noto-sans hover:scale-105 hover:cursor-pointer"
        key={projectId}
      >
        <CardHeader>
          <CardTitle>{projectId}</CardTitle>
          <CardTitle>Status: {status}</CardTitle>
        </CardHeader>
        <CardContent>
          {parcels.map((parcel) => (
            <div className="" key={parcel.id}>
              <p>ระยะเวลายิม {parcel.startDate.toLocaleDateString()}</p>
              <p> {parcel.endDate.toLocaleDateString()}</p>
              <p className="font-noto-sans">x{parcel.amount}</p>
              {/* <p className="font-noto-sans">x{parcel.project.name}</p> */}
              <p>-----------------------------</p>
              {/* ใช้แบบนี้ไปก่อน */}
            </div>
          ))}
        </CardContent>
      </Card>
    );

    renderedCards.push(card);
  }

  return renderedCards.length > 0 ? renderedCards : null;
};
