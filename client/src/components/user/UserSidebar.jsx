"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/user" },
  { name: "Profile", href: "/user/profile" },
  { name: "Settings", href: "/user/settings" },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-yellow-500/20 bg-black text-white md:block">
      <div className="sticky top-0 p-5">
        <h2 className="mb-6 text-lg font-bold text-yellow-400">User Panel</h2>

        <nav className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 ${
                  active
                    ? "bg-yellow-400 font-semibold text-black shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                    : "text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
