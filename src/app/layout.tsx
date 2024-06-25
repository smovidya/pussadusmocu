import "~/styles/globals.css";

import { Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import ReduxProvider from "./ReduxProvider";

const inter = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ระบบพัสดุ",
  description:
    "ระบบพัสดุจัดทำโดย ฝ่ายพัฒนาระบบสารสนเทศ สโมสรนิสิตคณะวิทยาศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-100 font-noto-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
