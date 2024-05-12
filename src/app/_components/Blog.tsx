import { type Parcel } from "@prisma/client";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

interface BlogProps {
  parcel: Parcel;
}

const Blog = ({ parcel }: BlogProps) => {
  return (
    <Card className="h-auto w-44 hover:scale-105 hover:cursor-pointer font-noto-sans">
      <CardHeader>
        <CardTitle>{parcel.title}</CardTitle>
        <CardDescription>{parcel.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {parcel.image_url && (
          <Image src={parcel.image_url} width={172} height={172} alt="Parcel Image" />
        )}
      </CardContent>
      <CardFooter>
        <p>Remain {parcel.amount}</p>
        <p>{parcel.available}</p>
      </CardFooter>
    </Card>
  );
};

export default Blog;
