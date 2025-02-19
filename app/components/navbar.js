"use client";
import { GraduationCap, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="flex-shrink-0 flex items-center" href="/">
              <GraduationCap className="h-8 w-8 text-blue-600 transition-colors duration-200" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Material
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-200 ${
                  pathname === "/"
                    ? "text-blue-600 border-blue-500"
                    : "text-gray-500 hover:text-gray-900 hover:border-gray-300 border-transparent"
                }`}
              >
                Home
              </Link>

              {session?.user && (
                <Link
                  href="/enrollments"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-200 ${
                    pathname === "/enrollments"
                      ? "text-blue-600 border-blue-500"
                      : "text-gray-500 hover:text-gray-900 hover:border-gray-300 border-transparent"
                  }`}
                >
                  My Courses
                </Link>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {session?.user?.image ? (
              <>
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-10 mr-5 rounded-full border-2 border-blue-500 shadow-md transition-transform duration-200 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <Link href="/api/auth/signout" className="text-blue-500">
                  <LogOut />
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
              >
                Get started
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transform rotate-0 transition-transform duration-200" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`z-20 absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
              pathname === "/"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Home
          </Link>

          {session?.user && (
            <Link
              href="/enrollments"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                pathname === "/enrollments"
                  ? "border-blue-500 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              My Courses
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 mt-3">
            {session?.user?.image ? (
              <div className="flex items-center gap-10">
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-14 w-14 rounded-full border-2 border-blue-500 shadow-md transition-transform duration-200 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <Link href="/api/auth/signout" className="text-blue-500">
                  <LogOut />
                </Link>
              </div>
            ) : (
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105">
                Get started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
