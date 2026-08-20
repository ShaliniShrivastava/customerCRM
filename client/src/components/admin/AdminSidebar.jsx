"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/api";
import { clearUser } from "../../store/authSlice";

export default function AdminSidebar() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearUser());
      router.replace("/login");
    }
  };

  return (
    <aside className="admin-sidebar relative flex min-h-screen w-56 flex-col overflow-hidden bg-black p-4 text-white sm:w-64 sm:p-6">
      <h2 className="relative z-10 mb-8 text-xl font-bold text-purple-300 sm:mb-10 sm:text-2xl">
        CustomerCRM
      </h2>

      <nav className="relative z-10 flex flex-1 flex-col gap-2">
        <Link
          href="/admin"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/leads"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Leads
        </Link>

        <Link
          href="/admin/users"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Users
        </Link>

        <Link
          href="/admin/import"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Import Leads
        </Link>

        <Link
          href="/admin/contacts"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Contact Messages
        </Link>

        <Link
          href="/admin/manageFeatures"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Manage Features
        </Link>

        <Link
          href="/admin/settings"
          className="rounded-lg px-3 py-3 text-sm transition hover:bg-purple-300 hover:text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] sm:px-4 sm:text-base"
        >
          Settings
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="relative z-10 rounded-lg bg-purple-300 px-3 py-3 text-sm font-semibold text-black transition hover:bg-purple-200 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] sm:px-4 sm:text-base"
      >
        Logout
      </button>
    </aside>
  );
}
