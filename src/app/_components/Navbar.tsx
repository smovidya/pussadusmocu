import { Input } from "~/components/ui/input";
import Image from "next/image";
import { Home, ShoppingCart } from "lucide-react";

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
        <a href="/admin/home">
          <Home className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/admin/status">
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>
    </div>
  );
};
