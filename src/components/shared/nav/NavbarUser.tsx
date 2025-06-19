"use client";

import { Home, Lock, LogOut, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { selectedOption } from "~/stores/slices/search";
import { useAppDispatch } from "~/stores/store";
import { useState } from "react";

export const NavbarUser = () => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      selectedOption({
        name: e.target.value,
      }),
    );
  };
  return (
    <div className="inline-flex h-24 w-full items-center justify-start gap-[38px] bg-yellow01 px-5 py-1.5">
      <div className="flex items-center">
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-8 w-8" />
        </button>
        <a
          href="/users/home"
          className="items-center justify-center p-4 hover:cursor-pointer"
        >
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={60}
            height={60}
          />
        </a>
      </div>

      <div className="hidden w-full font-noto-sans lg:flex">
        <Input
          className="rounded-full"
          placeholder="ค้นหาพัสดุ"
          onChange={handleInputChange}
        />
      </div>

      <div className="hidden items-center justify-start gap-4 lg:flex">
        <a href="/users/home" title="หน้าหลัก">
          <Home className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/users/cart" title="พัสดุที่จองไป">
          <ShoppingCart className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/admin/home" title="Admin only">
          <Lock className="h-8 w-8 hover:cursor-pointer" />
        </a>
        <a href="/api/logout" title="ออกจากระบบ">
          <LogOut className="h-8 w-8 hover:cursor-pointer" />
        </a>
      </div>

      {menuOpen && (
        <div className="absolute left-0 top-24 z-50 w-full bg-yellow01 p-5 lg:hidden">
          <div className="flex flex-col items-center gap-4">
            <Input
              className="w-full rounded-full"
              placeholder="ค้นหาพัสดุ"
              onChange={handleInputChange}
            />
            <a
              href="/users/home"
              title="หน้าหลัก"
              className="flex items-center gap-2 text-sm"
            >
              <Home className="w-15 h-8 hover:cursor-pointer" />
              <span>หน้าหลัก</span>
            </a>
            <a
              href="/users/cart"
              title="พัสดุที่จองไป"
              className="flex items-center gap-2 text-sm"
            >
              <ShoppingCart className="w-15 h-8 hover:cursor-pointer" />
              <span>พัสดุที่จองไป</span>
            </a>
            <a
              href="/admin/home"
              title="Admin only"
              className="flex items-center gap-2 text-sm"
            >
              <Lock className="w-15 h-8 hover:cursor-pointer" />
              <span>Admin</span>
            </a>
            <a
              href="/api/logout"
              title="ออกจากระบบ"
              className="flex items-center gap-2 text-sm"
            >
              <LogOut className="w-15 h-8 hover:cursor-pointer" />
              <span>ออกจากระบบ</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
