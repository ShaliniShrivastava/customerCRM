"use client";

import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../../../store/api";

export default function Account() {
  const { data, isLoading } = useGetProfileQuery();

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [changePassword, { isLoading: changing }] = useChangePasswordMutation();

  const user = data?.data;

  const [name, setName] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({ name }).unwrap();
      alert("Profile updated successfully.");
    } catch (error) {
      alert(error?.data?.message || "Failed to update profile.");
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      await changePassword(passwords).unwrap();

      setPasswords({
        currentPassword: "",
        newPassword: "",
      });

      alert("Password changed successfully.");
    } catch (error) {
      alert(error?.data?.message || "Failed to change password.");
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        Loading account...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
          My Account
        </h1>

        {/* Profile */}
        <section className="mt-8 rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-yellow-400">
            Account Information
          </h2>

          <form onSubmit={handleProfile} className="mt-5 space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <input
              value={user?.email || ""}
              readOnly
              aria-readonly="true"
              className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-500 outline-none"
            />

            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </section>

        {/* Change Password */}
        <section className="mt-6 rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-yellow-400">
            Change Password
          </h2>

          <form onSubmit={handlePassword} className="mt-5 space-y-4">
            <input
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Current Password"
              required
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              placeholder="New Password"
              required
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              disabled={changing}
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] disabled:opacity-50"
            >
              {changing ? "Changing..." : "Change Password"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
