"use client";

import { Home, Lock, LogOut, ShoppingCart } from "lucide-react";
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
    <div className="inline-flex h-24 w-full items-center justify-start gap-[38px] bg-yellow01 px-5 py-1.5">
      <div className="flex h-[88px] w-[88px]">
        <a
          href="/users/home"
          className="items-center justify-center hover:cursor-pointer mt-3"
        >
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={108}
            height={108}
          />
        </a>
      </div>
      <div className="flex w-full font-noto-sans">
        <Input
          className="rounded-full"
          placeholder="ค้นหาพัสดุ"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <a href="/users/home" title="หน้าหลัก">
          <Home className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/users/cart" title="พัสดุที่จองไป">
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/admin/home" title="Admin only">
          <Lock className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/api/auth/logout" title="ออกจากระบบ">
          <LogOut className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>
    </div>
  );
};
