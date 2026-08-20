"use client";

import { useSelector } from "react-redux";

export default function AdminNavbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="admin-navbar fixed left-0 right-0 top-0 z-[100] flex h-20 items-center justify-between border-b border-purple-400/30 bg-black px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 pl-2 sm:pl-4 lg:pl-6">
        <h1 className="text-lg font-semibold text-purple-300 sm:text-xl">
          Admin Dashboard
        </h1>

        <p className="hidden pl-5 text-sm text-white/60 sm:block">
          Manage your CRM
        </p>
      </div>

      <div className="relative z-10 pr-2 sm:pr-4 lg:pr-6">
        <div className="admin-name-box relative overflow-hidden rounded-lg border border-purple-300 bg-purple-500 px-5 py-2 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
          <div className="admin-name-shine" />

          <p className="relative z-10 text-sm font-semibold text-white sm:text-base">
            {user?.name || "Admin"}
          </p>
        </div>
      </div>
    </header>
  );
}
