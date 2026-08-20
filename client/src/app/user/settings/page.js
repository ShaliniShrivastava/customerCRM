"use client";

import { useState } from "react";
import { useChangePasswordMutation } from "../../../store/api";

export default function SettingsPage() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await changePassword(form).unwrap();

      setForm({
        currentPassword: "",
        newPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 pb-8 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl animate-[fadeIn_0.4s_ease-out]">
        <h1 className="text-3xl font-bold text-yellow-400">Settings</h1>

        <p className="mt-2 text-gray-400">Manage your account security.</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-yellow-500/20 bg-zinc-950 p-6 shadow-lg transition hover:border-yellow-500/40"
        >
          <h2 className="mb-5 text-xl font-semibold">Change Password</h2>

          <div className="space-y-4">
            <input
              type="password"
              required
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  currentPassword: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
            />

            <input
              type="password"
              required
              minLength={6}
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 outline-none focus:border-yellow-400"
            />
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
            disabled={isLoading}
            className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
