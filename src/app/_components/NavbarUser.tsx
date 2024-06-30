"use client";

import { Home, Lock, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { selectedOption } from "~/stores/slices/search";
import { useAppDispatch } from "~/stores/store";

export const NavbarUser = () => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      selectedOption({
        name: e.target.value,
      }),
    );
  };
  return (
    <div className="grid h-24 w-full grid-cols-3 items-center justify-start gap-[38px] bg-yellow01 px-5 py-1.5">
      <div className="flex w-auto flex-row items-center font-noto-sans">
        <a href="/users/home">
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={88}
            height={88}
          />
        </a>
        <Input
          className="w-80 justify-center rounded-full"
          placeholder="ค้นหาพัสดุ"
          onChange={handleInputChange}
        />
      </div>
      <div className="grid w-full grid-cols-3 justify-items-center font-noto-sans">
        <a href="/users/home" title="Home">
          <Home className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/users/cart" title="Cart">
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>
      <div className="flex items-center justify-end gap-4">
        <a href="/admin/home" title="Admin Home">
          <Lock className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>
    </div>
  );
};
