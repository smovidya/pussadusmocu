import React from "react";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { Home, Lock, ShoppingCart } from "lucide-react";
import { selectedOption } from "~/stores/slices/search";
import { useAppDispatch } from "~/stores/store";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      selectedOption({
        name: e.target.value,
      }),
    );
  };

  return (
    <div className="bg-yellow01 inline-flex h-24 w-full items-center justify-start gap-4 px-5 py-1.5">
      <Link
        href="/users/home"
        className="flex h-16 items-center justify-center hover:cursor-pointer"
      >
        <Image
          src={"/picture/yellowBox.svg"}
          alt="iconBox"
          width={108}
          height={108}
        />
      </Link>
      <div className="font-noto-sans flex w-full">
        <Input
          className="rounded-full"
          placeholder="ค้นหาพัสดุ"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex items-center justify-start gap-1">
        <Button asChild variant="ghost" className="rounded-lg py-7 text-lg hover:bg-black/5 gap-4 items-center">
          <Link href="/admin/home">
            <Lock className="mb-0.5" />
            แอดมิน
          </Link>
        </Button>

        <Button asChild variant="ghost" className="rounded-lg py-7 text-lg hover:bg-black/5 gap-4 items-center">
          <Link href="/admin/status">
            <ShoppingCart className="mb-0.5" />
            การยืม
          </Link>
        </Button>
      </div>
    </div>
  );
};
