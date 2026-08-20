"use client";

import { useEffect, useState } from "react";
import {
  useCreateLeadMutation,
  useGetMyLeadsQuery,
  useGetProfileQuery,
} from "../../../store/api";

export default function RequirementPage() {
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();

  const user = profileData?.data;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
    budget: "",
    expectedTimeline: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const { data: leadData, isLoading: leadsLoading } = useGetMyLeadsQuery();

  const requirements = leadData?.data || [];

  
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name and email cannot be changed from this form
    if (name === "name" || name === "email") return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await createLead(form).unwrap();

      setMessage(response.message || "Requirement submitted successfully.");

      // Keep logged-in user's name and email after submission
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        company: "",
        requirement: "",
        budget: "",
        expectedTimeline: "",
      });
    } catch (err) {
      setError(err?.data?.message || "Failed to submit your requirement.");
    }
  };

  if (profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
            Submit Your Requirement
          </h1>

          <p className="mt-2 text-gray-400">
            Tell us what you are looking for and our team will contact you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 shadow-[0_0_35px_rgba(234,179,8,0.08)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">Name *</label>

              <input
                name="name"
                value={form.name}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-zinc-900 px-4 py-3 text-gray-400 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-zinc-900 px-4 py-3 text-gray-400 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Phone Number
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Company / Business Type
              </label>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Restaurant, Startup, Individual"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Requirement */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Requirement *
              </label>

              <textarea
                name="requirement"
                value={form.requirement}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe what you need..."
                className="w-full resize-none rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">Budget</label>

              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="e.g. ₹50,000"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Expected Timeline */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Expected Timeline
              </label>

              <input
                name="expectedTimeline"
                value={form.expectedTimeline}
                onChange={handleChange}
                placeholder="e.g. 2 months"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition duration-300 hover:bg-yellow-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit Requirement"}
          </button>
        </form>

        {/* My Requirements */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-yellow-400">
            My Requirements
          </h2>

          <p className="mt-2 text-gray-400">
            View the requirements you have submitted.
          </p>

          <div className="mt-5 space-y-4">
            {leadsLoading ? (
              <p className="text-gray-400">Loading requirements...</p>
            ) : requirements.length === 0 ? (
              <div className="rounded-xl border border-yellow-500/20 bg-zinc-950 p-5 text-gray-500">
                No requirements submitted yet.
              </div>
            ) : (
              requirements.map((requirement) => (
                <div
                  key={requirement._id}
                  className="rounded-xl border border-yellow-500/20 bg-zinc-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">
                        {requirement.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {requirement.company || "Individual"}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-yellow-400/10 px-3 py-1 text-xs capitalize text-yellow-400">
                      {requirement.status}
                    </span>
                  </div>

                  {requirement.requirement && (
                    <p className="mt-4 text-sm leading-6 text-gray-400">
                      {requirement.requirement}
                    </p>
                  )}

                  {(requirement.budget || requirement.expectedTimeline) && (
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                      {requirement.budget && (
                        <span>Budget: {requirement.budget}</span>
                      )}

                      {requirement.expectedTimeline && (
                        <span>Timeline: {requirement.expectedTimeline}</span>
                      )}
                    </div>
                  )}

                  <p className="mt-3 text-xs text-gray-600">
                    Submitted{" "}
                    {new Date(requirement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
