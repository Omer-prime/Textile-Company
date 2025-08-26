"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HIDE_ON = [
  /^\/admin(\/|$)/,   // admin area
  /^\/gate$/,         // site gate
];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_ON.some((re) => re.test(pathname || ""));

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
