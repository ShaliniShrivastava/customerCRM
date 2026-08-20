"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { useLogoutMutation } from "../store/api";

const links = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    setDropdown(false);
  }, [pathname]);
  const user = useSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearUser());
      setDropdown(false);
      router.push("/");
    }
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-yellow-500/20 bg-black/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-5">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-start text-xl font-bold text-yellow-400 transition hover:scale-105 sm:text-2xl"
          >
            CustomerCRM
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center justify-self-end sm:flex">
            {user && user.role !== "admin" ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_15px_rgba(250,204,21,0.25)]"
                >
                  {user.name || "User"} ▾
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-yellow-500/30 bg-zinc-950 p-2 shadow-xl">
                    <Link
                      href="/user/account"
                      onClick={() => setDropdown(false)}
                      className="block rounded-md px-4 py-3 text-sm text-white hover:bg-yellow-400 hover:text-black"
                    >
                      My Account
                    </Link>

                    <Link
                      href="/user/requirement"
                      onClick={() => setDropdown(false)}
                      className="block rounded-md px-4 py-3 text-sm text-white hover:bg-yellow-400 hover:text-black"
                    >
                      My Requirements
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-md px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm text-white hover:text-yellow-400"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="justify-self-end text-2xl text-yellow-400 md:hidden"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <div className="border-t border-yellow-500/10 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-white hover:bg-yellow-400/10 hover:text-yellow-400"
                >
                  {link.name}
                </Link>
              ))}

              {user && user.role !== "admin" ? (
                <>
                  <Link
                    href="/user/account"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-white hover:bg-yellow-400/10"
                  >
                    My Account
                  </Link>

                  <Link
                    href="/user/requirement"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-white hover:bg-yellow-400/10"
                  >
                    My Requirements
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-3 text-left text-sm text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 rounded-lg border border-yellow-400 px-4 py-2 text-center text-yellow-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-lg bg-yellow-400 px-4 py-2 text-center font-semibold text-black"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
