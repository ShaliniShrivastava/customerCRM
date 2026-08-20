"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "../../store/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      dispatch(setUser(response.data));

      if (response.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      alert(error?.data?.message || "Login failed");
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

      {/* Login Card */}
      <div className="feature-card relative z-10 w-full max-w-md rounded-2xl border border-yellow-600/40 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <h1 className="gold-text text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 mb-8 text-center text-white/70">
          Login to your CustomerCRM account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-white">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-yellow-600/40 bg-black/80 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-white">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-yellow-600/40 bg-black/80 px-4 py-3 text-white outline-none placeholder:text-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="gold-button w-full rounded-lg py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="relative z-10">
              {isLoading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>

        <p className="mt-6 text-center text-white/70">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-400 transition hover:text-yellow-300 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
