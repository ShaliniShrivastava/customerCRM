"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-yellow-500/20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="w-full animate-[fadeIn_0.6s_ease-out] md:w-1/3">
            <Link
              href="/"
              className="inline-block text-2xl font-bold text-yellow-400 transition duration-300 hover:scale-105"
            >
              CustomerCRM
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              A simple and efficient customer relationship management platform
              for managing leads, customers and business interactions in one
              place.
            </p>
          </div>

          {/* CRM Features */}
          <div className="w-full animate-[fadeIn_1s_ease-out] md:w-1/4">
            <h3 className="mb-4 font-semibold text-yellow-400">CRM Features</h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li className="transition hover:text-yellow-400">
                Lead Management
              </li>
              <li className="transition hover:text-yellow-400">
                Customer Management
              </li>
              <li className="transition hover:text-yellow-400">
                AI Lead Analysis
              </li>
              <li className="transition hover:text-yellow-400">
                CSV Lead Import
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full animate-[fadeIn_1.2s_ease-out] md:w-1/4">
            <h3 className="mb-4 font-semibold text-yellow-400">Contact</h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>Customer Support</p>
              <p>support@customercrm.com</p>
              <p>Available for business assistance</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-yellow-500/10 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400">CustomerCRM</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
