import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charting Dashboard",
  description: "Coin Data for Upbit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${inter.className} h-screen flex flex-col gap-[2px]`}>
        <nav className="h-12 bg-white flex flex-row justify-center items-center">
          <Link
            className={`w-full h-12 bg-white/10 flex justify-center items-center  hover:bg-gray-100/90`}
            href="/dashboard/KRW-BTC"
            prefetch={true}>
            Dashboard
          </Link>
        </nav>
        <div className=" flex-grow overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
