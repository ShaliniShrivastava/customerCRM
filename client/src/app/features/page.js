"use client";

import { useGetWebsiteContentQuery } from "../../store/api";

export default function Features() {
  const { data, isLoading } = useGetWebsiteContentQuery();

  const features = data?.data?.features || [];

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-3xl font-bold text-yellow-400 sm:text-4xl">
          CRM Features
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
          Everything you need to manage leads, customers and business
          relationships efficiently.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="col-span-full text-center text-yellow-400">
              Loading features...
            </p>
          ) : (
            features.map((feature) => (
              <div
                key={feature._id}
                className="feature-card rounded-xl border border-yellow-500/20 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:shadow-[0_0_25px_rgba(250,204,21,0.1)]"
              >
                <h2 className="text-xl font-semibold text-yellow-400">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}