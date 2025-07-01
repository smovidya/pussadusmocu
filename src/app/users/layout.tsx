import type { ReactNode } from "react";
import { NavbarUser } from "~/components/shared/nav/NavbarUser";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <NavbarUser />
      {children}
    </div>
  );
}
