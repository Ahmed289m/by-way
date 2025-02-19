import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "./_lib/auth";
import LayoutWrapper from "./components/layoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Material",
  description: "FCIS Materials",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper session={session}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
