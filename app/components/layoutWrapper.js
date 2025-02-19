"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children, session }) {
  const pathname = usePathname();

  // Define the dynamic route pattern to exclude Navbar and Footer
  const shouldHideLayout = /^\/enrollments\/[^/]+\/[^/]+$/.test(pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar session={session} />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
