import type { Parcel } from "@prisma/client";
import Image from "next/image";
import Blog from "~/app/_components/Blog";
import { CreateParcel } from "~/app/_components/create-parcel";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/server";

const Home = async () => {
  const mockParcels: Parcel[] = await api.parcel.getAll();
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="inline-flex h-24 w-full items-center justify-start gap-[38px] bg-yellow01 px-5 py-1.5">
        <div className="flex h-[88px] w-[88px]">
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={108}
            height={108}
          />
        </div>
        <div className="flex w-full font-noto-sans">
          <Input className="rounded-full" placeholder="ค้นหาพัสดุ" />
        </div>
        <div className="flex items-center justify-start gap-4">
          <div className="flex h-11 w-11 items-center justify-start rounded-3xl bg-yellow-500 p-2">
            <div className="relative h-7 w-7">
              <div className="absolute left-0 top-0 h-7 w-7 bg-zinc-300"></div>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2.5 rounded-3xl bg-yellow-500 p-2.5">
            <div className="relative h-6 w-6">
              <div className="absolute left-0 top-0 h-6 w-6 bg-zinc-300"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-6">
        <div className="grid grid-cols-5 gap-2">
          {mockParcels.map((parcel) => (
            <Blog key={parcel.parcel_id} parcel={parcel} />
          ))}
        </div>
        <div className="item-end flex w-24 flex-col gap-1 font-noto-sans">
          <CreateParcel />
        </div>
      </div>
    </div>
  );
};

export default Home;
