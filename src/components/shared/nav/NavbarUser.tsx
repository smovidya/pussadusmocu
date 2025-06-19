"use client";

import { Home, Lock, LogOut, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { selectedOption } from "~/stores/slices/search";
import { useAppDispatch } from "~/stores/store";

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
    <div className="bg-yellow01 inline-flex h-24 w-full items-center justify-start gap-4 px-5 py-1.5">
      <div className="flex h-full items-center">
        <Button
          className="size-fit p-3 hover:bg-black/5 lg:hidden"
          size="icon"
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="size-8" />
        </Button>
        <Link
          href="/users/home"
          className="flex size-16 items-center justify-center hover:cursor-pointer"
        >
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={108}
            height={108}
          />
        </Link>
      </div>

      <div className="font-noto-sans flex w-full">
        <Input
          className="rounded-full"
          placeholder="ค้นหาพัสดุ"
          onChange={handleInputChange}
        />
      </div>

      <div className="hidden items-center justify-start gap-1 lg:flex">
        <Button
          asChild
          variant="ghost"
          className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
        >
          <Link href="/users/home">
            <Home className="mb-0.5" />
            หน้าหลัก
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
        >
          <Link href="/users/cart">
            <ShoppingCart className="mb-0.5" />
            พัสดุที่จองไป
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
        >
          <Link href="/admin/home">
            <Lock className="mb-0.5" />
            แอดมิน
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
        >
          <Link href="/api/logout">
            <LogOut className="mb-0.5" />
            ออกจากระบบ
          </Link>
        </Button>
      </div>

      {/* TODO: move this to bottom menu */}
      {menuOpen && (
        <div className="bg-yellow01 absolute top-24 left-0 z-50 w-full p-4 lg:hidden">
          <div className="grid">
            <Button
              asChild
              variant="ghost"
              className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
            >
              <Link onClick={() => setMenuOpen(false)} href="/users/home">
                <Home className="mb-0.5" />
                หน้าหลัก
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
            >
              <Link onClick={() => setMenuOpen(false)} href="/users/cart">
                <ShoppingCart className="mb-0.5" />
                พัสดุที่จองไป
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
            >
              <Link onClick={() => setMenuOpen(false)} href="/admin/home">
                <Lock className="mb-0.5" />
                แอดมิน
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="items-center gap-4 rounded-lg py-7 hover:bg-black/5"
            >
              <Link onClick={() => setMenuOpen(false)} href="/api/logout">
                <LogOut className="mb-0.5" />
                ออกจากระบบ
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
