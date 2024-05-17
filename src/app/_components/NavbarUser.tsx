import { Home, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { Input } from "~/components/ui/input";

export const NavbarUser = () => {
  return (
    <div className="grid h-24 w-full grid-cols-3 items-center justify-start gap-[38px] bg-yellow01 px-5 py-1.5">
      <div className="flex w-auto flex-row items-center font-noto-sans">
        <Image
          src={"/picture/yellowBox.svg"}
          alt="iconBox"
          width={88}
          height={88}
        />
        <Input
          className="w-80 justify-center rounded-full"
          placeholder="ค้นหาพัสดุ"
        />
      </div>
      <div className="grid w-full grid-cols-3 font-noto-sans">
        <a href="/users/home">
          <Home className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/users/profile">
          <User className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/users/cart">
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>
      <div className="flex items-center justify-end gap-4">
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
