"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetWebsiteContentQuery } from "../store/api";

export default function Home() {
  const { data, isLoading } = useGetWebsiteContentQuery();
  const user = useSelector((state) => state.auth.user);

  const content = data?.data;

  const features = content?.features || [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="gold-glow glow-one" />
        <div className="gold-glow glow-two" />
        <div className="gold-line line-one" />
        <div className="gold-line line-two" />
      </div>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="mb-4 animate-fade-up text-lg font-medium text-yellow-400">
          Welcome to
        </p>

        <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="gold-text">
            {isLoading ? "CustomerCRM" : content?.home?.title || "CustomerCRM"}
          </span>
        </h1>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px w-16 bg-yellow-400" />
          <span className="text-xl text-yellow-400">✦</span>
          <span className="h-px w-16 bg-yellow-400" />
        </div>

        <p className="max-w-2xl animate-fade-up text-base leading-7 text-gray-300 sm:text-lg">
          {isLoading
            ? "Smartly manage leads, build stronger customer relationships, and grow your business with ease."
            : content?.home?.description}
        </p>

        {/* Dynamic Button */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {user?.role === "user" ? (
            <Link
              href="/user/requirement"
              className="gold-button rounded-lg px-8 py-3 font-bold text-black transition-all duration-300 hover:-translate-y-1"
            >
              Submit Your Requirement →
            </Link>
          ) : !user ? (
            <Link
              href="/register"
              className="gold-button rounded-lg px-8 py-3 font-bold text-black transition-all duration-300 hover:-translate-y-1"
            >
              Get Started →
            </Link>
          ) : null}
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid w-full max-w-6xl gap-px overflow-hidden rounded-2xl border border-yellow-500/20 bg-yellow-500/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature._id || index}
              className="feature-card group bg-black/80 p-5 sm:p-7"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-yellow-400 text-2xl text-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black group-hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]">
                {["♟", "▥", "♢", "✓"][index % 4]}
              </div>

              <h2 className="mb-2 font-bold text-yellow-400">
                {feature.title}
              </h2>

              <p className="text-sm leading-6 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}