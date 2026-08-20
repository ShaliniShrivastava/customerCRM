"use client";

import Link from "next/link";
import { useGetProfileQuery } from "../../store/api";

export default function UserNavbar() {
  const { data } = useGetProfileQuery();
  const user = data?.data;

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/95 px-4 py-3 text-white backdrop-blur sm:px-6 sm:py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/user"
          className="text-lg font-bold text-yellow-400 transition hover:scale-105 sm:text-xl"
        >
          CustomerCRM
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.name || "User"}</p>

            <p className="text-xs text-gray-400">{user?.email || ""}</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black transition hover:scale-110 sm:h-10 sm:w-10">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
