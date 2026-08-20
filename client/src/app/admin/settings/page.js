"use client";

import { useState } from "react";
import {
  useGetProfileQuery,
  useChangePasswordMutation,
} from "../../../store/api";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

export default function AdminSettings() {
  const { data, isLoading } = useGetProfileQuery();

  const [changePassword] = useChangePasswordMutation();

  const user = data?.data;

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminNavbar />

          <div className="min-h-screen bg-black p-8 pt-28 text-center text-purple-300">
            Loading settings...
          </div>
        </div>
      </div>
    );
  }

  const handlePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await changePassword(password).unwrap();

      setPassword({
        currentPassword: "",
        newPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="admin-page flex min-h-screen bg-black">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminNavbar />

        <main className="min-h-screen bg-black px-4 pb-8 pt-24 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-bold text-purple-300">Settings</h1>

              <p className="mt-2 text-white/40">
                Manage your profile and account security.
              </p>
            </div>

            {/* MESSAGE */}
            {(message || error) && (
              <div
                className={`rounded-lg p-4 text-sm ${
                  message
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {message || error}
              </div>
            )}

            {/* PROFILE INFORMATION */}
            <div className="rounded-2xl border border-purple-500/20 bg-zinc-950 p-6">
              <h2 className="mb-5 text-xl font-semibold text-purple-300">
                Profile Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Name
                  </label>

                  <input
                    value={user?.name || ""}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-black/60 px-4 py-3 text-white/60 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Email
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-black/60 px-4 py-3 text-white/60 outline-none"
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-white/30">
                Name and email cannot be changed.
              </p>
            </div>

            {/* CHANGE PASSWORD */}
            <form
              onSubmit={handlePassword}
              className="rounded-2xl border border-purple-500/20 bg-zinc-950 p-6 transition-all duration-300 hover:border-purple-500/40"
            >
              <h2 className="mb-5 text-xl font-semibold text-purple-300">
                Change Password
              </h2>

              <div className="space-y-4">
                <input
                  type="password"
                  required
                  placeholder="Current Password"
                  value={password.currentPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
                />

                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="New Password"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                className="mt-5 rounded-lg bg-purple-400 px-5 py-3 font-semibold text-black transition hover:bg-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                Change Password
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
