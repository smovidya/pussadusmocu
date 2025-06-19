import { ReactNode } from "react";
import { NavbarUser } from "~/components/shared/nav/NavbarUser";

export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full w-full flex-col gap-6 bg-slate-100 text-gray-900">
      <NavbarUser />
      {children}
    </div>
  );
}
