import { Input } from "~/components/ui/input";
import Image from "next/image";

export const Navbar = () => {
  return (
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
  );
};
