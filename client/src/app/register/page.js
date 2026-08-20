"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "../../store/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData).unwrap();

      alert("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      alert(error?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24">
      {/* Background Glow */}
      <div className="gold-glow glow-one pointer-events-none" />
      <div className="gold-glow glow-two pointer-events-none" />

      {/* Decorative Lines */}
      <div className="gold-line line-one pointer-events-none" />
      <div className="gold-line line-two pointer-events-none" />

      {/* Register Card */}
      <div className="feature-card relative z-10 w-full max-w-md rounded-2xl border border-yellow-600/40 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <h1 className="gold-text text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 mt-2 text-center text-white/70">
          Create your CustomerCRM account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-white">Full Name</label>

            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-yellow-600/40 bg-black/80 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-white">Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-yellow-600/40 bg-black/80 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-white">Password</label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              required
              className="w-full rounded-lg border border-yellow-600/40 bg-black/80 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="gold-button w-full rounded-lg py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="relative z-10">
              {isLoading ? "Creating Account..." : "Register"}
            </span>
          </button>
        </form>

        <p className="mt-6 text-center text-white/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-400 transition hover:text-yellow-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
