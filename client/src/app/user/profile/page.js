"use client";

import { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../store/api";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const user = data?.data;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-8 text-center text-yellow-400">
        Loading profile...
      </div>
    );
  }

  const currentName = name || user?.name || "";
  const currentEmail = email || user?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateProfile({
        name: currentName,
        email: currentEmail,
      }).unwrap();

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 pb-8 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl animate-[fadeIn_0.4s_ease-out]">
        <h1 className="text-3xl font-bold text-yellow-400">My Profile</h1>

        <p className="mt-2 text-gray-400">Manage your profile information.</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-yellow-500/20 bg-zinc-950 p-6 shadow-lg transition hover:border-yellow-500/40"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Name</label>

              <input
                value={currentName}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Email</label>

              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {message && (
            <p className="mt-5 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={updating}
            className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] disabled:opacity-50"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
